// vue.config.js

module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  pages: {
    login: {
      entry: "src/login/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
    main: {
      entry: "src/main/main.js",
      template: "public/page.html",
      filename: "page.html",
    },
  },
  devServer: {
    proxy: {
      "/users": {
        target: 'http://api.drive.jinsu.me',
        changeOrigin: true,
      },
      "/files": {
        target: 'http://api.drive.jinsu.me',
        changeOrigin: true,
      },
    }
  }
  //     "/main": {
  //       target: "http://localhost:8080/",
  //     },
  //   },
  // },
};