import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        neon: {
          cyan: "hsl(var(--neon-cyan))",
          magenta: "hsl(var(--neon-magenta))",
        },
        status: {
          inactive: "hsl(var(--status-inactive))",
          active: "hsl(var(--status-active))",
          warning: "hsl(var(--status-warning))",
          overtime: "hsl(var(--status-overtime))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.7", boxShadow: "0 0 5px var(--glow-color), 0 0 10px var(--glow-color)" },
          "50%": { opacity: "1", boxShadow: "0 0 10px var(--glow-color), 0 0 20px var(--glow-color)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "glow-cyan": "0 0 5px hsl(var(--neon-cyan)), 0 0 10px hsl(var(--neon-cyan))",
        "glow-magenta": "0 0 5px hsl(var(--neon-magenta)), 0 0 10px hsl(var(--neon-magenta))",
      },
      textShadow: {
        "glow-cyan": "0 0 8px hsla(var(--neon-cyan), 0.8)",
        "glow-magenta": "0 0 8px hsla(var(--neon-magenta), 0.8)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities, theme }: { addUtilities: any; theme: any }) => {
      const newUtilities = {
        ".text-glow-cyan": {
          textShadow: theme("textShadow.glow-cyan"),
        },
        ".text-glow-magenta": {
          textShadow: theme("textShadow.glow-magenta"),
        },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    },
  ],
} satisfies Config

export default config
