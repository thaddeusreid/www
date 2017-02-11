axis            = require 'axis'
rupture         = require 'rupture'
autoprefixer    = require 'autoprefixer-stylus'
js_pipeline     = require 'js-pipeline'
css_pipeline    = require 'css-pipeline'
dynamic_content = require 'dynamic-content'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf', 'sftp-config.json', '**/*.map', '.editorconfig', 'bin']

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    dynamic_content()
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: false

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true

  server:
    clean_urls: true
