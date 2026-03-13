/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
  theme: {
		colors: {
			primary: "#FD86D4",
			surface: "#0E1422",
			accent:  "#FF5722",
			text: "#F8FAFC",
			textMuted: "#A3ADC2",
			linnk: "#17B9C4",
		},
    extend: {

		},
  },
  plugins: [],
}

