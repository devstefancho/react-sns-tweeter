const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },
  distDir: ".next",
  webpack(config) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
    ];
    if (prod) {
      plugins.push(new CompressionPlugin());
    }
    console.log("config", config);
    console.log("rules", config.module.rules[0]);
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins,
    };
  },
});
