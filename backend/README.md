# Backend — API HomeValue.AI (FastAPI)

Charge le bundle `ml/artifacts/model.pkl` et expose la prédiction d'état.

## Lancer

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

> Prérequis : le pickle doit exister. Sinon : `cd ml && python train.py`.

Docs interactives : http://localhost:8000/docs

## Endpoints

### `GET /api/health`
Vérifie que le modèle est chargé.

### `POST /api/predict`
Body — les 18 caractéristiques :

```json
{
  "bedrooms": 3, "bathrooms": 2.25, "floors": 1.5,
  "sqft_living": 2080, "sqft_basement": 400, "sqft_lot": 7500,
  "price": 650000, "grade": 8, "view": 0, "waterfront": 0,
  "was_renovated": 0, "house_age": 45, "yr_sold": 2015,
  "zipcode": "98052", "lat": 47.62, "long": -122.15,
  "sqft_living15": 1990, "sqft_lot15": 7200
}
```

Réponse :

```json
{
  "predicted_condition": 4,
  "label": "Bon",
  "confidence": 0.61,
  "probabilities": { "1": 0.01, "2": 0.05, "3": 0.20, "4": 0.61, "5": 0.13 }
}
```

## Configuration (variables d'environnement)

| Variable | Défaut | Rôle |
|---|---|---|
| `MODEL_PATH` | `../ml/artifacts/model.pkl` | Chemin du bundle pickle |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Origines autorisées |
