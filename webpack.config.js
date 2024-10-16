// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js', // 프로젝트의 진입점
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들된 파일의 출력 경로
    filename: 'bundle.js', // 번들된 파일의 이름
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel을 사용하여 JSX와 ES6+를 변환
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // .js와 .jsx 파일을 인식
  },
};
