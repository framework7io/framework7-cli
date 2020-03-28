const indent = require('../utils/indent');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const {
    framework,
    type,
    cordova,
    webpack,
  } = options;
  // eslint-disable-next-line
  const hasCordova = type.indexOf('cordova') >= 0;

  let resolveExtensions = "['.js', '.json']";
  if (framework === 'vue') {
    resolveExtensions = "['.js', '.vue', '.json']";
  }
  if (framework === 'react') {
    resolveExtensions = "['.js', '.jsx', '.json']";
  }
  if (framework === 'svelte') {
    resolveExtensions = "['.mjs', '.js', '.svelte', '.json']";
  }

  let cordovaOutput;
  if (hasCordova) {
    cordovaOutput = `isCordova ? '${cordova.folder}/www' : 'www'`;
  }
  if (hasCordova && cordova.platforms.indexOf('electron') >= 0) {
    cordovaOutput = `isCordova ? (isElectronWatch ? '${cordova.folder}/platforms/electron/www' : '${cordova.folder}/www') : 'www'`;
  }

  const productionDevtool = webpack.productionSourceMap ? '\'source-map\'' : false;
  const developmentDevtool = webpack.developmentSourceMap ? '\'eval\'' : false;
  const hashName = webpack.hashAssets ? '.[hash:6]' : '';
  const assetsLoader = webpack.inlineAssets ? 'url-loader' : 'file-loader';
  const preserveAssetsPaths = webpack.preserveAssetsPaths; // eslint-disable-line

  return indent(0, `
    const webpack = require('webpack');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ${templateIf(framework === 'vue', () => `
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    `)}
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
    const TerserPlugin = require('terser-webpack-plugin');
    ${templateIf(type.indexOf('pwa') >= 0, () => `
    const WorkboxPlugin = require('workbox-webpack-plugin');
    `)}

    const path = require('path');

    function resolvePath(dir) {
      return path.join(__dirname, '..', dir);
    }

    const env = process.env.NODE_ENV || 'development';
    const target = process.env.TARGET || 'web';
    ${templateIf(hasCordova, () => `
    const isCordova = target === 'cordova';
    `)}
    ${templateIf(hasCordova && cordova.platforms.indexOf('electron') >= 0, () => `
    const isElectronWatch = process.env.ELECTRON_WATCH || false;
    `)}

    module.exports = {
      mode: env,
      entry: {
        app: './src/js/app.js',
      },
      output: {
        ${templateIf(hasCordova, () => `
        path: resolvePath(${cordovaOutput}),
        `, () => `
        path: resolvePath('www'),
        `)}
        filename: 'js/[name]${hashName}.js',
        chunkFilename: 'js/[name]${hashName}.js',
        publicPath: '',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
      },
      resolve: {
        extensions: ${resolveExtensions},
        alias: {
          ${templateIf(framework === 'vue', () => `
          vue$: 'vue/dist/vue.esm.js',
          `)}
          '@': resolvePath('src'),
        },
        ${templateIf(framework === 'svelte', () => `
        mainFields: ['svelte', 'browser', 'module', 'main']
        `)}
      },
      node: {
        fs: 'empty'
      },
      devtool: env === 'production' ? ${productionDevtool} : ${developmentDevtool},
      devServer: {
        hot: true,
        open: true,
        compress: true,
        contentBase: '/www/',
        disableHostCheck: true,
        historyApiFallback: true,
        watchOptions: {
          poll: 1000,
        },
      },
      optimization: {
        minimizer: [new TerserPlugin({
          sourceMap: true,
        })],
      },
      module: {
        rules: [
          {
            test: /\\.(mjs|js|jsx)$/,
            use: 'babel-loader',
            include: [
              resolvePath('src'),
              resolvePath('node_modules/framework7'),
              ${templateIf(framework === 'vue', () => `
              resolvePath('node_modules/framework7-vue'),
              `)}
              ${templateIf(framework === 'react', () => `
              resolvePath('node_modules/framework7-react'),
              `)}
              ${templateIf(framework === 'svelte', () => `
              resolvePath('node_modules/framework7-svelte'),
              resolvePath('node_modules/svelte'),
              `)}
              resolvePath('node_modules/template7'),
              resolvePath('node_modules/dom7'),
              resolvePath('node_modules/ssr-window'),
            ],
          },
          ${templateIf(framework === 'core', () => `
          {
            test: /\\.f7.html$/,
            use: [
              'babel-loader',
              {
                loader: 'framework7-component-loader',
                options: {
                  helpersPath: './src/template7-helpers-list.js',
                },
              },
            ],
          },
          `)}
          ${templateIf(framework === 'svelte', () => `
          {
            test: /\\.svelte$/,
            use: {
              loader: 'svelte-loader',
              options: {
                emitCss: true,
              },
            },
          },
          `)}
          ${templateIf(framework === 'vue', () => `
          {
            test: /\\.vue$/,
            use: 'vue-loader',
          },
          `)}
          {
            test: /\\.css$/,
            use: [
              (env === 'development' ? 'style-loader' : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }),
              'css-loader',
              'postcss-loader',
            ],
          },
          {
            test: /\\.styl(us)?$/,
            use: [
              (env === 'development' ? 'style-loader' : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }),
              'css-loader',
              'postcss-loader',
              'stylus-loader',
            ],
          },
          {
            test: /\\.less$/,
            use: [
              (env === 'development' ? 'style-loader' : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }),
              'css-loader',
              'postcss-loader',
              'less-loader',
            ],
          },
          {
            test: /\\.(sa|sc)ss$/,
            use: [
              (env === 'development' ? 'style-loader' : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }),
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\\.(png|jpe?g|gif|svg)(\\?.*)?$/,
            loader: '${assetsLoader}',
            options: {
              limit: 10000,
              name: '${preserveAssetsPaths ? '[path]' : 'images/'}[name]${hashName}.[ext]',
              ${templateIf(preserveAssetsPaths, () => `
              context: path.resolve(__dirname, '../src'),
              `)}
            },
          },
          {
            test: /\\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\\?.*)?$/,
            loader: '${assetsLoader}',
            options: {
              limit: 10000,
              name: '${preserveAssetsPaths ? '[path]' : 'media/'}[name]${hashName}.[ext]',
              ${templateIf(preserveAssetsPaths, () => `
              context: path.resolve(__dirname, '../src'),
              `)}
            },
          },
          {
            test: /\\.(woff2?|eot|ttf|otf)(\\?.*)?$/,
            loader: '${assetsLoader}',
            options: {
              limit: 10000,
              name: '${preserveAssetsPaths ? '[path]' : 'fonts/'}[name]${hashName}.[ext]',
              ${templateIf(preserveAssetsPaths, () => `
              context: path.resolve(__dirname, '../src'),
              `)}
            },
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(env),
          'process.env.TARGET': JSON.stringify(target),
        }),
        ${templateIf(framework === 'vue', () => `
        new VueLoaderPlugin(),
        `)}
        ...(env === 'production' ? [
          new OptimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true,
              map: { inline: false },
            },
          }),
          new webpack.optimize.ModuleConcatenationPlugin(),
        ] : [
          // Development only plugins
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
        ]),
        new HtmlWebpackPlugin({
          filename: './index.html',
          template: './src/index.html',
          inject: true,
          minify: env === 'production' ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: ${framework === 'core' ? 'false' : 'true'},
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          } : false,
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name]${hashName}.css',
        }),
        new CopyWebpackPlugin([
          {
            from: resolvePath('src/static'),
            ${templateIf(hasCordova, () => `
            to: resolvePath(isCordova ? '${cordova.folder}/www/static' : 'www/static'),
            `, () => `
            to: resolvePath('www/static'),
            `)}
          },
          ${templateIf(type.indexOf('pwa') >= 0, () => `
          {
            from: resolvePath('src/manifest.json'),
            to: resolvePath('www/manifest.json'),
          },
          `)}
        ]),
        ${templateIf(type.indexOf('pwa') >= 0 && hasCordova, () => `
        ...(!isCordova ? [
          new WorkboxPlugin.InjectManifest({
            swSrc: resolvePath('src/service-worker.js'),
          })
        ] : []),
        `, () => `
        `)}
        ${templateIf(type.indexOf('pwa') >= 0 && !hasCordova, () => `
        new WorkboxPlugin.InjectManifest({
          swSrc: resolvePath('src/service-worker.js'),
        }),
        `)}
      ],
    };
  `).trim();
};
