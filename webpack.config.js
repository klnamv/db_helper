const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ],
    devServer: {
        allowedHosts: ['localhost'],
        "proxy": "https://localhost:3000/"
      },
}