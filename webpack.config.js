const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    //エントリーポイントの設定
    entry: './app.js',
    output: {
        //出力先のパス
        path: path.resolve(__dirname, 'dist'),
        //出力するファイル名
        filename: 'bundle.js'
    },
    //これを動かすのに必要なパッケージ
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                /*
                 ローダー
                 異なる形式のファイル（cssとかSass(css関連）を
                 どのようにインポートするかをwebpackに指示できる。
                 */
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}]
                    ]
                }
            }]
        }]
    }
};

module.exports = config;