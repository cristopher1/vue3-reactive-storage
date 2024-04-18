/** @typedef {import('vue').App} App */

import { ReactiveWebStorageFactory } from '../storage/ReactiveWebStorageFactory.js'

export class ReactiveLocalStorageInstaller {
  #addReactiveWebStorageToApp(app, reactiveWebStorage) {
    app.config.globalProperties.$reactiveWebStorage = reactiveWebStorage
  }

  /**
   * Installs the plugin.
   *
   * @param {App<Element>} app Instance of the app created by createApp.
   * @param {object} options Plugin's configuration.
   * @param {string} [options.prefix] Defines the reactive storage used. When
   *   this parameter is false, it is used a reactive object to save the data;
   *   otherwise, it is used a ref object. By default is true.
   * @param {object} [options.webStorage] An object that implements the Storage
   *   interface, for example LocalStorage, SessionStorage, other.
   * @param {object} [options.reactiveStorage] An reactivity object, for example
   *   an ref or reactive object.
   */
  install(app, options) {
    const { prefix = '', webStorage, reactiveStorage } = options

    const reactiveWebStorage =
      ReactiveWebStorageFactory.createReactiveWebStorage(
        prefix,
        webStorage,
        reactiveStorage,
      )

    this.#addReactiveWebStorageToApp(app, reactiveWebStorage)
  }
}
