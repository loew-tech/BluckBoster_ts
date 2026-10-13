module.exports = {
  presets: [
    "@babel/preset-env",         // For compiling modern JS
    "@babel/preset-typescript",  // For TypeScript
    ["@babel/preset-react", { runtime: "automatic" }] // For JSX/React
  ],
};