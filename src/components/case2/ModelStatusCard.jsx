import { useState } from 'react';
import GlassCard from './GlassCard';

function formatBytes(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function formatNum(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

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

function RefreshIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
      <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
    </svg>
  );
}

export default function ModelStatusCard({ modelStatus, onRefreshModel }) {
  const [showDetails, setShowDetails] = useState(false);

  const modelReady = modelStatus?.is_available ?? false;
  const modelLoading = modelStatus?.loading ?? false;
  const trainingInfo = modelStatus?.training_info ?? null;

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="liquid-glass-strong rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
            Model Status
          </div>
          <div className="flex items-center gap-1.5">
            {modelLoading ? (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-xs font-semibold text-yellow-700">CHECKING</span>
              </>
            ) : (
              <>
                <div
                  className={`w-2 h-2 rounded-full ${
                    modelReady
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                      : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                  }`}
                />
                <span
                  className={`text-xs font-semibold ${
                    modelReady ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {modelReady ? "READY" : "NOT LOADED"}
                </span>
              </>
            )}
            {onRefreshModel && (
              <button
                className="ml-1 text-[10px] text-slate-400 hover:text-pink-600 transition-colors flex items-center gap-1"
                onClick={onRefreshModel}
                title="Refresh model status"
              >
                <RefreshIcon />
              </button>
            )}
          </div>
        </div>
        {modelStatus?.error && (
          <div className="text-[10px] text-red-500 mb-1 truncate" title={modelStatus.error}>
            Error: {modelStatus.error}
          </div>
        )}
        {modelReady && modelStatus ? (
          <div className="text-[11px] space-y-0.5 text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-500">Size</span>
              <span className="font-mono">{formatBytes(modelStatus.model_size_bytes)}</span>
            </div>
            {modelStatus.last_modified && (
              <div className="flex justify-between">
                <span className="text-slate-500">Trained</span>
                <span className="font-mono">{modelStatus.last_modified}</span>
              </div>
            )}
            {trainingInfo && (
              <div className="flex justify-between">
                <span className="text-slate-500">Last Epoch</span>
                <span className="font-mono">{trainingInfo.last_epoch} / {trainingInfo.epochs}</span>
              </div>
            )}
            {modelStatus.model_path && (
              <div className="text-slate-400 truncate mt-1" title={modelStatus.model_path}>
                {modelStatus.model_path.split("/").pop()}
              </div>
            )}
            {trainingInfo && (
              <button
                className="mt-2 text-[10px] text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Chevron open={showDetails} />
                <span>{showDetails ? "隐藏详细信息" : "显示详细信息"}</span>
              </button>
            )}
            {showDetails && trainingInfo && (
              <div className="mt-2 pt-2 border-t border-white/40 space-y-0.5 text-[11px]">
                <div className="flex justify-between"><span className="text-slate-500">Epochs</span><span className="font-mono">{trainingInfo.epochs}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Batch Size</span><span className="font-mono">{trainingInfo.batch_size}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Learning Rate</span><span className="font-mono">{trainingInfo.learning_rate.toExponential(2)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Max steps/episode</span><span className="font-mono">{trainingInfo.max_steps_per_episode}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Last Avg Loss</span><span className="font-mono">{trainingInfo.last_avg_loss.toFixed(4)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Last Avg Reward</span><span className="font-mono">{trainingInfo.last_avg_reward.toFixed(4)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Last LR</span><span className="font-mono">{trainingInfo.last_lr.toExponential(2)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">PolicyNetwork params</span><span className="font-mono">{formatNum(trainingInfo.total_params)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Trainable</span><span className="font-mono">{formatNum(trainingInfo.trainable_params)}</span></div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500">
            Train a model first or place policy_network.onnx in models/
          </div>
        )}
      </div>
    </GlassCard>
  );
}