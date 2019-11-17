const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: "development",
    output: {
        sourceMapFilename: 'bundle.js.map',
    },
    devtool: 'source-map',
    watchOptions: {
        poll: 500
    }
});