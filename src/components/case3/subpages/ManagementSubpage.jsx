import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { managementTabs, productsData, usersData, ordersData, analyticsData, defaultFormData, tableHeaders } from '../../../data/case3/management';
import { StaggerItem } from '../../ui/animations';

export default function ManagementSubpage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    setEditingItem(null);
    const defaultForm = defaultFormData[activeTab] || {};
    setFormData(defaultForm);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id, dataType) => {
    if (dataType === 'products') setProducts(prev => prev.filter(item => item.id !== id));
    if (dataType === 'users') setUsers(prev => prev.filter(item => item.id !== id));
    if (dataType === 'orders') setOrders(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    setShowModal(false);
  };

  const [productsState, setProducts] = useState(productsData);
  const [usersState, setUsers] = useState(usersData);
  const [ordersState, setOrders] = useState(ordersData);

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {productsState.map((item, index) => (
              <StaggerItem
                key={item.id}
                index={index}
                direction="left"
                className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-heading">{item.name}</span>
                </div>
                <div className="text-sm text-body">{item.category}</div>
                <div className="text-sm font-mono text-heading">¥{item.price}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-body">
                    编辑
                  </button>
                  <button onClick={() => handleDelete(item.id, 'products')} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-600">
                    删除
                  </button>
                </div>
              </StaggerItem>
            ))}
          </div>
        );
      case 'users':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {usersState.map((item, index) => (
              <StaggerItem
                key={item.id}
                index={index}
                direction="left"
                className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-heading">{item.name}</span>
                </div>
                <div className="text-sm text-body">{item.email}</div>
                <div className="text-sm text-body">{item.role}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-body">
                    编辑
                  </button>
                  <button onClick={() => handleDelete(item.id, 'users')} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-600">
                    删除
                  </button>
                </div>
              </StaggerItem>
            ))}
          </div>
        );
      case 'orders':
        return (
          <div className="flex-1 overflow-auto space-y-2">
            {ordersState.map((item, index) => (
              <StaggerItem
                key={item.id}
                index={index}
                direction="left"
                className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-600' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.status === 'completed' ? '已完成' : item.status === 'pending' ? '待处理' : '处理中'}
                  </span>
                  <span className="text-sm font-medium text-heading">{item.orderNo}</span>
                </div>
                <div className="text-sm text-body">{item.customer}</div>
                <div className="text-sm font-mono text-heading">¥{item.amount}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-white/40 hover:bg-white/60 transition-colors text-body">
                    查看
                  </button>
                </div>
              </StaggerItem>
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-2 gap-4">
            {analyticsData.map((item) => (
              <div key={item.id} className="liquid-glass rounded-xl p-4">
                <div className="text-xs text-muted mb-2">{item.metric}</div>
                <div className="text-2xl font-bold text-heading">{item.value}</div>
                <div className={`text-xs mt-2 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderHeaders = () => {
    return tableHeaders[activeTab] || [];
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-heading">数据管理</h2>
        {activeTab !== 'analytics' && (
          <button onClick={handleAdd} className="glass-button hover:text-pink-700 flex items-center gap-2">
            <span>+</span>
            <span>添加</span>
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {managementTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
              activeTab === tab.id
                ? 'text-pink-700'
                : 'bg-white/30 text-body hover:bg-white/50'
            }`}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, rgba(255, 211, 219, 0.8), rgba(255, 211, 219, 0.4))',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            } : {}}
          >
            {activeTab === tab.id && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-hidden flex flex-col">
        {activeTab !== 'analytics' && (
          <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-white/20">
            {renderHeaders().map((header) => (
              <div key={header} className="font-semibold text-sm text-heading">{header}</div>
            ))}
          </div>
        )}
        {renderContent()}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 modal-overlay z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="modal-panel p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="modal-title mb-5">{editingItem ? '编辑项目' : '添加项目'}</h3>
            <div className="space-y-4">
              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">名称</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">分类</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入分类"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">价格</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || '' })}
                      className="modal-input w-full"
                      placeholder="输入价格"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="active">活跃</option>
                      <option value="inactive">停用</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">名称</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">邮箱</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入邮箱"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">角色</label>
                    <select
                      value={formData.role || 'user'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="admin">管理员</option>
                      <option value="editor">编辑</option>
                      <option value="user">用户</option>
                    </select>
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="active">活跃</option>
                      <option value="inactive">停用</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'orders' && (
                <>
                  <div>
                    <label className="modal-label mb-1.5 block">订单号</label>
                    <input
                      type="text"
                      value={formData.orderNo || ''}
                      onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入订单号"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">客户</label>
                    <input
                      type="text"
                      value={formData.customer || ''}
                      onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                      className="modal-input w-full"
                      placeholder="输入客户名称"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">金额</label>
                    <input
                      type="number"
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || '' })}
                      className="modal-input w-full"
                      placeholder="输入金额"
                    />
                  </div>
                  <div>
                    <label className="modal-label mb-1.5 block">状态</label>
                    <select
                      value={formData.status || 'pending'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="modal-input w-full"
                    >
                      <option value="pending">待处理</option>
                      <option value="processing">处理中</option>
                      <option value="completed">已完成</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-3 mt-7">
              <button onClick={() => setShowModal(false)} className="flex-1 modal-action-button-secondary">
                取消
              </button>
              <button onClick={handleSave} className="flex-1 modal-action-button">
                保存
              </button>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}