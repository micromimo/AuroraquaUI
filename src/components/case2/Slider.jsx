export default function Slider({ label, value, min, max, step, onChange, formatValue }) {
  const displayValue = formatValue ? formatValue(value) : value.toFixed(step < 1 ? 3 : 0);
  const percent = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-slate-600">{label}</span>
        <span className="font-mono text-slate-700">{displayValue}</span>
      </div>
      <input
        type="range"
        className="custom-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(to right, rgba(255, 211, 219, 0.85) 0%, rgba(255, 211, 219, 0.85) ${percent}%, rgba(255, 255, 255, 0.25) ${percent}%, rgba(255, 255, 255, 0.25) 100%)`,
        }}
      />
    </div>
  );
}