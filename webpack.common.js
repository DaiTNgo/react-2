const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "main.tsx"),
    target: "web",

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        assetModuleFilename: "assets",

        //path insert in html
        publicPath: "/",
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
};
