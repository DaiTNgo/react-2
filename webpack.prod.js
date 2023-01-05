const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new StylexPlugin(),
];

const NODE_MODULES = /node_modules/;

module.exports = {
    entry: path.join(__dirname, "src", "main.tsx"),
    target: "web",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash].js",
        assetModuleFilename: "assets/[hash][ext][query]",

        //path insert in html
        publicPath: "./",
    },

    mode: "production",
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
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
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
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

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
};
