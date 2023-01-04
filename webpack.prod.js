const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
];

const NODE_MODULES = /node_modules/;

module.exports = {
    entry: path.join(__dirname, "src", "main.tsx"),

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        // publicPath: path.join(__dirname, "dist"),
        publicPath: "/",
    },

    mode: "production",
    // devtool: false,

    devServer: {
        setupExitSignals: true,
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
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
                        loader: "swc-loader",
                        options: {
                            //When used with babel-loader, the parseMap option must be set to true.
                            parseMap: true,
                        },
                    },
                ],
            },
            // {
            //     test: /\.(ts|tsx|js|jsx)$/,
            //     exclude: NODE_MODULES,
            //     use: {
            //         loader: "ts-loader",
            //         options: {
            //             // @description: When used with babel-loader, the parseMap option must be set to true.
            //             parseMap: true,
            //         },
            //     },
            // },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                exclude: NODE_MODULES,
                use: "assets/resource",
            },
        ],
    },
    plugins: plugins,
};
