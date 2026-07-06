import { useState } from 'react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';
import Switch from './Switch';
import Slider from './Slider';

export const DEFAULT_PROCESSING_CONFIG = {
  enable_rl_model: true,
  enable_traditional: true,
  enable_rembg: false,
  rembg_model: "u2net",
  rembg_threshold: 0.5,
  rembg_binary_mode: false,
  rl_learning_rate: 0.0003,
  rl_max_steps: 30,
  rl_confidence_threshold: 0.5,
  trad_canny_low: 0.08,
  trad_canny_high: 0.2,
  trad_morphology_radius: 3,
  trad_min_component_ratio: 0.03,
  trad_edge_weight: 0.5,
  trad_use_adaptive_threshold: true,
  trad_adaptive_threshold_block: 15,
  trad_adaptive_threshold_c: 10.0,
  trad_bilateral_filter: false,
  trad_bilateral_sigma_color: 25.0,
  trad_bilateral_sigma_space: 25.0,
  trad_use_distance_transform: true,
  trad_distance_weight: 0.3,
};

const REMBG_MODELS = [
  { key: "u2net", label: "U2-Net (通用)", desc: "通用抠图/艺术图像" },
  { key: "u2net_human_seg", label: "U2-Net Human (人像)", desc: "人像识别/人物分割" },
  { key: "silueta", label: "Silueta (轻量)", desc: "Flash" },
];

function Chevron({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ModelSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = REMBG_MODELS.find((m) => m.key === value) ?? REMBG_MODELS[0];
  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/30 hover:bg-white/50 backdrop-blur border border-purple-200/40 text-[11px] text-slate-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="text-left flex-1 min-w-0">
          <div className="font-semibold truncate">{selected.label}</div>
          <div className="text-[10px] text-slate-500 truncate">{selected.desc}</div>
        </div>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="absolute z-30 left-0 right-0 mt-1 rounded-lg bg-white/95 backdrop-blur shadow-lg border border-purple-200/40 overflow-hidden">
          {REMBG_MODELS.map((m) => {
            const active = m.key === value;
            return (
              <button
                key={m.key}
                type="button"
                className={`w-full text-left px-3 py-2 text-[11px] border-b border-purple-100/60 last:border-0 transition-colors ${
                  active ? "bg-purple-100/70 text-purple-800" : "hover:bg-purple-50 text-slate-700"
                }`}
                onClick={() => {
                  onChange(m.key);
                  setOpen(false);
                }}
              >
                <div className="font-semibold">{m.label}</div>
                <div className="text-[10px] text-slate-500">{m.desc}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ControlPanel({
  imagePath,
  currentAction,
  currentStep,
  confidence,
  running,
  isFinished,
  onSelectImage,
  onStartRl,
  history = [],
  totalSteps = 30,
  enableRlModel,
  setEnableRlModel,
  enableTraditional,
  setEnableTraditional,
  config,
  setConfig,
  pipelineStages = [],
}) {
  const [showRlParams, setShowRlParams] = useState(false);
  const [showTradParams, setShowTradParams] = useState(false);
  const [showRembgParams, setShowRembgParams] = useState(false);

  const displayAction = currentAction || "— IDLE —";
  const actionColor =
    displayAction.toLowerCase().includes("zoom") || displayAction.toLowerCase().includes("shrink") || displayAction.toLowerCase().includes("grow")
      ? "text-pink-600"
      : displayAction === "— IDLE —"
      ? "text-slate-400"
      : displayAction === "Complete"
      ? "text-green-600"
      : "text-purple-600";

  const modelReady = true;
  const displayTotalSteps = Math.max(totalSteps, currentStep);
  const canStart = imagePath && !running && (enableRlModel ? modelReady : true);

  const updateConfig = (patch) => {
    setConfig({ ...config, ...patch });
  };

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
        <h2 className="text-sm font-bold tracking-[0.25em] text-slate-700 uppercase">
          Control Panel
        </h2>
      </div>

      <div className="liquid-glass-strong rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-bold">
            Processing Options
          </div>
          <button
            className="text-[10px] text-pink-600 hover:text-pink-800 transition-colors"
            onClick={() => setConfig({ ...DEFAULT_PROCESSING_CONFIG })}
            title="恢复默认推荐值"
          >
            ↺ 恢复默认
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎀</span>
              <div>
                <div className="text-xs font-semibold text-slate-700">强化学习模型</div>
                <div className="text-[10px] text-slate-500">RL Model</div>
              </div>
            </div>
            <Switch checked={enableRlModel} onChange={() => setEnableRlModel(!enableRlModel)} />
          </div>

          {enableRlModel && (
            <div className="pl-6 space-y-2 border-l-2 border-pink-200/50 ml-1">
              <button
                className="text-[10px] text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
                onClick={() => setShowRlParams(!showRlParams)}
              >
                <Chevron open={showRlParams} />
                <span>{showRlParams ? "收起参数" : "展开参数"}</span>
              </button>
              {showRlParams && (
                <div className="space-y-2">
                  <Slider
                    label="Learning Rate"
                    value={config.rl_learning_rate}
                    min={1e-5}
                    max={0.01}
                    step={1e-5}
                    onChange={(v) => updateConfig({ rl_learning_rate: v })}
                    formatValue={(v) => v.toExponential(2)}
                  />
                  <Slider
                    label="Max Steps / Episode"
                    value={config.rl_max_steps}
                    min={5}
                    max={100}
                    step={1}
                    onChange={(v) => updateConfig({ rl_max_steps: Math.round(v) })}
                    formatValue={(v) => v.toFixed(0)}
                  />
                  <Slider
                    label="Confidence Threshold"
                    value={config.rl_confidence_threshold}
                    min={0.1}
                    max={0.9}
                    step={0.01}
                    onChange={(v) => updateConfig({ rl_confidence_threshold: v })}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🪄</span>
              <div>
                <div className="text-xs font-semibold text-slate-700">IMG.LY Create</div>
                <div className="text-[10px] text-slate-500">background-removal-rs</div>
              </div>
            </div>
            <Switch checked={config.enable_rembg} onChange={() => updateConfig({ enable_rembg: !config.enable_rembg })} />
          </div>

          {config.enable_rembg && (
            <div className="pl-6 space-y-2 border-l-2 border-purple-200/50 ml-1">
              <button
                className="text-[10px] text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
                onClick={() => setShowRembgParams(!showRembgParams)}
              >
                <Chevron open={showRembgParams} />
                <span>{showRembgParams ? "收起参数" : "展开参数"}</span>
              </button>
              {showRembgParams && (
                <>
                  <ModelSelector
                    value={config.rembg_model}
                    onChange={(v) => updateConfig({ rembg_model: v })}
                  />
                  <Slider
                    label="Alpha Threshold"
                    value={config.rembg_threshold}
                    min={0.1}
                    max={0.9}
                    step={0.01}
                    onChange={(v) => updateConfig({ rembg_threshold: v })}
                    formatValue={(v) => v.toFixed(2)}
                  />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-600">二元模式 (硬边缘)</span>
                    <Switch
                      checked={config.rembg_binary_mode}
                      onChange={() => updateConfig({ rembg_binary_mode: !config.rembg_binary_mode })}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎨</span>
              <div>
                <div className="text-xs font-semibold text-slate-700">传统图像处理</div>
                <div className="text-[10px] text-slate-500">imageproc Rust Create</div>
              </div>
            </div>
            <Switch checked={enableTraditional} onChange={() => setEnableTraditional(!enableTraditional)} />
          </div>

          {enableTraditional && (
            <div className="pl-6 space-y-2 border-l-2 border-pink-200/50 ml-1">
              <button
                className="text-[10px] text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
                onClick={() => setShowTradParams(!showTradParams)}
              >
                <Chevron open={showTradParams} />
                <span>{showTradParams ? "收起参数" : "展开参数"}</span>
              </button>
              {showTradParams && (
                <div className="space-y-2">
                  <Slider
                    label="Canny Low Threshold"
                    value={config.trad_canny_low}
                    min={0.01}
                    max={0.3}
                    step={0.01}
                    onChange={(v) => updateConfig({ trad_canny_low: Math.min(v, config.trad_canny_high - 0.01) })}
                    formatValue={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Canny High Threshold"
                    value={config.trad_canny_high}
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    onChange={(v) => updateConfig({ trad_canny_high: Math.max(v, config.trad_canny_low + 0.01) })}
                    formatValue={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Morphology Radius"
                    value={config.trad_morphology_radius}
                    min={1}
                    max={8}
                    step={1}
                    onChange={(v) => updateConfig({ trad_morphology_radius: Math.round(v) })}
                    formatValue={(v) => `${v.toFixed(0)}px`}
                  />
                  <Slider
                    label="Min Component Ratio"
                    value={config.trad_min_component_ratio}
                    min={0.005}
                    max={0.15}
                    step={0.005}
                    onChange={(v) => updateConfig({ trad_min_component_ratio: v })}
                    formatValue={(v) => v.toFixed(3)}
                  />
                  <Slider
                    label="Edge Weight"
                    value={config.trad_edge_weight}
                    min={0}
                    max={1.0}
                    step={0.05}
                    onChange={(v) => updateConfig({ trad_edge_weight: v })}
                    formatValue={(v) => v.toFixed(2)}
                  />

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100/50">
                    <span className="text-[11px] text-slate-600">Adaptive Threshold</span>
                    <Switch checked={config.trad_use_adaptive_threshold} onChange={() => updateConfig({ trad_use_adaptive_threshold: !config.trad_use_adaptive_threshold })} />
                  </div>
                  {config.trad_use_adaptive_threshold && (
                    <>
                      <Slider
                        label="自适应块大小"
                        value={config.trad_adaptive_threshold_block}
                        min={3}
                        max={31}
                        step={2}
                        onChange={(v) => updateConfig({ trad_adaptive_threshold_block: Math.round(v) })}
                        formatValue={(v) => `${v.toFixed(0)}px`}
                      />
                      <Slider
                        label="自适应常量C"
                        value={config.trad_adaptive_threshold_c}
                        min={0}
                        max={30}
                        step={1}
                        onChange={(v) => updateConfig({ trad_adaptive_threshold_c: v })}
                        formatValue={(v) => v.toFixed(0)}
                      />
                    </>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100/50">
                    <span className="text-[11px] text-slate-600">双边滤波</span>
                    <Switch checked={config.trad_bilateral_filter} onChange={() => updateConfig({ trad_bilateral_filter: !config.trad_bilateral_filter })} />
                  </div>
                  {config.trad_bilateral_filter && (
                    <>
                      <Slider
                        label="Bilateral σ_color"
                        value={config.trad_bilateral_sigma_color}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(v) => updateConfig({ trad_bilateral_sigma_color: v })}
                        formatValue={(v) => v.toFixed(0)}
                      />
                      <Slider
                        label="Bilateral σ_space"
                        value={config.trad_bilateral_sigma_space}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(v) => updateConfig({ trad_bilateral_sigma_space: v })}
                        formatValue={(v) => v.toFixed(0)}
                      />
                    </>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100/50">
                    <span className="text-[11px] text-slate-600">距离变换</span>
                    <Switch checked={config.trad_use_distance_transform} onChange={() => updateConfig({ trad_use_distance_transform: !config.trad_use_distance_transform })} />
                  </div>
                  {config.trad_use_distance_transform && (
                    <Slider
                      label="距离权重"
                      value={config.trad_distance_weight}
                      min={0}
                      max={1}
                      step={0.05}
                      onChange={(v) => updateConfig({ trad_distance_weight: v })}
                      formatValue={(v) => v.toFixed(2)}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <GlassButton className="w-full text-slate-700 hover:text-pink-700" onClick={onSelectImage}>
        📁 选取图像
      </GlassButton>

      <div className="text-xs text-slate-500 truncate">
        {imagePath ? imagePath : "尚未选取图像"}
      </div>

      <GlassButton 
        className={`w-full ${
          canStart
            ? "text-slate-700 liquid-glass-glow hover:text-pink-700"
            : "text-slate-400 cursor-not-allowed"
        }`}
        onClick={onStartRl}
        disabled={!canStart}
      >
        {enableRlModel && !modelReady
          ? "⚠️ 请先训练模型"
          : running
          ? "⚙️ 推理中..."
          : isFinished
          ? "🔁 重试"
          : "✨ 自动寻找主体并提取"}
      </GlassButton>

      <div className="mt-2 liquid-glass-strong rounded-xl p-4 space-y-4">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-bold mb-1">
            Current Action
          </div>
          <div className={`text-lg font-mono font-bold ${actionColor}`}>
            {displayAction}
          </div>
        </div>

        {pipelineStages.length > 0 && (
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-1">
              Pipeline
            </div>
            <div className="space-y-1">
              {pipelineStages.map((stage) => {
                const color =
                  stage.status === "running"
                    ? "text-pink-600 font-semibold"
                    : stage.status === "done"
                    ? "text-green-600"
                    : "text-slate-400";
                const iconSpin = stage.status === "running";
                return (
                  <div key={stage.key} className={`flex items-center gap-2 text-[11px] ${color}`}>
                    <span className={iconSpin ? "inline-block animate-spin" : ""}>
                      {stage.icon}
                    </span>
                    <span>{stage.label}</span>
                    <span className="ml-auto text-[10px] opacity-70">
                      {stage.status === "running" ? "..." : stage.status === "done" ? "✓" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
              Step
            </div>
            <div className="text-2xl font-mono font-bold text-slate-800">
              {String(currentStep).padStart(2, "0")}
              <span className="text-slate-500 text-sm"> / {displayTotalSteps}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
              Confidence
            </div>
            <div className="text-2xl font-mono font-bold text-pink-600">
              {(confidence * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-200/70 overflow-hidden">
          <div
            className="h-full metric-bar transition-all duration-500 ease-out rounded-full"
            style={{ width: `${Math.min(100, confidence * 100)}%` }}
          />
        </div>

        {history.length > 0 && (
          <div className="border-t border-slate-200 pt-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-1">
              Action History
            </div>
            <div className="space-y-0.5 max-h-32 overflow-y-auto text-xs">
              {history.slice().reverse().map((h, idx) => (
                <div key={`history-${idx}-${h.step}`} className="flex items-center gap-1 font-mono">
                  <span className="text-slate-400 w-8">Step {h.step}:</span>
                  <span className={h.action_taken.toLowerCase().includes("zoom") || h.action_taken.toLowerCase().includes("shrink") || h.action_taken.toLowerCase().includes("grow") ? "text-pink-600" : h.action_taken === "Complete" ? "text-green-600" : "text-purple-600"}>
                    {h.action_taken}
                  </span>
                  <span className="text-slate-400 ml-auto">{(h.confidence * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}