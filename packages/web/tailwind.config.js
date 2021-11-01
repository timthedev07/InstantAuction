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
        "primary-bg": "#111111"
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
