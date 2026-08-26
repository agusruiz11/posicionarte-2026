/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
				display: ['var(--font-display)', 'Georgia', 'serif'],
			},
			colors: {
				/* Tokens de shadcn. El sufijo `/ <alpha-value>` es lo que permite
				   escribir bg-primary/90 y que salga CSS válido. */
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					hover: 'hsl(var(--primary-hover) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
					// `text-destructive-text` para texto rojo, `bg-destructive` para
					// rellenos. En modo oscuro no son el mismo valor.
					text: 'hsl(var(--destructive-text) / <alpha-value>)',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
				},

				/* Tokens semánticos propios. Son los que usan los componentes:
				   declaran intención, no color, y cada tema resuelve el valor.
				   Ver src/app/globals.css. */
				surface: {
					0: 'hsl(var(--surface-0) / <alpha-value>)',
					1: 'hsl(var(--surface-1) / <alpha-value>)',
					2: 'hsl(var(--surface-2) / <alpha-value>)',
				},
				ink: {
					DEFAULT: 'hsl(var(--text-1) / <alpha-value>)',
					muted: 'hsl(var(--text-2) / <alpha-value>)',
					subtle: 'hsl(var(--text-3) / <alpha-value>)',
				},
				brand: {
					DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
					hover: 'hsl(var(--brand-hover) / <alpha-value>)',
				},
				hairline: 'hsl(var(--hairline) / <alpha-value>)',

				/* Color de WhatsApp. Solo para el botón de WhatsApp, según el kit. */
				whatsapp: {
					DEFAULT: '#25D366',
					hover: '#1EBE5A',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};