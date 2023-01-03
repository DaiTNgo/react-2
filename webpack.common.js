const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
    }),
];

const NODE_MODULES = /node_modules/;

module.exports = {
    entry: path.join(__dirname, "src", "main.tsx"),

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: path.resolve(__dirname, "dist", "assets"),
    },

    mode: "development",

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
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: NODE_MODULES,
                use: "swc-loader",
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: NODE_MODULES,
                use: {
                    loader: "ts-loader",
                    options: {
                        // @description: When used with babel-loader, the parseMap option must be set to true.
                        parseMap: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                exclude: NODE_MODULES,
                use: "assets/resource",
            },
        ],
    },
    plugins: plugins,
};
