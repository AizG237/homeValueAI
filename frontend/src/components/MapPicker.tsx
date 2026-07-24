import type { MouseEvent } from 'react';

interface Props {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number, zip: string) => void;
}

// Bornes lat/lng approximant King County (identiques au design).
const LAT_MIN = 47.15;
const LAT_MAX = 47.78;
const LNG_MIN = -122.52;
const LNG_MAX = -121.3;
const ZIPS = [
  '98004', '98006', '98033', '98039', '98040', '98052', '98074', '98103',
  '98105', '98115', '98118', '98122', '98155', '98177', '98199',
];

export default function MapPicker({ lat, lng, onPick }: Props) {
  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const newLng = LNG_MIN + x * (LNG_MAX - LNG_MIN);
    const newLat = LAT_MAX - y * (LAT_MAX - LAT_MIN);
    const zipIdx = Math.floor(((x + y) * ZIPS.length) / 2) % ZIPS.length;
    onPick(+newLat.toFixed(4), +newLng.toFixed(4), ZIPS[Math.abs(zipIdx)]);
  };

  const px = Math.max(0, Math.min(1, (lng - LNG_MIN) / (LNG_MAX - LNG_MIN)));
  const py = Math.max(0, Math.min(1, (LAT_MAX - lat) / (LAT_MAX - LAT_MIN)));
  const mx = px * 800;
  const my = py * 340;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(10,15,20,.1)',
      }}
    >
      <svg
        viewBox="0 0 800 340"
        preserveAspectRatio="none"
        onClick={handleClick}
        style={{ width: '100%', height: 340, display: 'block', cursor: 'crosshair' }}
      >
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(4,120,87,.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="340" fill="url(#mapBg)" />
        <rect width="800" height="340" fill="url(#mapGrid)" />
        <path d="M420 40 Q470 100 460 180 T500 320 L520 340 L800 340 L800 40 Z" fill="#7dd3fc" opacity=".55" />
        <path d="M0 260 Q120 250 180 270 T340 260 L340 340 L0 340 Z" fill="#7dd3fc" opacity=".4" />
        <path d="M0 170 L800 170" stroke="#fff" strokeWidth="3" opacity=".7" />
        <path d="M400 0 L400 340" stroke="#fff" strokeWidth="3" opacity=".7" />
        <path d="M180 0 L200 340" stroke="#fff" strokeWidth="2" opacity=".5" />
        <path d="M600 0 L580 340" stroke="#fff" strokeWidth="2" opacity=".5" />
        <text x="120" y="140" fontFamily="Sora" fontSize="12" fontWeight="600" fill="#065f46" opacity=".7">
          SEATTLE
        </text>
        <text x="560" y="130" fontFamily="Sora" fontSize="12" fontWeight="600" fill="#065f46" opacity=".7">
          BELLEVUE
        </text>
        <text x="640" y="260" fontFamily="Sora" fontSize="11" fontWeight="600" fill="#065f46" opacity=".6">
          RENTON
        </text>
        <circle cx={mx} cy={my} r="18" fill="rgba(4,120,87,.2)" />
        <circle cx={mx} cy={my} r="10" fill="#047857" stroke="#fff" strokeWidth="3" />
        <circle cx={mx} cy={my} r="4" fill="#fff" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          padding: '8px 12px',
          borderRadius: 99,
          background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(8px)',
          fontSize: 12,
          fontWeight: 500,
          color: '#065f46',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,.08)',
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z" />
          <circle cx="12" cy="9" r="3" />
        </svg>
        Cliquez pour placer le bien
      </div>
    </div>
  );
}
