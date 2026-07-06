import { Link } from 'react-router-dom';
import { GitBranch, Atom, Zap, Wind, Feather, Heart } from 'lucide-react';

export default function Init() {
  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 40%, #E6E6FA 100%)'
      }}>
      <div className="flex-1 w-full max-w-4xl px-8 py-10 flex flex-col items-center">
        <div className="text-center mb-10">
          <img src="/favicon.ico" className="w-20 h-20 mb-4 mx-auto block" alt="logo" />
          <h1 className="text-3xl font-bold neon-text-pink tracking-wide">
            AurorάquaUI
          </h1>
        </div>

        <div className="w-full mb-8">
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">关于项目</h2>
              <a href="https://github.com/micromimo/AuroraquaUI" target="_blank" rel="noopener noreferrer" className="glass-btn rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <GitBranch className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              「Aurorάqua」是受 Apple LiquidGlass 設計風格和冰島極光啟發的 Web UI 模板，採用「玻璃擬態」設計與柔和的極光漸變效果。非常適用於儀表板、控制面板及串流應用，基於 React 和 Tailwind 構建。<br />
              採用 Mozilla Public License 2.0 協議，支援商業用途。<br />
              ⚠️目前僅供個人UI喜好展示，大部分功能仍未開發，仍很不完善。<br />
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(123, 97, 255, 0.1)' }}>
                <Atom className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-lg font-semibold text-gray-700">React</div>
              <div className="text-xs text-gray-500">前端框架</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
                <Zap className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-lg font-semibold text-gray-700">Vite</div>
              <div className="text-xs text-gray-500">构建工具</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(147, 51, 234, 0.1)' }}>
                <Wind className="w-5 h-5 text-violet-500" />
              </div>
              <div className="text-lg font-semibold text-gray-700">TailwindCSS</div>
              <div className="text-xs text-gray-500">样式框架</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                   style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Feather className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-lg font-semibold text-gray-700">Lucide</div>
              <div className="text-xs text-gray-500">图标库</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-slate-600 tracking-wider">
            Select a Case to Start
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link to="/case1" className="group">
            <div className="liquid-glass rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7b61ff, #ff6b9d)' }}>
                  <span className="text-2xl">🎥</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-slate-700 group-hover:neon-text-pink transition-all">
                    Case 1
                  </h2>
                  <p className="text-xs text-slate-500">Video Stream Dashboard</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Real-time video processing and monitoring</p>
                <div className="text-pink-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>

          <Link to="/case2" className="group">
            <div className="liquid-glass rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff6b9d, #ec4899)' }}>
                  <span className="text-2xl">🖼️</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-slate-700 group-hover:neon-text-pink transition-all">
                    Case 2
                  </h2>
                  <p className="text-xs text-slate-500">Image Matting Agent</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Object localization and matting</p>
                <div className="text-pink-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <footer className="w-full py-6 px-8 text-center text-xs text-slate-500">
        Made with <Heart className="w-4 h-4 inline text-red-500" /> by <a href="https://github.com/micromimo" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 underline underline-offset-2 transition-colors">micromimo🎀👿</a>
      </footer>
    </div>
  );
}