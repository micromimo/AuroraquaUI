import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Wifi, WifiOff, Settings, Info, Home } from 'lucide-react'
import Sidebar from '../components/core/Sidebar'
import VideoPlayer from '../components/core/VideoPlayer'
import Toast from '../components/core/Toast'
import ConnectionStatus from '../components/common/ConnectionStatus'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toast, setToast] = useState(null)
  
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    isConnecting: false,
    error: null
  })

  const [stats, setStats] = useState({ fps: 58, frames: 12345, frameId: 12345 })
  const [settings, setSettings] = useState({
    displayScale: 1,
    colorCorrection: true,
    rotation: 0,
    resolution: '1080p',
    codecFormat: 'H264',
    showFpsOverlay: true,
    hardwareAccel: true,
    autoConnect: true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        fps: Math.floor(Math.random() * 10) + 50,
        frameId: prev.frameId + Math.floor(Math.random() * 30)
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleConnect = useCallback(() => {
    if (connectionStatus.isConnected) return
    
    setConnectionStatus(prev => ({ ...prev, isConnecting: true, error: null }))
    
    setTimeout(() => {
      setConnectionStatus({
        isConnected: true,
        isConnecting: false,
        error: null
      })
      showToast('连接成功', 'success')
    }, 1500)
  }, [connectionStatus.isConnected, showToast])

  const handleDisconnect = useCallback(() => {
    setConnectionStatus({
      isConnected: false,
      isConnecting: false,
      error: null
    })
    showToast('已断开连接', 'info')
  }, [showToast])

  return (
    <div className="w-screen h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 40%, #E6E6FA 100%)'
    }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-30" 
             style={{ background: 'radial-gradient(circle, #ff6b9d 0%, transparent 70%)', top: '-10%', right: '-10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-25" 
             style={{ background: 'radial-gradient(circle, #7b61ff 0%, transparent 70%)', bottom: '-5%', left: '20%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle, #ffb86b 0%, transparent 70%)', top: '40%', right: '30%' }} />
      </div>

      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        connectionStatus={connectionStatus}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <div className={`absolute inset-0 transition-all duration-300 ${sidebarOpen ? 'pl-[376px]' : 'pl-[12px]'}`}>
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-6 py-4 z-40">
          <div className="flex items-center gap-3">
            <div className="glass rounded-2xl px-4 py-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-semibold gradient-text">Aurorάqua UI</h1>
                <p className="text-xs text-gray-500">Powered by React</p>
              </div>
              <div className="h-6 w-px bg-gray-300/50" />
              <Link to="/settings" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Settings className="w-4 h-4" />
                <span>设置</span>
              </Link>
              <Link to="/about" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Info className="w-4 h-4" />
                <span>关于</span>
              </Link>
              <div className="h-6 w-px bg-gray-300/50" />
              <Link to="/case2" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Activity className="w-4 h-4" />
                <span>Case2</span>
              </Link>
              <div className="h-6 w-px bg-gray-300/50" />
              <Link to="/init" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Home className="w-4 h-4" />
                <span>Init</span>
              </Link>
            </div>
          </div>
          
          <div className="glass rounded-2xl px-4 py-2 flex items-center gap-4 self-end">
            <ConnectionStatus isConnected={connectionStatus.isConnected} isConnecting={connectionStatus.isConnecting} />
            {connectionStatus.isConnected && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4" />
                <span className="font-mono">{stats.fps} FPS</span>
              </div>
            )}
          </div>
        </div>

        <VideoPlayer 
          isConnected={connectionStatus.isConnected}
          displayScale={settings.displayScale}
          rotation={settings.rotation}
          showFpsOverlay={settings.showFpsOverlay}
          stats={stats}
        />
      </div>

      <Toast toast={toast} />

      <div className="fixed bottom-4 right-4 glass-shortcut rounded-xl px-3 py-2 text-xs text-gray-600">
        <span>快捷键: </span>
        <kbd className="px-2.5 py-1 bg-white/60 rounded-lg text-gray-600 ml-1.5">F</kbd>
        <kbd className="px-2.5 py-1 bg-white/60 rounded-lg text-gray-600 ml-1.5">←→</kbd>
        <kbd className="px-2.5 py-1 bg-white/60 rounded-lg text-gray-600 ml-1.5">M</kbd>
      </div>
    </div>
  )
}