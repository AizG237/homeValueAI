import { useTheme } from '../hooks/useTheme';
import type { HouseForm } from '../types';
import { ctaPrimary, panel } from '../lib/ui';
import Stepper from '../components/Stepper';
import SelectField from '../components/SelectField';
import SliderField from '../components/SliderField';
import LabeledSlider from '../components/LabeledSlider';
import NumberField from '../components/NumberField';
import CurrencyField from '../components/CurrencyField';
import Toggle from '../components/Toggle';
import ReadonlyField from '../components/ReadonlyField';
import MapPicker from '../components/MapPicker';

interface Props {
  form: HouseForm;
  step: number;
  setStep: (s: number) => void;
  setField: <K extends keyof HouseForm>(key: K, value: HouseForm[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const FLOOR_OPTIONS = [
  { value: 1, label: '1 étage' },
  { value: 1.5, label: '1,5 étage' },
  { value: 2, label: '2 étages' },
  { value: 2.5, label: '2,5 étages' },
  { value: 3, label: '3 étages' },
  { value: 3.5, label: '3,5 étages' },
];
const YEAR_OPTIONS = [
  { value: 2014, label: '2014' },
  { value: 2015, label: '2015' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026' },
];
const ZIP_OPTIONS = [
  '98004', '98006', '98033', '98039', '98040', '98052', '98074', '98103',
  '98105', '98115', '98118', '98122', '98155', '98177', '98199',
].map((z) => ({ value: z, label: z }));

const GRADE_SCALE = ['Basique', 'Standard', 'Bien construit', 'Excellent', 'Luxe'];
const GRADE_POSITIONS = [2.5, 5.5, 7, 9, 12];
const VIEW_SCALE = ['Aucune', 'Faible', 'Moyenne', 'Bonne', 'Exceptionnelle'];

const STEP_LABELS = ['Le logement', 'Qualité', 'Localisation'];

export default function Wizard({ form, step, setStep, setField, onBack, onSubmit }: Props) {
  const { t } = useTheme();
  const sqftLivingM2 = `≈ ${Math.round(form.sqft_living * 0.092903)} m²`;

  return (
    <main
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 960,
        margin: '0 auto',
        padding: '20px clamp(16px,4vw,40px) 80px',
        width: '100%',
        animation: 'fadeIn .4s ease',
      }}
    >
      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button
            onClick={onBack}
            className="hv-press"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: t.muted }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>{' '}
            Retour
          </button>
          <div style={{ fontSize: 13, color: t.muted, fontFamily: "'JetBrains Mono', monospace" }}>
            Étape {step} / 3
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = n <= step;
            return (
              <div key={n}>
                <div style={{ height: 4, borderRadius: 99, background: t.border, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg,${t.primary},${t.accent})`,
                      width: done ? '100%' : '0%',
                      transition: 'width .5s cubic-bezier(.22,1,.36,1)',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 99,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      background: done ? `linear-gradient(135deg,${t.primary},${t.primaryLight})` : t.chipBg,
                      color: done ? '#fff' : t.muted,
                    }}
                  >
                    {n}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: done ? t.text : t.muted }}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={panel(t)}>
        {/* STEP 1 : LE LOGEMENT */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp .4s ease' }}>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 28, letterSpacing: '-.02em', margin: '0 0 6px' }}>
              Le logement
            </h2>
            <p style={{ color: t.muted, margin: '0 0 32px' }}>Caractéristiques physiques du bien.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              <Stepper label="Chambres" hint="Nombre total de chambres" value={form.bedrooms} min={0} max={11} step={1} onChange={(v) => setField('bedrooms', v)} />
              <Stepper label="Salles de bain" hint="Peut être décimal (½ = toilettes)" value={form.bathrooms} min={0} max={8} step={0.25} onChange={(v) => setField('bathrooms', v)} />
              <SelectField label="Étages" hint="Nombre de niveaux" value={form.floors} options={FLOOR_OPTIONS} onChange={(v) => setField('floors', parseFloat(v))} />
            </div>

            <div style={{ marginTop: 28 }}>
              <SliderField label="Surface habitable" unit="sqft" hint="Surface totale intérieure" value={form.sqft_living} min={300} max={13000} step={50} secondary={sqftLivingM2} onChange={(v) => setField('sqft_living', v)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 24 }}>
              <NumberField label="Sous-sol" unit="sqft" hint="0 si aucun" value={form.sqft_basement} min={0} onChange={(v) => setField('sqft_basement', v)} />
              <NumberField label="Terrain" unit="sqft" hint="Surface du lot" value={form.sqft_lot} min={0} onChange={(v) => setField('sqft_lot', v)} />
            </div>

            <div style={{ marginTop: 24 }}>
              <CurrencyField label="Prix du bien" hint="Prix affiché ou de vente en USD" value={form.price} onChange={(v) => setField('price', v)} />
            </div>
          </div>
        )}

        {/* STEP 2 : QUALITÉ & CARACTÉRISTIQUES */}
        {step === 2 && (
          <div style={{ animation: 'fadeUp .4s ease' }}>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 28, letterSpacing: '-.02em', margin: '0 0 6px' }}>
              Qualité &amp; caractéristiques
            </h2>
            <p style={{ color: t.muted, margin: '0 0 32px' }}>
              Ce qui différencie un bien standard d'un bien d'exception.
            </p>

            <div style={{ display: 'grid', gap: 24 }}>
              <LabeledSlider label="Grade (construction & design)" hint="Niveau de finition selon King County" value={form.grade} min={1} max={13} step={1} scale={GRADE_SCALE} scalePositions={GRADE_POSITIONS} onChange={(v) => setField('grade', v)} />
              <LabeledSlider label="Qualité de la vue" hint="0 = aucune, 4 = exceptionnelle" value={form.view} min={0} max={4} step={1} scale={VIEW_SCALE} onChange={(v) => setField('view', v)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 28 }}>
              <Toggle label="Bord de l'eau" hint="Waterfront property" value={form.waterfront} onChange={(v) => setField('waterfront', v)} />
              <Toggle label="Bien rénové" hint="Rénovation majeure" value={form.was_renovated} onChange={(v) => setField('was_renovated', v)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 24 }}>
              <NumberField label="Âge du bien" unit="ans" hint="Années depuis la construction" value={form.house_age} min={0} max={200} onChange={(v) => setField('house_age', v)} />
              <SelectField label="Année d'estimation" hint="Année de référence" value={form.yr_sold} options={YEAR_OPTIONS} onChange={(v) => setField('yr_sold', parseInt(v, 10))} />
            </div>
          </div>
        )}

        {/* STEP 3 : LOCALISATION */}
        {step === 3 && (
          <div style={{ animation: 'fadeUp .4s ease' }}>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 28, letterSpacing: '-.02em', margin: '0 0 6px' }}>
              Localisation
            </h2>
            <p style={{ color: t.muted, margin: '0 0 24px' }}>
              Cliquez sur la carte pour placer le bien — coordonnées et code postal se remplissent
              automatiquement.
            </p>

            <MapPicker
              lat={form.lat}
              lng={form.long}
              onPick={(lat, lng, zip) => {
                setField('lat', lat);
                setField('long', lng);
                if (zip) setField('zipcode', zip);
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 20 }}>
              <ReadonlyField label="Latitude" value={form.lat.toFixed(4)} />
              <ReadonlyField label="Longitude" value={form.long.toFixed(4)} />
              <SelectField label="Code postal" hint="Zone Seattle" value={form.zipcode} options={ZIP_OPTIONS} onChange={(v) => setField('zipcode', String(v))} />
            </div>

            <div style={{ height: 1, background: t.border, margin: '28px 0' }} />
            <h3 style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 16, margin: '0 0 6px' }}>Voisinage</h3>
            <p style={{ color: t.muted, fontSize: 13.5, margin: '0 0 18px' }}>
              Moyennes des 15 biens voisins — impacte fortement le prix.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              <NumberField label="Surface habitable voisine" unit="sqft" hint="Moyenne des 15 voisins" value={form.sqft_living15} min={0} onChange={(v) => setField('sqft_living15', v)} />
              <NumberField label="Surface terrain voisine" unit="sqft" hint="Moyenne des 15 voisins" value={form.sqft_lot15} min={0} onChange={(v) => setField('sqft_lot15', v)} />
            </div>
          </div>
        )}

        {/* FOOTER NAV */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${t.border}`,
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="hv-press"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 22px',
              borderRadius: 99,
              border: `1px solid ${t.border}`,
              background: 'transparent',
              color: t.text,
              fontSize: 14.5,
              fontWeight: 500,
              opacity: step === 1 ? 0.4 : 1,
              cursor: step === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>{' '}
            Précédent
          </button>
          {step < 3 ? (
            <button onClick={() => setStep(Math.min(3, step + 1))} className="hv-lift" style={ctaPrimary(t)}>
              Continuer
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 10 }}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button onClick={onSubmit} className="hv-lift" style={ctaPrimary(t)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10 }}>
                <path d="M9 12l2 2 4-4M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              </svg>
              Estimer l'état
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
