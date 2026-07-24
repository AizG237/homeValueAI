# HomeValue.AI

Application web d'estimation de **l'état d'un bien immobilier** (`condition`, 5 classes de
1 « Mauvais » à 5 « Excellent ») par un modèle de Machine Learning `RandomForestClassifier`
entraîné sur le dataset King County (Seattle).

L'architecture sépare strictement les trois responsabilités :

```
SN/
├── ml/            # Machine Learning : préparation + entraînement + export du pickle
│   ├── train.py
│   ├── data/kc_house_data.csv
│   └── artifacts/model.pkl        (généré)
│
├── backend/       # API : charge le pickle et expose /api/predict (FastAPI)
│   └── app/{main,schemas,predictor}.py
│
├── frontend/      # UI : React + TypeScript + Vite (design HomeValue.AI)
│   └── src/{components,views,hooks,lib}
│
└── preprocessing.ipynb   # notebook d'exploration / expérimentation
```

Le modèle entraîné est **sérialisé dans un fichier pickle** (`ml/artifacts/model.pkl`) puis
**consommé par l'API backend** - le frontend ne parle jamais au modèle directement, seulement
à l'API.

## Démarrage rapide

### 1. Entraîner le modèle (génère le pickle)

```bash
cd ml
pip install -r requirements.txt
python train.py
```

### 2. Lancer l'API

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Lancer le frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Le frontend appelle `/api/predict`, proxifié vers `http://localhost:8000` par Vite (dev).

> Démo hors-ligne : mettre `VITE_USE_MOCK=true` dans `frontend/.env` pour utiliser un mock
> local sans backend.

## Flux de données

```
Formulaire (18 features) ─▶ POST /api/predict ─▶ predictor charge model.pkl
        │                                              │
        │                                     predict_proba → classe + probabilités
        ▼                                              │
  Écran résultat  ◀────────── JSON {predicted_condition, label, confidence, probabilities}
```
