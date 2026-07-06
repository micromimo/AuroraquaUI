import { Link } from 'react-router-dom'
import { Info, Heart, Atom, Zap, Wind, Feather, GitBranch, ArrowLeft } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 40%, #E6E6FA 100%)'
    }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <Link to="/case1" className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Case1</span>
          </Link>
        </div>
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" 
               style={{ background: 'linear-gradient(135deg, #7b61ff, #ff6b9d)' }}>
            <Info className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-semibold gradient-text mb-2">Aurorάqua UI</h1>
          <p className="text-gray-500">符合我自己口味的React UI方案😋</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">关于项目</h2>
            <a href="https://github.com/micromimo/AuroraquaUI" target="_blank" rel="noopener noreferrer" className="glass-btn rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <GitBranch className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            「Aurorάqua」 is a web UI template inspired by Apple LiquidGlass Design and Iceland(Ísland) Aurora, featuring a glassmorphism design and soft aurora gradients. Perfect for dashboards, control panels, and streaming apps. Built with React & Tailwind. Mozilla Public License 2.0, friendly for commercial use.<br />
            ⚠️This serves only to showcase personal UI preferences; most features have not yet been developed, and remains far from complete currently.<br />
            「Aurorάqua」是受 Apple LiquidGlass 設計風格和冰島極光啟發的 Web UI 模板，採用「玻璃擬態」設計與柔和的極光漸變效果。非常適用於儀表板、控制面板及串流應用，基於 React 和 Tailwind 構建。採用 Mozilla Public License 2.0 協議，支援商業用途。<br />
            ⚠️目前僅供個人UI喜好展示，大部分功能仍未開發，仍很不完善。<br />

          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">功能特性</h2>
          <ul className="space-y-3">
            {[
              '玻璃拟态设计风格 & 柔和极光配色',
              '组件化架构设计 & 自由定制与可扩展性',
              '丰富的交互组件 & 流畅的动画过渡',
              '响应式布局适配 & 完善的路由系统',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'Vite 5', 'TailwindCSS 3', 'Lucide React', 'React Router'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium sidebar-white">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="glass-btn rounded-lg p-2 hover:scale-105 transition-transform">
              <GitBranch className="w-5 h-5 text-gray-600" />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> by <a href="https://github.com/micromimo" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 underline underline-offset-2 transition-colors">micromimo🎀👿</a>
          </p>
        </div>
      </div>
    </div>
  )
}