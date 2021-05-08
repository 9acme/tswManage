const path = require('path');

//用于返回根路径加name的字符串
function resolve(name) {
  return path.join(__dirname, name);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src') //给目录配置别名
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";@import "@/styles/mixin.scss";`
      }
    }
  }
};
