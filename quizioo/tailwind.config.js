/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
  theme: {
    extend: {
			colors: {
				primary: "#FD86D4",
				secondary: "#F5F5F5",
				accent: "#FF5722",
			},
		},
  },
  plugins: [],
}

