const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");
const { merge } = require("webpack-merge");

const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new StylexPlugin(),
];

const NODE_MODULES = /node_modules/;

module.exports = merge(require("./webpack.common"), {
    mode: "development",
    devtool: "eval-source-map",

    devServer: {
        setupExitSignals: true,
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: StylexPlugin.loader,
                    },
                    {
                        loader: "swc-loader",
                        options: {
                            //When used with babel-loader, the parseMap option must be set to true.
                            parseMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                exclude: NODE_MODULES,
                type: "asset/resource",
            },
        ],
    },
    plugins: plugins,
});
