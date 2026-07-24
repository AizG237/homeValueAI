# ML — Modèle de classification de l'état d'un bien

Modèle `RandomForestClassifier` prédisant la variable `condition` (état du bien, 5 classes
de 1 « Mauvais » à 5 « Excellent ») à partir de 18 caractéristiques.

## Contenu

| Fichier | Rôle |
|---|---|
| `train.py` | Pré-traitement + entraînement + export du bundle pickle |
| `data/kc_house_data.csv` | Dataset King County (Seattle) |
| `artifacts/model.pkl` | Bundle sérialisé (généré) consommé par le backend |

## Entraîner le modèle

```bash
cd ml
pip install -r requirements.txt
python train.py
```

Cela génère `artifacts/model.pkl`, un dictionnaire :

```python
{
  "model":    RandomForestClassifier,   # le modèle entraîné
  "features": [...],                    # ordre EXACT des 18 colonnes
  "classes":  [1, 2, 3, 4, 5],          # classes de sortie
  "target":   "condition",
  "metrics":  {"f1_macro": 0.xx},
}
```

Le backend charge ce bundle et reconstruit le vecteur de features dans l'ordre `features`.
