var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
    target: "web",

    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".html"],
    },

    module: {
        rules: [
            // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
            { test: /.ts$/, loader: "awesome-typescript-loader" },

            // All image files will be handled here
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:7].[ext]",
                            outputPath: "images/"
                        }
                    }
                ]
            },

            // All font files will be handled here
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            },
            /*
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            */

            // All files with ".html" will be handled 
            { test: /\.html$/, loader: "html-loader" },

            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: ([
        // make sure we allow any jquery usages outside of our webpack modules
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        // Clean dist folder.
        new CleanWebpackPlugin(["./dist"], {
            "verbose": true // Write logs to console.
        }),

        // avoid publishing when compilation failed.
        new webpack.NoEmitOnErrorsPlugin(),

        new ManifestPlugin({
            fileName: "build-manifest.json",
            //extensions: [".js", ".css", ".svg"]
        }),

        new HtmlWebpackPlugin({
            inject: false,
            filename: "../Views/Shared/_Layout.cshtml",
            template: "./Views/Shared/_Layout_Template.cshtml"
        })
    ]),

    // pretty terminal output
    stats: { colors: true }
};