module.exports = {

  // Currently we need to add '.ts' to resolve.extensions array.
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'inline-source-map',

  entry: './src/main.ts',
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },

  // Add loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?noImplicitAny=true&suppressImplicitAnyIndexErrors=true'
      }
    ]
  }
};