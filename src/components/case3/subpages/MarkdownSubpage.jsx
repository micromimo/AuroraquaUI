import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidRenderer from '../../../components/ui/MermaidRenderer';
import { MarkdownBlock } from '../../../components/ui/MarkdownLine';

export default function MarkdownSubpage() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(`# Auroraqua UI 设计文档

欢迎来到 Auroraqua UI 的设计文档页面。
## 表格

| 组件 | 描述 | 状态 |
|------|------|------|
| Button | 功能按钮 | ✅ |
| Card | 卡片 | ✅ |
| Modal | 弹窗组件 | ⏳ |
| Sidebar | 侧边栏 | ✅ |
| Input | 输入框 | ✅ |

## 引用

> Under the spreading chestnut tree. I sold you and you sold me. There lie they, and here lie we. Under the spreading chestnut tree.
> 
> —「1984」

## 代码示例

\`\`\`javascript
const greeting = "Hello, Auroraqua!";
console.log(greeting);

function createCard(title, content) {
  return {
    title: title,
    content: content,
    createdAt: new Date()
  };
}
\`\`\`

## 列表

### 有序列表

1. 第一步：安装依赖
2. 第二步：配置环境
3. 第三步：启动项目

### 无序列表

- 项目一
  - 子项目 A
  - 子项目 B
- 项目二
- 项目三

## 强调

这是 **粗体** 文本，这是 *斜体* 文本，这是 ~~删除线~~ 文本。

\`这是内联代码\`

## 链接

[访问 GitHub](https://github.com/micromimo/AuroraquaUI)

## 任务列表

- [x] 完成设计稿
- [x] 实现基础组件
- [ ] 添加动画效果
- [ ] 编写测试用例

## 分割线

---

## Mermaid 图表

\`\`\`mermaid
erDiagram
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
    }
\`\`\`

感谢阅读！
`);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMermaidModal, setShowMermaidModal] = useState(false);
  const [editingMermaidCode, setEditingMermaidCode] = useState('');
  const [mermaidCodeIndex, setMermaidCodeIndex] = useState(-1);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setShowShareModal(true);
    setTimeout(() => {
      setShowShareModal(false);
      setCopied(false);
    }, 2000);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const renderMarkdown = (mdContent) => {
    const lines = mdContent.split('\n');
    const elements = [];
    let i = 0;
    let keyCounter = 0;
    let inlineKeyCounter = 0;
    let lineIndex = 0;

    const renderInline = (text) => {
      let result = [];
      let remaining = text;

      const patterns = [
        { regex: /^~~([^~]+)~~/, component: (match) => <s key={`inline-${inlineKeyCounter++}`} className="line-through text-muted">{match[1]}</s> },
        { regex: /^\*\*([^*]+)\*\*/, component: (match) => <strong key={`inline-${inlineKeyCounter++}`} className="font-bold text-heading">{match[1]}</strong> },
        { regex: /^\*([^*]+)\*/, component: (match) => <em key={`inline-${inlineKeyCounter++}`} className="italic text-body">{match[1]}</em> },
        { regex: /^`([^`]+)`/, component: (match) => <code key={`inline-${inlineKeyCounter++}`} className="bg-slate-200/50 px-1.5 py-0.5 rounded text-xs font-mono text-pink-600">{match[1]}</code> },
        { regex: /^\[([^\]]+)\]\(([^)]+)\)/, component: (match) => <a key={`inline-${inlineKeyCounter++}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:underline">{match[1]}</a> },
      ];

      while (remaining.length > 0) {
        let matched = false;
        for (const { regex, component } of patterns) {
          const match = remaining.match(regex);
          if (match) {
            result.push(component(match));
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
        if (!matched) {
          result.push(remaining[0]);
          remaining = remaining.slice(1);
        }
      }
      return result;
    };

    const parseList = (startIndex) => {
      const listItems = [];
      let j = startIndex;
      const isCheckboxList = lines[j].startsWith('- [');
      const isOrderedList = /^\d+\. /.test(lines[j]);
      const listKey = keyCounter++;

      while (j < lines.length) {
        const line = lines[j];
        if (isCheckboxList && (line.startsWith('- [x]') || line.startsWith('- [ ]') || line.startsWith('- [ ]'))) {
          const checked = line.startsWith('- [x]');
          const text = line.slice(4);
          listItems.push(
            <li key={`li-${listKey}-${j}`} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checked ? 'bg-pink-500 border-pink-500' : 'border-slate-400 bg-white/30'}`}>
                {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className={`text-sm ${checked ? 'text-muted line-through' : 'text-body'}`}>{renderInline(text)}</span>
            </li>
          );
          j++;
        } else if (isOrderedList && /^\d+\. /.test(line)) {
          const text = line.replace(/^\d+\. /, '');
          const num = line.match(/^(\d+)/)[1];
          listItems.push(
            <li key={`li-${listKey}-${j}`} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{num}</span>
              <span className="text-sm text-body">{renderInline(text)}</span>
            </li>
          );
          j++;
        } else if (!isCheckboxList && !isOrderedList && (line.startsWith('- ') || line.startsWith('  - ') || line.startsWith('    - '))) {
          const indent = (line.match(/^(\s*)-/) || [])[1]?.length || 0;
          const text = line.trim().slice(2);
          listItems.push(
            <li key={`li-${listKey}-${j}`} className={`flex items-start gap-2 ${indent > 0 ? 'ml-6' : ''}`}>
              <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${indent > 0 ? 'bg-purple-400' : 'bg-pink-400'}`} />
              <span className="text-sm text-body">{renderInline(text)}</span>
            </li>
          );
          j++;
        } else if (line.trim() === '') {
          j++;
        } else {
          break;
        }
      }

      const ListComponent = isOrderedList ? 'ol' : 'ul';
      elements.push(
        <ListComponent key={`list-${listKey}`} className={`list-none space-y-${isCheckboxList ? '2' : '1'} my-3`}>
          {listItems}
        </ListComponent>
      );

      return j;
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('---') || line.startsWith('***')) {
        elements.push(<hr key={`hr-${keyCounter++}`} className="my-6 border-t border-white/30" />);
        i++;
        continue;
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={`h1-${keyCounter++}`} className="text-2xl font-bold text-heading mt-8 mb-4 pb-2 border-b border-white/20">{renderInline(line.slice(2))}</h1>);
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={`h2-${keyCounter++}`} className="text-xl font-bold text-heading mt-6 mb-3">{renderInline(line.slice(3))}</h2>);
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={`h3-${keyCounter++}`} className="text-lg font-bold text-heading mt-5 mb-2">{renderInline(line.slice(4))}</h3>);
        i++;
        continue;
      }

      if (line.startsWith('> ')) {
        let quoteContent = line.slice(2);
        i++;
        while (i < lines.length && (lines[i].startsWith('> ') || lines[i].trim() === '')) {
          if (lines[i].startsWith('> ')) {
            quoteContent += '\n' + lines[i].slice(2);
          }
          i++;
        }
        elements.push(<blockquote key={`quote-${keyCounter++}`} className="border-l-4 border-pink-400 pl-4 my-4 italic text-muted bg-pink-500/5 rounded-r-xl py-2 pr-4">{renderInline(quoteContent)}</blockquote>);
        continue;
      }

      if (line.startsWith('```')) {
        const lang = line.slice(3).trim();
        let code = '';
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          code += lines[i] + '\n';
          i++;
        }
        if (lang === 'mermaid') {
          const mermaidId = `mermaid-${keyCounter}`;
          elements.push(
            <div key={`code-${keyCounter++}`} className="my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted font-medium">mermaid</span>
                <button
                  onClick={() => {
                    setEditingMermaidCode(code.trim());
                    setMermaidCodeIndex(keyCounter);
                    setShowMermaidModal(true);
                  }}
                  className="glass-button text-xs text-pink-600 hover:text-pink-700 px-2 py-1"
                >
                  编辑
                </button>
              </div>
              <div 
                key={mermaidId} 
                id={mermaidId}
                className="bg-white/30 rounded-xl p-4 border border-white/30"
              >
                <MermaidRenderer code={code.trim()} />
              </div>
            </div>
          );
        } else {
          elements.push(
            <div key={`code-${keyCounter++}`} className="my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted font-medium">{lang || 'code'}</span>
              </div>
              <pre className="bg-black/15 rounded-xl p-4 text-xs font-mono overflow-x-auto text-body whitespace-pre-wrap"><code>{code}</code></pre>
            </div>
          );
        }
        i++;
        continue;
      }

      if (line.startsWith('|')) {
        let tableRows = [];
        let rowKeyCounter = 0;
        while (i < lines.length && lines[i].startsWith('|')) {
          const cells = lines[i].split('|').filter(c => c.trim());
          if (lines[i + 1] && lines[i + 1].startsWith('|') && lines[i + 1].includes('---')) {
            tableRows.push(
              <tr key={`tr-${keyCounter}-${rowKeyCounter++}`}>
                {cells.map((cell, idx) => <th key={`th-${rowKeyCounter}-${idx}`} className="border-b-2 border-pink-300/50 px-4 py-2 text-xs font-semibold text-heading bg-white/20">{cell.trim()}</th>)}
              </tr>
            );
            i += 2;
          } else {
            tableRows.push(
              <tr key={`tr-${keyCounter}-${rowKeyCounter++}`} className="hover:bg-white/10 transition-colors">
                {cells.map((cell, idx) => <td key={`td-${rowKeyCounter}-${idx}`} className="border-b border-white/10 px-4 py-2 text-xs text-body">{cell.trim()}</td>)}
              </tr>
            );
            i++;
          }
        }
        elements.push(<table key={`table-${keyCounter++}`} className="w-full rounded-xl overflow-hidden liquid-glass my-4"><tbody>{tableRows}</tbody></table>);
        continue;
      }

      if (line.startsWith('- [') || line.startsWith('- [x]') || line.startsWith('- [ ]') || line.startsWith('- ') || line.startsWith('  - ') || /^\d+\. /.test(line)) {
        i = parseList(i);
        continue;
      }

      if (line.trim()) {
        elements.push(<MarkdownBlock key={`p-${keyCounter++}`} index={lineIndex++}><p className="text-sm text-body my-3 leading-relaxed">{renderInline(line)}</p></MarkdownBlock>);
      }
      i++;
    }

    return elements.map((el, idx) => {
      if (el && el.type && el.type.displayName === 'MarkdownBlock') {
        return el;
      }
      return <MarkdownBlock key={idx} index={idx}>{el}</MarkdownBlock>;
    });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-heading">Markdown 文章</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`glass-button text-sm flex items-center gap-2 transition-colors ${isEditing ? 'text-pink-700 bg-pink-500/10' : 'hover:text-pink-700'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isEditing ? (
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              ) : (
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              )}
            </svg>
            <span>{isEditing ? '保存' : '编辑'}</span>
          </button>
          <button 
            onClick={handleShare}
            className="glass-button text-sm flex items-center gap-2 hover:text-pink-700 transition-colors"
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
        </div>
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[500px] p-4 bg-white/20 rounded-xl border border-white/30 text-sm font-mono text-body resize-none focus:outline-none focus:border-pink-400/50 focus:bg-white/30 transition-all"
              placeholder="在此输入 Markdown 内容..."
            />
          ) : (
            renderMarkdown(content)
          )}
        </div>
      </div>

      {isEditing && (
          <div className="flex items-center justify-center gap-4 text-xs text-muted">
            <span>支持: #标题 | **粗体** | *斜体* | ~~删除线~~ | `代码` | [链接] | - 列表 | {'&gt;'} 引用 | ```代码块``` | 表格 | --- 分割线 | - [x] 任务</span>
          </div>
        )}

      <AnimatePresence>
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
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 flex items-center justify-center border border-green-400/30">
                  <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="modal-title">{copied ? '链接已复制' : '分享链接'}</h3>
                <p className="text-sm text-body text-center">链接已复制到剪贴板</p>
                <div className="w-full modal-input p-4">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="w-full bg-transparent text-sm text-body font-mono break-all outline-none"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showMermaidModal && (
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
                  onClick={() => setShowMermaidModal(false)}
                  className="glass-button text-muted hover:text-body p-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-4 h-[calc(80vh-100px)]">
                <div className="flex-1 min-h-0">
                  <label className="modal-label mb-1.5 block">Mermaid 代码</label>
                  <textarea
                    value={editingMermaidCode}
                    onChange={(e) => setEditingMermaidCode(e.target.value)}
                    className="w-full h-[calc(50%-1rem)] p-4 bg-white/30 rounded-xl border border-white/40 text-sm font-mono text-body resize-none focus:outline-none focus:border-pink-400/50 focus:bg-white/40 transition-all"
                    placeholder="在此输入 Mermaid 代码..."
                  />
                </div>
                <div className="flex-1 min-h-0">
                  <label className="modal-label mb-1.5 block">预览</label>
                  <div className="w-full h-[calc(50%-1rem)] bg-white/30 rounded-xl border border-white/40 p-4 overflow-auto">
                    <MermaidRenderer code={editingMermaidCode} />
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => setShowMermaidModal(false)}
                    className="flex-1 modal-action-button-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      const linesArray = content.split('\n');
                      const newLines = [];
                      let inMermaid = false;
                      let mermaidCount = 0;
                      
                      for (let idx = 0; idx < linesArray.length; idx++) {
                        if (linesArray[idx].startsWith('```mermaid')) {
                          inMermaid = true;
                          mermaidCount++;
                          if (mermaidCount === mermaidCodeIndex) {
                            newLines.push('```mermaid');
                            newLines.push(...editingMermaidCode.split('\n'));
                            newLines.push('```');
                            inMermaid = false;
                            continue;
                          }
                        }
                        if (inMermaid && linesArray[idx].startsWith('```')) {
                          inMermaid = false;
                          continue;
                        }
                        if (!inMermaid) {
                          newLines.push(linesArray[idx]);
                        }
                      }
                      setContent(newLines.join('\n'));
                      setShowMermaidModal(false);
                    }}
                    className="flex-1 modal-action-button"
                  >
                    保存
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}