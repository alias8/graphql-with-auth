import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack, {Stats} from "webpack";
import nodeExternals from "webpack-node-externals";

if (!["dev", "test", "prod"].some(env => process.env.ENV!.toString() === env)) {
    throw new Error(
        "Environment must be set in the npm script eg. ENV=dev, ENV=test, ENV=prod"
    );
}

const isDevelopment: boolean = process.env.ENV !== "prod";

const webpackConfigBase = (): webpack.Configuration => {
    return {
        mode: isDevelopment ? "development" : "production",
        watch: isDevelopment,
        devtool: isDevelopment ? "inline-source-map" : false,
        optimization: {
            // We no not want to minimize our code.
            minimize: false
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    // Loads the javacript into html template provided.
                    // Entry point is set below in HtmlWebPackPlugin in Plugins
                    test: /\.html$/,
                    use: "html-loader"
                },
                {
                    test: /\.scss$/,
                    loader: [
                        isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                },
                                sourceMap: isDevelopment,
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"]
        },
    };
};

const webpackConfigServer = (): webpack.Configuration => {
    return {
        ...webpackConfigBase(),
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        entry: {
            server: "./server/server.ts"
        },
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()]
    }
};

export const webpackConfigClient = (): webpack.Configuration => {
  return {
    ...webpackConfigBase(),
      output: {
          filename: "[name].bundle.js",
          path: path.resolve(__dirname, "dist", "public"),
      },
    entry: {
      client: "./client/index.tsx"
    },
    target: 'web',
    plugins: [
      new HtmlWebpackPlugin({
        template: "client/index.html",
        filename: "./index.html",
        excludeChunks: ['server']
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
      })
    ]
  }
};

webpack([webpackConfigServer(), webpackConfigClient()], (err: Error, stats: Stats) => {
    if (err) {
      console.error(err.stack || err);
      if ((err as any).details) {
        console.error((err as any).details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    // // Log result...
});
