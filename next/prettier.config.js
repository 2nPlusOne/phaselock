module.exports = {
  semi: true, // Add semicolons at the end of each statement
  trailingComma: "all", // Add trailing commas wherever possible
  printWidth: 80, // Limit the line length to 80 characters
  tabWidth: 2, // Use 2 spaces for indentation
  endOfLine: "auto", // Use the operating system's default line ending
  quoteProps: "consistent", // If at least one key in an object requires quotes, quote all keys
  plugins: ["prettier-plugin-tailwindcss"],
};
