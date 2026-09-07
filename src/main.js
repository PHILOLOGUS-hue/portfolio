import './style.css';

const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');
const getStoredTheme = () => localStorage.getItem('portfolio-theme');
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.body.setAttribute('data-theme', theme);

  if (themeToggle && themeLabel && themeIcon) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
};

const initialTheme = getStoredTheme() || getPreferredTheme();
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

