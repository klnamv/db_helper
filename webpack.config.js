const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ],
    devServer: {
        // existing configurations
        allowedHosts: ['localhost'],
        "proxy": "https://localhost:3000/"
      },
}