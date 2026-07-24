"""Schémas d'entrée / sortie de l'API (Pydantic v2)."""
from __future__ import annotations

from pydantic import BaseModel, Field, field_validator

# Champs entiers : on arrondit tout flottant reçu (ex. 12.95 -> 13) au lieu de rejeter.
_INT_FIELDS = (
    "bedrooms", "sqft_living", "sqft_basement", "sqft_lot", "grade", "view",
    "waterfront", "was_renovated", "house_age", "yr_sold", "sqft_living15", "sqft_lot15",
)


class PredictRequest(BaseModel):
    """Les 18 caractéristiques attendues par le modèle."""

    bedrooms: int = Field(ge=0, le=20)
    bathrooms: float = Field(ge=0, le=15)
    floors: float = Field(ge=1, le=4)
    sqft_living: int = Field(ge=100, le=20000)
    sqft_basement: int = Field(ge=0, le=10000)
    sqft_lot: int = Field(ge=0)
    price: float = Field(ge=0)
    grade: int = Field(ge=1, le=13)
    view: int = Field(ge=0, le=4)
    waterfront: int = Field(ge=0, le=1)
    was_renovated: int = Field(ge=0, le=1)
    house_age: int = Field(ge=0, le=300)
    yr_sold: int = Field(ge=1900, le=2100)
    # Le front envoie le code postal en chaîne ("98052") ; casté en int côté prédiction.
    zipcode: str
    lat: float
    long: float
    sqft_living15: int = Field(ge=0)
    sqft_lot15: int = Field(ge=0)

    @field_validator(*_INT_FIELDS, mode="before")
    @classmethod
    def _round_to_int(cls, v):
        return round(float(v))

    model_config = {
        "json_schema_extra": {
            "example": {
                "bedrooms": 3, "bathrooms": 2.25, "floors": 1.5,
                "sqft_living": 2080, "sqft_basement": 400, "sqft_lot": 7500,
                "price": 650000, "grade": 8, "view": 0, "waterfront": 0,
                "was_renovated": 0, "house_age": 45, "yr_sold": 2015,
                "zipcode": "98052", "lat": 47.62, "long": -122.15,
                "sqft_living15": 1990, "sqft_lot15": 7200,
            }
        }
    }


class PredictResponse(BaseModel):
    predicted_condition: int
    label: str
    confidence: float
    probabilities: dict[str, float]
