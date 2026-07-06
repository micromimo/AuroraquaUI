import GlassCard from './GlassCard';

export default function MetricsChart({ history = [], totalSteps = 30 }) {
  const maxSteps = totalSteps;
  const data = history.length > 0 ? history : [];

  const width = 260;
  const height = 100;
  const padding = 8;

  const points = data.map((d, i) => {
    const x =
      padding +
      (i / Math.max(1, maxSteps - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      d.confidence * (height - padding * 2);
    return { x, y, d };
  });

  const pathD =
    points.length > 0
      ? points
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(" ")
      : "";

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height - padding} L ${points[0].x.toFixed(1)} ${height - padding} Z`
      : "";

  const stepLabels = [];
  const labelCount = 7;
  for (let i = 0; i < labelCount; i++) {
    stepLabels.push(Math.round((i * (maxSteps - 1)) / (labelCount - 1)));
  }

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        <h2 className="text-sm font-semibold tracking-[0.25em] text-slate-700 uppercase">
          Confidence Curve
        </h2>
      </div>

      <div className="liquid-glass-strong rounded-xl p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(244,114,182,0.55)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0.05)" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((v) => {
            const y = height - padding - v * (height - padding * 2);
            return (
              <line
                key={v}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(100,116,139,0.2)"
                strokeWidth={1}
              />
            );
          })}

          {areaD && (
            <path d={areaD} fill="url(#areaGrad)" opacity={0.5} />
          )}

          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 3px rgba(244,114,182,0.6))" }}
            />
          )}

          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3.5}
              fill={
                (p.d.action_taken || "").toLowerCase().includes("zoom")
                  ? "#ec4899"
                  : "#8b5cf6"
              }
              style={{ filter: "drop-shadow(0 0 3px currentColor)" }}
            />
          ))}
        </svg>

        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
          {stepLabels.map((step) => (
            <span key={step}>Step {step}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="liquid-glass rounded-lg p-3">
          <div className="text-slate-600 mb-1">Total Steps</div>
          <div className="text-xl font-mono font-bold text-slate-800">
            {data.length}
          </div>
        </div>
        <div className="liquid-glass rounded-lg p-3">
          <div className="text-slate-600 mb-1">Peak Conf.</div>
          <div className="text-xl font-mono font-bold text-pink-600">
            {data.length > 0
              ? (Math.max(...data.map((d) => d.confidence)) * 100).toFixed(1) +
                "%"
              : "0%"}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}