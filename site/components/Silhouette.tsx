// Silhueta genérica de busto masculino (não representa ninguém real).
const BUST =
  "M200 40C150 40 122 78 122 128c0 32 10 58 26 76l2 32c0 16-10 26-30 34-50 18-90 40-102 90-10 40-14 100-18 160h400c-4-60-8-120-18-160-12-50-52-72-102-90-20-8-30-18-30-34l2-32c16-18 26-44 26-76 0-50-28-88-78-88z";

export default function Silhouette({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1a1a" />
          <stop offset=".55" stopColor="#0d0c0c" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
      </defs>
      <path d={BUST} fill={`url(#sg-${id})`} stroke="rgba(255,255,255,.10)" strokeWidth="2" />
      <text x="200" y="152" textAnchor="middle" fontSize="92" fontWeight="900" fill="#FFCD12" fontFamily="'Big Shoulders Display', 'Arial Narrow', sans-serif">?</text>
    </svg>
  );
}
