import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mermaid from 'mermaid';
import jsPDF from 'jspdf';

export default function MindmapSubpage() {
  const mindmapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRendered, setIsRendered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [mindmapCode, setMindmapCode] = useState(`erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : includes
    CUSTOMER {
        string id
        string name
        string email
    }
    ORDER {
        string id
        date orderDate
        string status
    }
    PRODUCT {
        string id
        string name
        float price
    }
    ORDER_ITEM {
        int quantity
        float price
    }`);

  useEffect(() => {
    if (isRendered) return;

    const initAndRender = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#fbcfe8',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#ec4899',
            lineColor: '#ec4899',
            secondaryColor: '#ddd6fe',
            tertiaryColor: '#cffafe',
            mainBkg: 'transparent',
            backgroundColor: 'transparent',
            nodeBorder: '#ec4899',
            nodeBg: 'rgba(255, 255, 255, 0.6)',
            nodeTextColor: '#1e293b',
            arrowColor: '#ec4899',
            edgeColor: '#ec4899',
            clusterBkg: 'rgba(255, 211, 219, 0.3)',
            clusterBorder: '#ec4899',
            actorBorder: '#ec4899',
            actorBg: 'rgba(255, 255, 255, 0.6)',
            actorTextColor: '#1e293b',
            activityBorder: '#ec4899',
            activityBg: 'rgba(255, 211, 219, 0.4)',
            activityTextColor: '#1e293b',
            noteBorder: '#8b5cf6',
            noteBg: 'rgba(221, 214, 254, 0.5)',
            noteTextColor: '#1e293b',
            fill: 'rgba(255, 211, 219, 0.3)',
            stroke: '#ec4899',
            fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
            fontSize: '14px',
          },
        });

        const renderMindmap = async () => {
          if (!mindmapRef.current) return;
          
          const container = mindmapRef.current.parentElement;
          if (container && container.offsetWidth === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
            return renderMindmap();
          }

          try {
            const uniqueId = `mindmap-${Date.now()}`;
            const result = await mermaid.render(uniqueId, mindmapCode);
            
            if (result && result.svg) {
              mindmapRef.current.innerHTML = result.svg;
              setIsRendered(true);
            } else if (result && typeof result === 'string') {
              mindmapRef.current.innerHTML = result;
              setIsRendered(true);
            } else {
              console.warn('Mermaid returned empty SVG, retrying...');
              await new Promise(resolve => setTimeout(resolve, 200));
              renderMindmap();
            }
          } catch (error) {
            console.error('Failed to render mindmap:', error);
          }
        };

        await renderMindmap();
      } catch (initError) {
        console.error('Failed to initialize mermaid:', initError);
      }
    };

    const timer = setTimeout(initAndRender, 100);
    return () => clearTimeout(timer);
  }, [isRendered]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.3, Math.min(2, scale * delta));
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('svg')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale(s => Math.min(2, s * 1.2));
  const handleZoomOut = () => setScale(s => Math.max(0.3, s / 1.2));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleSaveEdit = () => {
    setIsRendered(false);
    setShowEditModal(false);
  };

  const handleExportPDF = async () => {
    try {
      const renderResult = await mermaid.render('mindmap-export', mindmapCode);
      const svgContent = renderResult.svg || renderResult;
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('SVG element not found');
      }
      
      const viewBox = svgElement.getAttribute('viewBox');
      let width, height;
      
      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
        width = vbWidth;
        height = vbHeight;
      } else {
        width = parseFloat(svgElement.getAttribute('width')) || 800;
        height = parseFloat(svgElement.getAttribute('height')) || 600;
      }
      
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);
      
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
      
      URL.revokeObjectURL(url);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      
      const padding = 20;
      const pageWidth = width + padding * 2;
      const pageHeight = height + padding * 2;
      
      const pdf = new jsPDF({
        orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pageWidth, pageHeight],
      });
      
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', padding, padding, width, height);
      
      pdf.save('mindmap.pdf');
    } catch (error) {
      console.error('Export PDF error:', error);
      alert(`导出PDF失败: ${error.message}`);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mermaid Flowchart & Diagrams',
          text: '查看我的思维导图',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mindmap=${encodeURIComponent(mindmapCode)}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShowShareModal(true);
      }).catch(() => {
        setShowShareModal(true);
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-heading">Mermaid Flowchart & Diagrams</h2>
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted">缩放: {Math.round(scale * 100)}%</div>
          <button
            onClick={handleExportPDF}
            className="glass-button text-sm flex items-center gap-2 text-body hover:text-pink-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>输出为PDF</span>
          </button>
          <button
            onClick={handleShare}
            className="glass-button text-sm flex items-center gap-2 text-body hover:text-pink-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>分享</span>
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="glass-button text-sm flex items-center gap-2 text-pink-700"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            <span>编辑</span>
          </button>
        </div>
      </div>
      
      <motion.div 
        className="flex-1 liquid-glass rounded-2xl overflow-hidden relative"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <div id="mindmap-container" ref={mindmapRef} className="w-full h-full flex items-center justify-center p-8" />
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="glass-button w-10 h-10 flex items-center justify-center hover:text-pink-700 transition-colors"
            title="放大"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="glass-button w-10 h-10 flex items-center justify-center hover:text-pink-700 transition-colors"
            title="缩小"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="glass-button w-10 h-10 flex items-center justify-center hover:text-pink-700 transition-colors"
            title="重置"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEditModal && (
          <motion.div
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-panel p-6 w-full max-w-2xl max-h-[80vh]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="modal-title">编辑 Mermaid 图表</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="glass-button text-muted hover:text-body p-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-4 h-[calc(80vh-100px)]">
                <div className="flex-1">
                  <label className="modal-label mb-1.5 block">Mermaid 代码</label>
                  <textarea
                    value={mindmapCode}
                    onChange={(e) => setMindmapCode(e.target.value)}
                    className="w-full h-full min-h-[300px] p-4 bg-white/30 rounded-xl border border-white/40 text-sm font-mono text-body resize-none focus:outline-none focus:border-pink-400/50 focus:bg-white/40 transition-all"
                    placeholder="在此输入 Mermaid 代码..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 modal-action-button"
                  >
                    保存
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showShareModal && (
          <motion.div
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-panel p-6 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">分享图表</h3>
              <div className="modal-input p-3 mb-4">
                <input
                  type="text"
                  value={`${window.location.origin}${window.location.pathname}?mindmap=${encodeURIComponent(mindmapCode)}`}
                  readOnly
                  className="w-full bg-transparent text-sm text-body font-mono break-all outline-none"
                />
              </div>
              <p className="text-sm text-body mb-5 text-center">链接已复制到剪贴板！</p>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full modal-action-button"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}