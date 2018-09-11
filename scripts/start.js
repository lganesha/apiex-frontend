const Path = require('path')
const ParcelDefaultBundler = require('parcel-bundler')
const openBrowser = require('parcel-bundler/src/utils/openInBrowser')
const defaultOptions = {
  name: 'serve',
  cert: '',
  key: '',
  target: 'browser',
  port: 4444,
  open: true,
  cache: false
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
