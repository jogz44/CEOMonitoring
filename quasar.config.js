/* eslint-disable */
import { configure } from 'quasar/wrappers'

export default configure(() => {
  return {
    eslint: {
      warnings: true,
      errors: true
    },

    boot: [
      'axios'
    ],

    css: [
      'app.css'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },
      vueRouterMode: 'hash'
    },

    devServer: {
      open: true,
      host: '192.168.8.234',
      port: 9000,
      https: false,
    },

    framework: {
      config: {},
      plugins: ['Notify']
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render']
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'engineeringsystem'
      }
    },

    bex: {
      contentScripts: ['my-content-script']
    }
  }
})
