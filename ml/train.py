"""
Entraînement du modèle HomeValue.AI : classification de l'état d'un bien (`condition`).

Reproduit fidèlement le processus du notebook `preprocessing.ipynb` :
  1. pré-traitement + feature engineering,
  2. rééquilibrage des classes par SMOTE (uniquement sur le train, via un pipeline imblearn),
  3. RandomForest ajusté par validation croisée,
  4. calibration des probabilités (CalibratedClassifierCV) car l'UI affiche la distribution.

Sérialise un *bundle* pickle {model, features, classes, ...} chargé tel quel par le backend.

Usage :
    python train.py
    python train.py --data data/kc_house_data.csv --out artifacts/model.pkl
"""
from __future__ import annotations

import argparse
import os
import pickle
import sys
from pathlib import Path

# Console Windows en UTF-8 (évite les erreurs cp1252 sur les accents).
sys.stdout.reconfigure(encoding="utf-8")

import pandas as pd
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import balanced_accuracy_score, classification_report, f1_score, log_loss
from sklearn.model_selection import train_test_split

# Ordre des features attendu par le modèle : l'API DOIT respecter cet ordre.
FEATURE_ORDER = [
    "price", "bedrooms", "bathrooms", "sqft_living", "sqft_lot", "floors",
    "waterfront", "view", "grade", "sqft_basement", "zipcode", "lat", "long",
    "sqft_living15", "sqft_lot15", "yr_sold", "house_age", "was_renovated",
]
TARGET = "condition"


def build_dataset(csv_path: Path) -> pd.DataFrame:
    """Reproduit le pipeline de préparation du notebook."""
    data = pd.read_csv(csv_path)
    data = data.drop("id", axis=1)
    # Colinéaire avec sqft_living (voir heatmap du notebook)
    data = data.drop("sqft_above", axis=1)

    # Feature engineering : âge du bien + binarisation de la rénovation
    data["date"] = pd.to_datetime(data["date"], format="%Y%m%dT%H%M%S")
    data["yr_sold"] = data["date"].dt.year
    data["house_age"] = data["yr_sold"] - data["yr_built"]
    data["was_renovated"] = (data["yr_renovated"] > 0).astype(int)
    data = data.drop(["date", "yr_built", "yr_renovated"], axis=1)
    return data


def build_model() -> CalibratedClassifierCV:
    """Modèle final retenu dans le notebook : SMOTE + RandomForest, puis calibration.

    SMOTE est dans un pipeline imblearn : il ne rééquilibre QUE les plis
    d'entraînement internes, jamais les données servant à évaluer/calibrer.
    Les hyperparamètres sont ceux sélectionnés par le GridSearchCV du notebook.
    """
    smote_rf = ImbPipeline([
        ("smote", SMOTE(random_state=42)),
        ("rf", RandomForestClassifier(
            n_estimators=150, max_depth=10, min_samples_leaf=10,
            random_state=42, n_jobs=-1,
        )),
    ])
    return CalibratedClassifierCV(smote_rf, method="sigmoid", cv=3)


def log_mlflow(params: dict, metrics: dict, model_path: Path) -> None:
    """Trace le run dans MLflow (params, métriques, artefact modèle).

    Utilise MLFLOW_TRACKING_URI si défini (serveur distant), sinon un dossier
    local `mlruns/`. N'interrompt jamais l'entraînement si MLflow échoue.
    """
    try:
        import mlflow

        uri = os.environ.get("MLFLOW_TRACKING_URI")
        if uri:
            mlflow.set_tracking_uri(uri)
        mlflow.set_experiment("homevalue-condition")
        with mlflow.start_run():
            mlflow.log_params(params)
            mlflow.log_metrics(metrics)
            mlflow.log_artifact(str(model_path))
        print(f"OK Run MLflow enregistré (tracking: {uri or 'mlruns/ local'})")
    except Exception as exc:  # pragma: no cover
        print(f"! MLflow non enregistré ({exc})")


def main() -> None:
    parser = argparse.ArgumentParser(description="Entraîne le modèle de condition.")
    parser.add_argument("--data", default="data/kc_house_data.csv")
    parser.add_argument("--out", default="artifacts/model.pkl")
    parser.add_argument("--no-mlflow", action="store_true", help="Désactive le tracking MLflow.")
    args = parser.parse_args()

    here = Path(__file__).resolve().parent
    csv_path = (here / args.data).resolve()
    out_path = (here / args.out).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"- Lecture du dataset : {csv_path}")
    data = build_dataset(csv_path)

    X = data[FEATURE_ORDER]
    y = data[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print("- Entrainement (SMOTE + RandomForest calibre)...")
    model = build_model()
    model.fit(X_train, y_train)

    # Évaluation honnête sur le hold-out.
    y_pred = model.predict(X_test)
    proba = model.predict_proba(X_test)
    f1 = f1_score(y_test, y_pred, average="macro")
    bal_acc = balanced_accuracy_score(y_test, y_pred)
    ll = log_loss(y_test, proba, labels=list(model.classes_))
    print(f"- F1 macro={f1:.3f}  balanced_acc={bal_acc:.3f}  log_loss={ll:.3f}")
    print(classification_report(y_test, y_pred, zero_division=0))

    bundle = {
        "model": model,
        "features": FEATURE_ORDER,
        "classes": [int(c) for c in model.classes_],
        "target": TARGET,
        "metrics": {
            "f1_macro": round(float(f1), 4),
            "balanced_accuracy": round(float(bal_acc), 4),
            "log_loss": round(float(ll), 4),
        },
    }
    with open(out_path, "wb") as f:
        pickle.dump(bundle, f)
    print(f"OK Modèle sérialisé : {out_path}")

    if not args.no_mlflow:
        log_mlflow(
            params={"strategy": "SMOTE+RF+calibration", "n_estimators": 150,
                    "max_depth": 10, "min_samples_leaf": 10, "calibration": "sigmoid"},
            metrics=bundle["metrics"],
            model_path=out_path,
        )


if __name__ == "__main__":
    main()
