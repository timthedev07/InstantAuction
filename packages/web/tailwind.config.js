const colors = require(`tailwindcss/colors`);
module.exports = {
  purge: ["./src/pages/**/*.{tsx,ts}", "./src/components/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif"
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"]
    },
    extend: {
      screens: {
        md2: "868px"
      },
      minWidth: {
        350: "350px"
      },
      colors: {
        "light-blue": colors.sky,
        cyan: colors.cyan,
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)"
        },
        secondary: {
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)"
        },
        neutral: {
          50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
          1000: "var(--color-neutral-1000)",
          1100: "var(--color-neutral-1100)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          disabled: "var(--color-accent-disabled)"
        }
      },
      typography: theme => ({
        light: {
          css: [
            {
              backgroundColor: theme("primary-bg"),
              color: theme("colors.gray.200"),
              '[class~="lead"]': {
                color: theme("colors.gray.200")
              },
              a: {
                color: theme("colors.white")
              },
              strong: {
                color: theme("colors.white")
              },
              "ol > li::before": {
                color: theme("colors.gray.400")
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600")
              },
              hr: {
                borderColor: theme("colors.gray.200")
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.600")
              },
              h1: {
                color: theme("colors.white")
              },
              h2: {
                color: theme("colors.white")
              },
              h3: {
                color: theme("colors.white")
              },
              h4: {
                color: theme("colors.white")
              },
              "figure figcaption": {
                color: theme("colors.gray.400")
              },
              code: {
                color: theme("colors.white")
              },
              "a code": {
                color: theme("colors.white")
              },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800")
              },
              thead: {
                color: theme("colors.white"),
                borderBottomColor: theme("colors.gray.400")
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.600")
              },
              "code::before": {
                content: '""'
              },
              "code::after": {
                content: '""'
              }
            }
          ]
        }
      })
    }
  },
  variants: {
    extend: {
      typography: ["dark"],
      cursor: ["hover", "focus"]
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
