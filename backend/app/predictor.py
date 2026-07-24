"""Chargement du bundle pickle et logique de prédiction."""
from __future__ import annotations

import os
import pickle
from functools import lru_cache
from pathlib import Path

import pandas as pd

# Libellés humains des classes 1..5
CLASS_LABELS = {
    1: "Mauvais",
    2: "Médiocre",
    3: "Correct",
    4: "Bon",
    5: "Excellent",
}

# Chemin du pickle : surchargable via la variable d'env MODEL_PATH.
_DEFAULT_MODEL_PATH = (
    Path(__file__).resolve().parents[2] / "ml" / "artifacts" / "model.pkl"
)


def _model_path() -> Path:
    return Path(os.environ.get("MODEL_PATH", _DEFAULT_MODEL_PATH))


@lru_cache(maxsize=1)
def load_bundle() -> dict:
    """Charge (et met en cache) le bundle {model, features, classes, ...}."""
    path = _model_path()
    if not path.exists():
        raise FileNotFoundError(
            f"Modèle introuvable : {path}. Lancez d'abord `python ml/train.py`."
        )
    with open(path, "rb") as f:
        return pickle.load(f)


def predict(features: dict) -> dict:
    """Prédit la classe d'état et la distribution de probabilités."""
    bundle = load_bundle()
    model = bundle["model"]
    order = bundle["features"]
    classes = bundle["classes"]

    payload = dict(features)
    # Le modèle a été entraîné avec zipcode en entier.
    payload["zipcode"] = int(payload["zipcode"])

    # Reconstruit le vecteur dans l'ordre EXACT d'entraînement.
    row = pd.DataFrame([[payload[col] for col in order]], columns=order)

    proba = model.predict_proba(row)[0]
    probabilities = {str(int(c)): float(p) for c, p in zip(classes, proba)}

    predicted = int(max(probabilities, key=lambda k: probabilities[k]))
    return {
        "predicted_condition": predicted,
        "label": CLASS_LABELS.get(predicted, "—"),
        "confidence": probabilities[str(predicted)],
        "probabilities": probabilities,
    }
