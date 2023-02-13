const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api/kafkaUser": {
        target: "http://10.20.5.60:8080",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
