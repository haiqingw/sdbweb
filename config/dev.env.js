'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
//   BASE_API: '"http://ttsplus.xylrcs.cn"'
  // BASE_API: '"http://192.168.31.243:8081/index.php/App/Getway/route"',
})
