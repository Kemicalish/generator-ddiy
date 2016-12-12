// generated on <%= date %> using <%= pkgName %> <%= pkgVersion %>
const webpack = require('webpack');
const conf = require('./<%= BUNDLER_DIRNAME %>/<%= BUNDLER_CONFIG_FILE %>');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: conf.paths.entry,
    output: conf.paths.output,
    devServer: {
        port:<%= devServer.PORT %>,
        inline: true //default should be true. Only use iframe if production should be within iframe too
    },
    devtool: 'source-map',
    module: {
        loaders: [
        {
            test: /\.html$/,
            loader: 'html'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            exclude: /node_modules/,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                //'image-webpack' //before enabling this, check the quality settings in the imageWebpackLoader section
            ]
        },
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { 
                from: './<%= APP_DIRNAME %>/index.html', 
                to: 'index.html',
                transform:function(content, path){
                    return content.toString()
                        .replace('<%= SCRIPTS_DIRNAME %>/<%= JS_ENTRY_FILENAME %>', conf.paths.output.filename)
                        .replace('[name]', Object.keys(conf.paths.entry)[0])
                }
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    imageWebpackLoader: {
        mozjpeg: {
            quality: 65
        },
        pngquant: {
            quality: '65-90',
            speed: 4
        },
        svgo: {
            plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    }
}