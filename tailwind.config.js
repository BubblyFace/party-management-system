/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'red-party': '#d73527',
          'red-light': '#f8e8e6',
        },
        fontFamily: {
          'chinese': ['PingFang SC', 'Microsoft YaHei', 'SimHei', 'Arial', 'sans-serif'],
        }
      },
    },
    plugins: [],
  } 