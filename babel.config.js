module.exports = {
    presets: ["@babel/preset-react", "@babel/preset-env"],
    plugins: [
        // "@babel/plugin-syntax-dynamic-import",
        // "@babel/plugin-proposal-object-rest-spread",
        // "@babel/plugin-transform-runtime",
        // ["@babel/plugin-transform-modules-commonjs"],
        // [
        //   "@babel/plugin-transform-spread",
        //   {
        //     loose: true,
        //   },
        // ],
        // ["@babel/plugin-proposal-decorators", { legacy: true }],
        // ["@babel/plugin-proposal-class-properties", { loose: true }],
        [
            "@ladifire-opensource/babel-plugin-transform-stylex",
            {
                inject: true, // will inject compiled css to stylesheet in head
            },
        ],
    ],
};
