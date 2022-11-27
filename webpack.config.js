module.exports = {
    entry: __dirname + "/src/app.jsx",
    output: {
        path: __dirname + "/access/js/",
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            }
        ]
    }
};