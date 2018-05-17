const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [
                  {
                    loader: 'vue-loader',
                    options: {
                      loaders: {

                        less: ExtractTextPlugin.extract({
                          use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                          fallback: 'vue-style-loader'
                        }),

                        scss: ExtractTextPlugin.extract({
                          use: ['css-loader?minimize', 'autoprefixer-loader', 'sass-loader'],
                          fallback: 'vue-style-loader'
                        }),

                        css: ExtractTextPlugin.extract({
                          use: ['css-loader', 'autoprefixer-loader'],
                          fallback: 'vue-style-loader'
                        })
                      }
                    }
                  }, {
                    loader: 'iview-loader',
                    options: {
                        prefix: false
                    }
                  }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [path.join(__dirname, './src'),path.join(__dirname, './src/api')],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.sass/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '~api': path.join(__dirname, './src/api/index'),
            '~src': path.join(__dirname, './src'),
            '~utils': path.join(__dirname, './src/utils'),
            '~components': path.join(__dirname, './src/components'),
            '~page': path.join(__dirname, './src/page'),
            '~static': path.join(__dirname, './static'),
            '~auth': path.join(__dirname, './src/page/userAuth'),

        }
    }
};
