module.exports = {
  distDir: ".next",
  webpack(config) {
    console.log("config", config);
    console.log("rules", config.module.rules[0]);
    const prod = process.env.NODE_ENV === "production";
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
    };
  },
};
