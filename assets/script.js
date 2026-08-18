// ============================================================
// SCRIPT DÙNG CHUNG CHO BẢNG BÁO GIÁ ACMAN Q3/2026 (HỒNG CÁNH SEN)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initThemeToggle();
  fillQuoteDates();
  initPrintButton();
  initSearchFilter();
});

/* ---- Chuyển tab & Lưu Hash URL ---- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.id === target);
      });

      // Cập nhật URL hash để chia sẻ link trực tiếp tới đúng tab
      history.replaceState(null, '', '#' + target);
    });
  });

  // Tự động mở đúng tab khi truy cập link có hash (vd: index.html#tab-hddt)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (targetBtn) targetBtn.click();
  }
}

/* ---- Bật / Tắt giao diện Sáng - Tối ---- */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('acman-theme-pink');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateToggleIcon(toggle);

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('acman-theme-pink', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('acman-theme-pink', 'light');
    }
    updateToggleIcon(toggle);
  });
}

function updateToggleIcon(toggle) {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  toggle.textContent = isLight ? '☀' : '🌸';
  toggle.title = isLight ? 'Đổi sang giao diện tối' : 'Đổi sang giao diện sáng';
}

/* ---- Điền ngày báo giá & hiệu lực ---- */
function fillQuoteDates() {
  const issueEl = document.querySelector('[data-quote-issue]');
  const expiryEl = document.querySelector('[data-quote-expiry]');
  if (!issueEl && !expiryEl) return;

  const today = new Date();
  const expiry = new Date('2026-09-30'); // Hiệu lực Quý 3/2026

  const fmt = d => d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  if (issueEl) issueEl.textContent = fmt(today);
  if (expiryEl) expiryEl.textContent = fmt(expiry);
}

/* ---- Nút in / Lưu PDF ---- */
function initPrintButton() {
  document.querySelectorAll('[data-action="print"]').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });
}

/* ---- Tìm kiếm nhanh gói báo giá ---- */
function initSearchFilter() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}
