# zpi-zp41_appWEB-HryshchenkoYuliia-KPI-2025

KPI, Zpi-zp41, Web-application design

Структура файлів:
Lab6/
├── 1-timer.html
├── 2-snackbar.html
├── 3-image-search.html
├── css/
│ ├── 1-timer.css
│ ├── 2-snackbar.css
│ └── 3-image-search.css
└── js/
├── 1-timer.js
├── 2-snackbar.js
└── 3-image-search.js

Інструкції щодо запуску:
Перевірити, що структура папок така, як показано вище.

Перевірити, чи встановлені NPM та NodeJS
node -v
npm -v

Встановити NPM та NodeJS, якщо вони не встановлені
sudo apt update
sudo apt install nodejs
sudo apt install npm

Встановіть залежності NPM:
Відкрийте термінал у корені вашого проекту.
Виконайте npm init -y (якщо ще не ініціалізували проект).

Встановити бібліотеки:
npm install flatpickr izitoast simplelightbox

Запустити проект за допомогою Vite:
Якщо не встановлений Vite globalльно, встановити: npm install -g vite
Або встановити як залежність розробки: npm install --save-dev vite

Додати скрипт dev до package.json:
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
}

Запустити розробницький сервер: npm run dev
Vite надасть локальну адресу (наприклад, http://localhost:5173/).

Відкрити файли у браузері, додавши їх до URL:
Для таймера: http://localhost:5173/1-timer.html
Для генератора промісів: http://localhost:5173/2-snackbar.html
Для пошуку зображень: http://localhost:5173/3-image-search.html
