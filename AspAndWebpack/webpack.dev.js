var path = require("path");
var webpack = require("webpack");
var Merge = require("webpack-merge");
var CommonConfig = require("./webpack.common.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});

module.exports = Merge(CommonConfig, {
    devtool: "inline-source-map",

    entry: path.resolve(__dirname, "src/index.ts"),

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        // Making sure the CSS and JS files that are split out do not break the template cshtml.
        publicPath: "/dist/",
        // Defining a global var that can used to call functions from within ASP.NET Razor pages.
        library: "aspAndWebpack",
        libraryTarget: "var"
    },

    module: {
        rules: [
            // All css files will be handled here
            {
                test: /\.css$/,
                use: extractLess.extract({ fallback: "style-loader", use: ["css-loader"] })
            },

            // All files with ".less" will be handled and transpiled to css
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "less-loader", options: {
                            sourceMap: true
                        }
                    }]
                })
            },
        ]
    },

    plugins: ([
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),

        // Write out CSS bundle to its own file:
        extractLess
    ])
})