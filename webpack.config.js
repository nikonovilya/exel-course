const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const LANGUAGES = require('./src/assets/locales/variables/languages.json');
const pageLocales = ['default', ...LANGUAGES.map(({ code }) => code)];

const pages = [
  { filename: 'index', chunks: ['index'] },
];

const generatePages = (pages) => {
  return pageLocales.flatMap((locale) =>
    pages.map(({ filename, chunks }) => {
      const localePrefix = locale === 'default' ? '' : `${locale}/`;
      return new HtmlWebpackPlugin({
        template: path.resolve(
          __dirname,
          `src/pug/pages/${filename}.pug?lang=${locale}`
        ),
        filename: `${localePrefix}${filename}.html`,
        chunks,
        inject: 'body',
      });
    })
  );
};

const generateScripts = (pages) => {
  return pages.reduce((entry, page) => {
    page.chunks.forEach((chunk) => {
      entry[chunk] = path.resolve(__dirname, 'src/scripts', `${chunk}.js`);
    });
    return entry;
  }, {});
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-only',
    entry: generateScripts(pages),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'scripts/[name].[contenthash:8].js',
      clean: true,
    },
    resolve: {
      alias: {
        Blocks: path.resolve(__dirname, 'src/pug/blocks/'),
        Pages: path.resolve(__dirname, 'src/pug/pages/'),
        Fonts: path.resolve(__dirname, 'src/assets/fonts/'),
        Images: path.resolve(__dirname, 'src/assets/img/'),
        Locales: path.resolve(__dirname, 'src/assets/locales/'),
        Pug: path.resolve(__dirname, 'src/pug/'),
        Styles: path.resolve(__dirname, 'src/scss/'),
        Scripts: path.resolve(__dirname, 'src/scripts/'),
      },
    },
    plugins: [
      ...generatePages(pages),
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => {
          if (chunk.name === '404') {
            return 'assets/css/404.css';
          }
          return 'assets/css/[name].[contenthash:8].css';
        },
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'src/root'),
      //       to: path.resolve(__dirname, 'build/'),
      //     },
      //   ],
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: '@webdiscus/pug-loader',
        },
        {
          test: /\.(s?css|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            isProd && {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
            'sass-loader',
          ].filter(Boolean),
        },
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015',
          },
        },
        {
          test: /\.(png|svg|jpe?g|webp|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]',
          },
        },
        isProd
          ? {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: ImageMinimizerPlugin.loader,
              enforce: 'pre',
              options: {
                generator: [
                  {
                    preset: 'avif',
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                      plugins: ['imagemin-avif'],
                    },
                  },
                ],
              },
            }
          : {},
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext][query]',
          },
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
          css: true,
        }),
        isProd
          ? new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.sharpMinify,
              },
              generator: [
                {
                  preset: 'avif',
                  implementation: ImageMinimizerPlugin.sharpGenerate,
                  options: {
                    encodeOptions: {
                      avif: {
                        cqLevel: 33,
                      },
                    },
                  },
                },
              ],
            })
          : '...',
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
      },
      hot: true,
      compress: true,
      open: true,
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
      port: 4200,
      client: {
        overlay: false,
      },
    },
  };
};
