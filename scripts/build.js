const Path = require('path')
const ParcelDefaultBundler = require('parcel-bundler')
const openBrowser = require('parcel-bundler/src/utils/openInBrowser')
const fs = require('fs')
const outputRoot = Path.resolve(Path.join(__dirname, '../dist'))
const outputIndex = Path.resolve(Path.join(__dirname, '../dist/index.php'))
const swPrecache = require('sw-precache')
const defaultOptions = {
  name: 'build',
  cert: '',
  key: '',
  outDir: Path.join(outputRoot, 'static'),
  target: 'browser',
  port: 1234,
  open: false,
  cache: false,
  publicUrl: './static/'
}

async function bundle(main, options) {

  if (options.name === 'build') {
    options.production = true
    process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  } else {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  }

  if (options.cert && options.key) {
    options.https = {
      cert: options.cert,
      key: options.key
    }
  }

  const bundler = new ParcelDefaultBundler(main, options)
  bundler.on('bundled', (bundle) => {
    fs.rename(Path.join(outputRoot, './static/index.html'), outputIndex, (err) => {
       if (err) {
        throw err
       }
       console.log('move index.html success');
    })
    swPrecache.write(`${outputRoot}/service-worker.js`, {
      staticFileGlobs: [outputRoot + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
      stripPrefix: outputRoot
    });
  })

  options.target = options.target || 'browser'

  if (options.name === 'serve' && options.target === 'browser') {
    const server = await bundler.serve(options.port || 1234, options.https)
    if (server && options.open) {
      await openBrowser(`${options.https ? 'https' : 'http'}://localhost:${server.address().port}`, options.open)
    }
  } else {
    bundler.bundle()
  }
}

let options = Object.assign({}, defaultOptions)
let entryFile = Path.join(__dirname, './../src/index.html')

bundle(entryFile, options)
