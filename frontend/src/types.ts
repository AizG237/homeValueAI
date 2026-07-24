// Les 18 caractéristiques attendues par le modèle (clés identiques au backend).
export interface HouseForm {
  bedrooms: number;
  bathrooms: number;
  floors: number;
  sqft_living: number;
  sqft_basement: number;
  sqft_lot: number;
  price: number;
  grade: number;
  view: number;
  waterfront: number;
  was_renovated: number;
  house_age: number;
  yr_sold: number;
  zipcode: string;
  lat: number;
  long: number;
  sqft_living15: number;
  sqft_lot15: number;
}

export interface PredictResponse {
  predicted_condition: number;
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export type View = 'landing' | 'form' | 'result';
export type Status = 'idle' | 'loading' | 'success' | 'error';
