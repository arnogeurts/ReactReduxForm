var HtmlWebpackPlugin = require('html-webpack-plugin');

const example = process.env.EXAMPLE || 'auth';

module.exports = {
    entry: __dirname + '/examples/src/' + example + '/app.js',
    output: {
        path: 'examples/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'stage-1', 'es2015'],
                plugins: ['transform-class-properties']
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/examples/assets/template.html',
            filename: 'index.html'
        })
    ]
};