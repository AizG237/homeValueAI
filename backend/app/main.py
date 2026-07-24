"""API HomeValue.AI - expose le modèle de classification d'état via FastAPI."""
from __future__ import annotations

import json
import logging
import os
from collections import Counter

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .predictor import load_bundle, predict
from .schemas import PredictRequest, PredictResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("homevalue")

# Compteurs en mémoire (remis à zéro à chaque redémarrage du serveur).
_STATS = {"total": 0, "by_class": Counter(), "confidence_sum": 0.0}

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


@app.get("/")
def root() -> dict:
    """Racine : évite un 404 sur les sondes de Render (répond aussi en HEAD)."""
    return {"service": "HomeValue.AI API", "health": "/api/health", "docs": "/docs"}


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

    # Monitoring : un log par prédiction + compteurs pour /api/metrics.
    _STATS["total"] += 1
    _STATS["by_class"][result["predicted_condition"]] += 1
    _STATS["confidence_sum"] += result["confidence"]
    logger.info(json.dumps({
        "event": "prediction",
        "predicted": result["predicted_condition"],
        "confidence": round(result["confidence"], 3),
        "features": payload.model_dump(),
    }))
    return PredictResponse(**result)


@app.get("/api/metrics")
def metrics() -> dict:
    """Résumé des prédictions servies depuis le dernier démarrage."""
    total = _STATS["total"]
    return {
        "total_predictions": total,
        "by_class": {str(k): _STATS["by_class"][k] for k in sorted(_STATS["by_class"])},
        "avg_confidence": round(_STATS["confidence_sum"] / total, 3) if total else None,
    }
