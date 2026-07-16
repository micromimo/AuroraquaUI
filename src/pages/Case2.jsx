import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageCanvas from '../components/case2/ImageCanvas';
import Case2Sidebar from '../components/case2/Case2Sidebar';
import { DEFAULT_PROCESSING_CONFIG } from '../components/case2/ControlPanel';

function generateMockHistory() {
  const history = [];
  const actions = ['Zoom In', 'Zoom Out', 'Pan Left', 'Pan Right', 'Pan Up', 'Pan Down', 'Complete'];
  let step = 0;
  let confidence = 0.3;
  while (step < 15 && confidence < 0.95) {
    const action = actions[Math.floor(Math.random() * (actions.length - 1))];
    confidence += Math.random() * 0.08;
    confidence = Math.min(confidence, 0.99);
    history.push({
      step: step++,
      action_taken: action,
      bbox: {
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        width: 200 + Math.random() * 100,
        height: 200 + Math.random() * 100,
      },
      confidence: confidence,
      is_finished: false,
    });
  }
  if (history.length > 0) {
    history[history.length - 1].action_taken = 'Complete';
    history[history.length - 1].is_finished = true;
  }
  return history;
}

export default function Case2() {
  const [imagePath, setImagePath] = useState(null);
  const [modelStatus, setModelStatus] = useState({
    is_available: true,
    loading: false,
    model_size_bytes: 12845678,
    last_modified: '2024-01-15',
    training_info: {
      epochs: 100,
      batch_size: 64,
      learning_rate: 0.0003,
      max_steps_per_episode: 50,
      total_params: 4567890,
      trainable_params: 4500000,
      last_epoch: 100,
      last_avg_loss: 0.0023,
      last_avg_reward: 15.67,
      last_lr: 0.00003,
    },
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);
  const [config, setConfig] = useState({ ...DEFAULT_PROCESSING_CONFIG });
  const [running, setRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const [history, setHistory] = useState([]);
  const [bbox, setBbox] = useState(null);
  const [maskBase64, setMaskBase64] = useState(null);
  const fileInputRef = useRef(null);

  const enableRlModel = config.enable_rl_model;
  const enableTraditional = config.enable_traditional;
  const setEnableRlModel = (v) => setConfig({ ...config, enable_rl_model: v });
  const setEnableTraditional = (v) => setConfig({ ...config, enable_traditional: v });

  const handleRefreshModel = () => {
    setModelStatus(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setModelStatus(prev => ({ ...prev, loading: false }));
    }, 1000);
  };

  const reset = () => {
    setRunning(false);
    setIsFinished(false);
    setCurrentStep(0);
    setConfidence(0);
    setCurrentAction('');
    setHistory([]);
    setBbox(null);
    setMaskBase64(null);
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePath(url);
    reset();
    e.target.value = '';
  };

  const handleStartRl = () => {
    if (!imagePath) return;
    reset();
    setRunning(true);
    const mockHistory = generateMockHistory();
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex >= mockHistory.length) {
        clearInterval(interval);
        setRunning(false);
        setIsFinished(true);
        setCurrentAction('Complete');
        return;
      }

      const item = mockHistory[stepIndex];
      setCurrentStep(item.step);
      setConfidence(item.confidence);
      setCurrentAction(item.action_taken);
      setBbox(item.bbox);
      setHistory(prev => [...prev, item]);
      stepIndex++;
    }, 500);
  };

  const handleSaveResult = () => {
    if (!maskBase64) return;
    setSaveLoading(true);
    setSaveMsg(null);
    setTimeout(() => {
      setSaveLoading(false);
      setSaveMsg('已下载到浏览器默认位置');
      setTimeout(() => setSaveMsg(null), 3000);
    }, 1000);
  };

  useEffect(() => {
    if (isFinished && history.length > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(244, 114, 182, 0.3)';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(20, 20, 160, 160);
      setMaskBase64(canvas.toDataURL('image/png').split(',')[1]);
    }
  }, [isFinished, history]);

  return (
    <div className="w-screen h-screen p-4 pb-0 flex flex-col text-slate-700 select-none gap-3">
      <div className="flex-1 flex gap-5 min-h-0">
        <Case2Sidebar
          modelStatus={modelStatus}
          onRefreshModel={handleRefreshModel}
          isFinished={isFinished}
          maskBase64={maskBase64}
          saveLoading={saveLoading}
          saveMsg={saveMsg}
          onSaveResult={handleSaveResult}
          imagePath={imagePath}
          currentAction={currentAction}
          currentStep={currentStep}
          confidence={confidence}
          running={running}
          onSelectImage={handleSelectImage}
          onStartRl={handleStartRl}
          history={history}
          totalSteps={config.rl_max_steps}
          enableRlModel={enableRlModel}
          setEnableRlModel={setEnableRlModel}
          enableTraditional={enableTraditional}
          setEnableTraditional={setEnableTraditional}
          config={config}
          setConfig={setConfig}
          pipelineStages={[]}
        />

        <main className="flex-1 min-w-0 min-h-0 flex flex-col relative">
          <ImageCanvas
            imagePath={imagePath}
            bbox={bbox}
            maskBase64={maskBase64}
            action={currentAction}
            isFinished={isFinished}
            showImage={!isFinished}
          />
          <Link 
            to="/init" 
            className="bottom-2 right-2 glass-button glass-button-no-scale liquid-glass-glow hover:text-pink-700 font-semibold"
            style={{ position: 'absolute', width: 'fit-content' }}
          >
            <span className="relative z-10">init</span>
          </Link>
        </main>
      </div>

      <footer className="h-6 flex items-center justify-center text-xs text-slate-500 pb-1">
        Powered by <span className="neon-text-pink font-semibold mx-1">React</span> & <span className="neon-text-purple font-semibold mx-1">TailwindCSS</span>
      </footer>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/bmp,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}