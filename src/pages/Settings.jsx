import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings as SettingsIcon, Monitor, MonitorDot, Palette, Bell, Shield, Database, Globe, Save, ArrowLeft } from 'lucide-react'
import Section from '../components/common/Section'
import Toggle from '../components/common/Toggle'

export default function Settings() {
  const [settings, setSettings] = useState({
    autoConnect: true,
    hardwareAccel: true,
    colorCorrection: true,
    showFpsOverlay: true,
    notifications: true,
    soundEffects: false,
    darkMode: false,
    language: 'zh-CN',
    theme: 'default'
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 40%, #E6E6FA 100%)'
    }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <Link to="/case1" className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Case1</span>
          </Link>
        </div>
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" 
               style={{ background: 'linear-gradient(135deg, #7b61ff, #ff6b9d)' }}>
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold gradient-text mb-2">系统设置</h1>
          <p className="text-gray-500"></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="显示设置" icon={<MonitorDot className="w-4 h-4" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">暗色模式</span>
                <Toggle checked={settings.darkMode} onChange={(v) => handleChange('darkMode', v)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">颜色校正</span>
                <Toggle checked={settings.colorCorrection} onChange={(v) => handleChange('colorCorrection', v)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">FPS 叠加显示</span>
                <Toggle checked={settings.showFpsOverlay} onChange={(v) => handleChange('showFpsOverlay', v)} />
              </div>
              <div className="pt-4 border-t border-gray-200/50">
                <label className="text-sm text-gray-600 mb-2 block">主题配色</label>
                <div className="flex gap-2">
                  {[
                    { v: 'default', label: '默认', color: 'linear-gradient(135deg, #7b61ff, #ff6b9d)' },
                    { v: 'blue', label: '蓝色', color: 'linear-gradient(135deg, #4f46e5, #06b6d4)' },
                    { v: 'green', label: '绿色', color: 'linear-gradient(135deg, #10b981, #34d399)' },
                    { v: 'orange', label: '橙色', color: 'linear-gradient(135deg, #f59e0b, #f97316)' },
                  ].map(({ v, label, color }) => (
                    <button
                      key={v}
                      onClick={() => handleChange('theme', v)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        settings.theme === v ? 'ring-2 ring-purple-400' : 'sidebar-white'
                      }`}
                      style={settings.theme === v ? { background: color, color: 'white' } : {}}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="连接设置" icon={<Globe className="w-4 h-4" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">自动连接</span>
                <Toggle checked={settings.autoConnect} onChange={(v) => handleChange('autoConnect', v)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">硬件加速</span>
                <Toggle checked={settings.hardwareAccel} onChange={(v) => handleChange('hardwareAccel', v)} />
              </div>
              <div className="pt-4 border-t border-gray-200/50">
                <label className="text-sm text-gray-600 mb-2 block">默认服务地址</label>
                <input
                  className="input-glass w-full text-sm"
                  value="http://localhost:8765"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">编解码优先顺序</label>
                <select
                  className="input-glass w-full text-sm py-2"
                  defaultValue="H264"
                >
                  <option value="H264">H.264</option>
                  <option value="H265">H.265</option>
                  <option value="AV1">AV1</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="通知设置" icon={<Bell className="w-4 h-4" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">通知提醒</span>
                <Toggle checked={settings.notifications} onChange={(v) => handleChange('notifications', v)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">音效反馈</span>
                <Toggle checked={settings.soundEffects} onChange={(v) => handleChange('soundEffects', v)} />
              </div>
              <div className="pt-4 border-t border-gray-200/50">
                <label className="text-sm text-gray-600 mb-2 block">通知类型</label>
                <div className="space-y-2">
                  {['连接状态', '错误警告', '性能提示', '更新通知'].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item}</span>
                      <Toggle checked={true} onChange={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="语言设置" icon={<Monitor className="w-4 h-4" />}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">界面语言</label>
                <select
                  className="input-glass w-full text-sm py-2"
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="zh-TW">繁体中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                  <option value="ko-KR">한국어</option>
                </select>
              </div>
              <div className="pt-4 border-t border-gray-200/50">
                <label className="text-sm text-gray-600 mb-2 block">字体大小</label>
                <input
                  type="range"
                  min="12"
                  max="18"
                  defaultValue="14"
                  className="w-full sidebar-range"
                  style={{
                    background: 'linear-gradient(to right, rgba(255, 211, 219, 0.85) 0%, rgba(255, 211, 219, 0.85) 50%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.25) 100%)'
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>小</span>
                  <span>中</span>
                  <span>大</span>
                </div>
              </div>
            </div>
          </Section>

          <Section title="数据管理" icon={<Database className="w-4 h-4" />}>
            <div className="space-y-4">
              <div className="glass-dark rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">缓存数据</span>
                  <span className="text-sm font-mono text-gray-700">128 MB</span>
                </div>
              </div>
              <div className="glass-dark rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">日志文件</span>
                  <span className="text-sm font-mono text-gray-700">56 MB</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg text-xs font-medium sidebar-white">
                  清除缓存
                </button>
                <button className="flex-1 py-2 rounded-lg text-xs font-medium sidebar-white">
                  导出日志
                </button>
              </div>
            </div>
          </Section>

          <Section title="安全设置" icon={<Shield className="w-4 h-4" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">自动更新</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">安全连接</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
              <div className="pt-4 border-t border-gray-200/50">
                <div className="text-xs text-gray-500">
                  当前版本: <span className="font-medium text-gray-700">v1.0.0</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  更新状态: <span className="text-green-500">已是最新版本</span>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="glass-btn rounded-xl px-6 py-2.5 flex items-center gap-2 text-sm font-medium">
            <Save className="w-4 h-4" />
            保存设置
          </button>
        </div>
      </div>
    </div>
  )
}