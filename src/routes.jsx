import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Init from './pages/Init'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import About from './pages/About'
import Case2 from './pages/Case2'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Init />} />
          <Route path="/init" element={<Init />} />
          <Route path="/case1" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/case1" replace />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/case2" element={<Case2 />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
