/**
 * 司机互助圈 Demo 公共脚本
 */

// 工具函数
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

function showToast(message, duration = 2000) {
  let toast = $('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function openModal(id) {
  const modal = $(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = $(id);
  if (modal) modal.classList.remove('active');
}

function closeAllModals() {
  $$('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// 模拟拼车需求数据
const mockCarpools = [
  {
    id: 1,
    name: '张师傅',
    initial: '张',
    rating: 4.9,
    credit: 92,
    distance: '2.3km',
    from: '望京SOHO',
    to: '天通苑',
    time: '00:30',
    tag: '有车可带2人',
    tagType: 'success',
    hasCar: true,
    seats: 2,
    remark: '有车可带2人，后排宽敞，电动车可放后备箱',
    verified: true
  },
  {
    id: 2,
    name: '李师傅',
    initial: '李',
    rating: 4.7,
    credit: 85,
    distance: '3.1km',
    from: '三里屯',
    to: '回龙观',
    time: '00:45',
    tag: '求带，愿分摊车费',
    tagType: 'warning',
    hasCar: false,
    seats: 0,
    remark: '求带，愿分摊车费，有折叠电动车',
    verified: true
  },
  {
    id: 3,
    name: '王师傅',
    initial: '王',
    rating: 4.8,
    credit: 88,
    distance: '1.5km',
    from: '国贸',
    to: '通州北苑',
    time: '01:00',
    tag: '有车可带1人',
    tagType: 'success',
    hasCar: true,
    seats: 1,
    remark: '顺路回家，可带一人',
    verified: true
  },
  {
    id: 4,
    name: '赵师傅',
    initial: '赵',
    rating: 4.6,
    credit: 80,
    distance: '4.2km',
    from: '中关村',
    to: '西二旗',
    time: '01:15',
    tag: '求带，愿分摊车费',
    tagType: 'warning',
    hasCar: false,
    seats: 0,
    remark: '电动车快没电了，求捎带',
    verified: false
  },
  {
    id: 5,
    name: '陈师傅',
    initial: '陈',
    rating: 4.9,
    credit: 94,
    distance: '0.8km',
    from: '望京SOHO',
    to: '回龙观',
    time: '00:20',
    tag: '有车可带3人',
    tagType: 'success',
    hasCar: true,
    seats: 3,
    remark: '商务车空间大，可带多人',
    verified: true
  },
  {
    id: 6,
    name: '刘师傅',
    initial: '刘',
    rating: 4.5,
    credit: 78,
    distance: '5.0km',
    from: '东直门',
    to: '天通苑',
    time: '01:30',
    tag: '求带，愿分摊车费',
    tagType: 'warning',
    hasCar: false,
    seats: 0,
    remark: '顺路单没匹配到，求顺路车',
    verified: true
  }
];

// 模拟接驳车线路数据
const mockShuttles = [
  {
    id: 1,
    line: '望京 → 天通苑',
    times: ['00:30', '23:30', '01:00'],
    seats: 3,
    price: 15,
    owner: '王车主',
    rating: 4.8,
    vehicle: '五菱宏光 7座'
  },
  {
    id: 2,
    line: '国贸 → 通州北苑',
    times: ['00:00', '00:45', '01:30'],
    seats: 2,
    price: 12,
    owner: '刘车主',
    rating: 4.9,
    vehicle: '比亚迪宋 5座'
  },
  {
    id: 3,
    line: '三里屯 → 回龙观',
    times: ['23:50', '00:40', '01:20'],
    seats: 4,
    price: 18,
    owner: '陈车主',
    rating: 4.7,
    vehicle: '别克GL8 7座'
  },
  {
    id: 4,
    line: '中关村 → 西二旗',
    times: ['00:15', '01:00'],
    seats: 5,
    price: 10,
    owner: '杨车主',
    rating: 4.8,
    vehicle: '大众帕萨特 5座'
  },
  {
    id: 5,
    line: '东直门 → 天通苑',
    times: ['23:40', '00:30', '01:10'],
    seats: 1,
    price: 16,
    owner: '周车主',
    rating: 4.6,
    vehicle: '丰田凯美瑞 5座'
  }
];

// 模拟顺风捎带数据
const mockRideshare = [
  {
    id: 1,
    driverA: '张师傅',
    driverAInitial: '张',
    destination: '天通苑',
    endPoint: '望京SOHO附近',
    price: 15,
    distance: '距你2.3km',
    status: '可捎带1人',
    time: '00:30 到达'
  },
  {
    id: 2,
    driverA: '王师傅',
    driverAInitial: '王',
    destination: '回龙观',
    endPoint: '三里屯附近',
    price: 18,
    distance: '距你3.5km',
    status: '可捎带2人',
    time: '00:45 到达'
  },
  {
    id: 3,
    driverA: '李师傅',
    driverAInitial: '李',
    destination: '通州北苑',
    endPoint: '国贸附近',
    price: 12,
    distance: '距你1.8km',
    status: '可捎带1人',
    time: '01:00 到达'
  }
];

// 渲染拼车列表
function renderCarpoolList(containerId, list) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = list.map(item => `
    <div class="card carpool-card" data-id="${item.id}">
      <div class="list-item">
        <div class="avatar">${item.initial}</div>
        <div class="content">
          <div class="name-row" style="display:flex;align-items:center;gap:8px;">
            <span class="name">${item.name}</span>
            <span class="text-sm text-secondary">★${item.rating}</span>
          </div>
          <div class="meta">距你 ${item.distance}</div>
        </div>
        <div class="action">
          <button class="btn btn-primary btn-sm" onclick="goToDetail(${item.id})">我想拼</button>
        </div>
      </div>
      <div class="route-line">
        <span class="dot start"></span>
        <span class="addr">${item.from}</span>
        <span class="arrow">→</span>
        <span class="dot end"></span>
        <span class="addr">${item.to}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <span class="text-sm text-secondary">⏰ ${item.time}出发</span>
          <span class="tag tag-${item.tagType}" style="margin-left:8px;">${item.tag}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 渲染接驳车列表
function renderShuttleList(containerId, list) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = list.map(item => `
    <div class="card shuttle-card" data-id="${item.id}">
      <div class="shuttle-line">
        <span class="line-name">${item.line}</span>
        <span class="price">💰 ${item.price}元/人</span>
      </div>
      <div class="time-tags">
        ${item.times.map(t => `<span class="time-tag">⏰ ${t}</span>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
        <div class="text-sm text-secondary">
          剩余${item.seats}座 · ${item.owner} ★${item.rating}
          ${item.vehicle ? `· ${item.vehicle}` : ''}
        </div>
        <button class="btn btn-primary btn-sm" onclick="goToBooking(${item.id})">预约</button>
      </div>
    </div>
  `).join('');
}

// 渲染顺风捎带列表
function renderRideshareList(containerId, list) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = list.map(item => `
    <div class="card rideshare-card" data-id="${item.id}">
      <div class="list-item">
        <div class="avatar">${item.driverAInitial}</div>
        <div class="content">
          <div class="name-row" style="display:flex;align-items:center;gap:8px;">
            <span class="name">${item.driverA} 的顺路单</span>
            <span class="tag tag-primary">顺风捎带</span>
          </div>
          <div class="meta">${item.distance} · ${item.status}</div>
        </div>
        <div class="action">
          <button class="btn btn-primary btn-sm" onclick="demoMatch('driverB')">申请搭车</button>
        </div>
      </div>
      <div class="route-line">
        <span class="dot start"></span>
        <span class="addr">${item.endPoint}</span>
        <span class="arrow">→</span>
        <span class="dot end"></span>
        <span class="addr">${item.destination}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <span class="text-sm text-secondary">⏰ ${item.time}</span>
          <span class="text-sm" style="margin-left:12px;color:var(--danger);font-weight:600;">建议费用：${item.price}元</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 页面跳转
function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

function goToBooking(id) {
  window.location.href = `booking.html?id=${id}`;
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// 获取URL参数
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// 初始化Tab切换
document.addEventListener('DOMContentLoaded', function() {
  // Tab 切换
  $$('.tab-bar .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const target = this.dataset.target;
      if (!target) return;
      $$('.tab-bar .tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      const panel = $(target);
      if (panel) panel.classList.add('active');
    });
  });

  // 返回按钮
  $$('.back-btn').forEach(btn => {
    btn.addEventListener('click', goBack);
  });

  // 选项切换
  $$('.option').forEach(opt => {
    opt.addEventListener('click', function() {
      const group = this.closest('.option-group');
      if (group) {
        group.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
      }
      this.classList.add('active');
      const target = this.dataset.show;
      const hide = this.dataset.hide;
      if (target) $(target)?.classList.remove('hidden');
      if (hide) $(hide)?.classList.add('hidden');
    });
  });

  // 关闭弹窗
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this && this.dataset.closeOnClick !== 'false') {
        this.classList.remove('active');
      }
    });
  });
});

// 简单的隐藏类样式（动态注入）
const style = document.createElement('style');
style.textContent = '.hidden { display: none !important; }';
document.head.appendChild(style);
