import React from 'react';

export default function Slider({
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  formatValue,
  showValue = true,
  showLabel = true,
  trackWidth = '100%',
  thumbSize,
  trackGradient,
  thumbGradient,
  className = '',
}) {
  const displayValue = formatValue ? formatValue(value) : value.toFixed(step < 1 ? 3 : 0);
  const percent = ((value - min) / (max - min)) * 100;

  const defaultTrackGradient = `linear-gradient(to right, rgba(255, 211, 219, 0.85) 0%, rgba(255, 211, 219, 0.85) ${percent}%, rgba(255, 255, 255, 0.25) ${percent}%, rgba(255, 255, 255, 0.25) 100%)`;

  return (
    <div className={className} style={{ width: trackWidth }}>
      {(showValue || showLabel) && (
        <div className="flex justify-between items-center text-[11px]">
          {showLabel && <span className="text-slate-600">{label}</span>}
          {showValue && <span className="font-mono text-slate-700">{displayValue}</span>}
        </div>
      )}
      <input
        type="range"
        className="custom-slider block"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          background: trackGradient || defaultTrackGradient,
          ...(thumbSize && {
            '--thumb-width': `${thumbSize.width}px`,
            '--thumb-height': `${thumbSize.height}px`,
          }),
          ...(thumbGradient && {
            '--thumb-gradient': thumbGradient,
          }),
        }}
      />
    </div>
  );
}
