"""API HomeValue.AI - expose le modèle de classification d'état via FastAPI."""
from __future__ import annotations

import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .predictor import load_bundle, predict
from .schemas import PredictRequest, PredictResponse

app = FastAPI(
    title="HomeValue.AI API",
    description="Classification de l'état d'un bien immobilier (Random Forest).",
    version="1.0.0",
)

# CORS : autorise le frontend Vite (surchargeable via CORS_ORIGINS).
_origins = os.environ.get(
    "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _origins],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    """Vérifie que le modèle est chargeable."""
    try:
        bundle = load_bundle()
        return {
            "status": "ok",
            "classes": bundle["classes"],
            "n_features": len(bundle["features"]),
            "metrics": bundle.get("metrics", {}),
        }
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc))


@app.post("/api/predict", response_model=PredictResponse)
def predict_condition(payload: PredictRequest) -> PredictResponse:
    """Prédit la classe d'état (1..5) et la distribution de probabilités."""
    try:
        result = predict(payload.model_dump())
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:  # noqa: BLE001 - surface une erreur claire au client
        raise HTTPException(status_code=500, detail=f"Erreur de prédiction : {exc}")
    return PredictResponse(**result)
