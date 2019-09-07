const path = require('path');
const express = require('express');

module.exports = {
    entry: {
        src: './src/index.js' 
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env', '@babel/react']
            }
          },
          {
            test: /\.s?css/,
            use: [
              'style-loader', 'css-loader', 'sass-loader'
            ]
          }
        ]
      },
    devServer: {
        publicPath: '/build',
        proxy: {
            '/api': 'http://localhost:3000'
        }
      },
    
}




