import { ReactiveStorageError } from './Error.js'

export class ReactiveWebStorage {
  #prefix
  #webStorage
  #reactiveStorageAdapter

  constructor(prefix, webStorage, reactiveStorageAdapter) {
    this.#prefix = prefix
    this.#webStorage = webStorage
    this.#reactiveStorageAdapter = reactiveStorageAdapter
  }

  obtainWebStorageKey(key) {
    return this.#prefix !== '' ? `${this.#prefix}-${key}` : key
  }

  get prefix() {
    return this.#prefix
  }

  /**
   * Obtains the number of elements saved in reactiveLocalStorage.
   *
   * @returns {number} Number of elements saved in reactiveLocalStorage.
   * @override
   * @readonly
   */
  get length() {
    return super.length
  }

  /**
   * Returns the key in nth position into reactiveLocalStorage.
   *
   * @param {number} index The index of a key in the reactiveLocalStorage.
   * @returns {string} The key in nth position.
   * @override
   */
  key(index) {
    return super.key(index)
  }

  getItem(key) {
    let value = this.#reactiveStorageAdapter.getItem(key)
    if (!value) {
      const webStorageKey = this.obtainWebStorageKey(key)
      value = this.#webStorage.getItem(webStorageKey)
      if (value) {
        super.setItem(key, value)
      }
    }
    return value
  }

  setItem(key, item) {
    try {
      const webStorageKey = this.obtainWebStorageKey(key)
      this.#webStorage.setItem(webStorageKey, item)
      this.#reactiveStorageAdapter.setItem(key, item)
    } catch (err) {
      throw new ReactiveStorageError(err.message, { cause: err })
    }
  }

  /**
   * Removes the pair key/value from reactiveLocalStorage.
   *
   * @param {string} key The key to remove from reactiveLocalStorage.
   * @override
   */
  removeItem(key) {
    const webStorageKey = this.obtainWebStorageKey(key)
    this.#webStorage.removeItem(webStorageKey)
    this.#reactiveStorageAdapter.removeItem(key)
  }

  /**
   * Removes all pairs key/value into reactiveLocalStorage.
   *
   * @override
   */
  clear() {
    const length = this.#reactiveStorageAdapter.length()
    for (let i = 0; i < length; i++) {
      const key = this.#reactiveStorageAdapter.key(i)
      const webStorageKey = this.obtainWebStorageKey(key)
      this.#webStorage.removeItem(webStorageKey)
    }
    this.#reactiveStorageAdapter.clear()
  }

  executeFunction(func) {
    func(this.#webStorage, this.#reactiveStorageAdapter)
  }
}
