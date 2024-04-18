/** @typedef {import('vue').App} App */

import { ReactiveWebStorageFactory } from '../storage/ReactiveWebStorageFactory.js'

export class ReactiveLocalStorageInstaller {
  #addLoadDataFromWebStorage(window, reactiveWebStorage) {
    window.addEventListener('load', () => {
      reactiveWebStorage.loadDataFromWebStorage()
    })
  }

  #addReactiveWebStorageToApp(app, reactiveWebStorage) {
    app.config.globalProperties.$reactiveWebStorage = reactiveWebStorage
  }

  /**
   * Installs the plugin.
   *
   * @param {App<Element>} app Instance of the app created by createApp.
   * @param {object} options Plugin's configuration.
   * @param {string} [options.prefix] String used to create the key in
   *   LocalStorage, SessionStorage or others objects.
   * @param {object} [options.webStorage] An object that implements the Storage
   *   interface, for example LocalStorage, SessionStorage, other.
   * @param {object} [options.reactiveStorage] An reactivity object, for example
   *   an ref or reactive object.
   */
  install(app, options) {
    const {
      prefix = '',
      webStorage,
      reactiveStorage,
      loadDataFromWebStorage = true,
    } = options

    const reactiveWebStorage =
      ReactiveWebStorageFactory.createReactiveWebStorage(
        prefix,
        webStorage,
        reactiveStorage,
      )

    if (loadDataFromWebStorage) {
      this.#addLoadDataFromWebStorage(window, reactiveWebStorage)
    }

    this.#addReactiveWebStorageToApp(app, reactiveWebStorage)
  }
}
