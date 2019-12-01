const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    app: `./src/app.tsx`
    // common: ["react", "react-dom", "react-router-dom"],
    // antdlib: ["antd"],
  },
  output: {
    path: path.resolve(`./dist`),
    filename: "[name].js"
    // library: "[name]_library",
  },
  plugins: [
    new HTMLPlugin({
      template: `./src/index.html`,
      filename: "index.html"
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 8081 })
  ],
  // optimization: {
  //   // minimize: false,
  //   splitChunks: {
  //     chunks: "initial", // async 异步代码分割；initial 同步代码分割；all 同步异步分割都开启
  //     minSize: 30000 // 引入的模块大于 300kb 时进行分割
  //     // minChunks: 1, // 模块的最小被引用次数
  //     // maxAsyncRequests: 5, // 按需加载的最大并行请求数
  //     // maxInitialRequests: 3, // 一个入口（首页）最大并行请求数
  //     // automaticNameDelimiter: "~", // 文件名的连接符
  //     // name: true, // 缓存组里面的 fileName 生效，覆盖默认命名
  //     // 缓存组，将所有加载模块放在缓存里面一起分割打包
  //     // cacheGroups: {
  //     //   //自定义打包模块
  //     //   vendors: {
  //     //     test: /[\\/]node_modules[\\/]/,
  //     //     priority: 0, // 优先级，先打包到哪个组里面，值越大优先级越高
  //     //     filename: "vendors.js"
  //     //     // reuseExistingChunk: true,
  //     //   },
  //     //   // 默认打包模块，一般情况下打包业务模块编码
  //     //   default: {
  //     //     minChunks: 2,
  //     //     filename: "common.js",
  //     //     priority: -20,
  //     //     reuseExistingChunk: true // 模块嵌套引入时，判断是否复用已经被打包的模块
  //     //   }
  //     // }
  //   }
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `src`),
      "@@": path.resolve(__dirname, `src/components`)
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]-[local]"
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
        // options: {
        //   plugins: [
        //     [
        //       "import",
        //       {
        //         libraryName: "antd",
        //         libraryDirectory: "es",
        //         style: "css" // `style: true` 会加载 less 文件
        //       }
        //     ]
        //   ]
        // },
        // exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg|ttf|woff|woff2|eot)$/,
        loader: "url-loader"
      }
    ]
  }
};
