import { ReactiveStorageError } from './Error.js'

export class ReactiveWebStorage {
  #prefix
  #webStorage
  #reactiveStorageAdapter

  constructor(prefix, webStorage, reactiveStorageAdapter) {
    if (!webStorage || !(webStorage instanceof Storage)) {
      throw new ReactiveStorageError(
        'The "webStorage" object must implement the Storage interface',
      )
    }
    this.#prefix = prefix
    this.#webStorage = webStorage
    this.#reactiveStorageAdapter = reactiveStorageAdapter
  }

  /**
   * Key used in webStorage
   *
   * @param {string} key The key used by reactiveWebStorage
   * @returns {string} The key used by webStorage
   */
  obtainWebStorageKey(key) {
    return this.#prefix !== '' ? `${this.#prefix}-${key}` : key
  }

  #isWebStorageKey(key) {
    const keyElements = key.split('-')
    const prefix = keyElements[0]
    return prefix === this.#prefix
  }

  /**
   * Key used in reactiveWebStorage
   *
   * @param {string} key The key used by reactiveWebStorage
   * @returns {string} The key used by reactiveStorageAdapter
   */
  obtainReactiveStorageAdapterKey(key) {
    const keyElements = key.split('-')
    return keyElements[keyElements - 1]
  }

  get prefix() {
    return this.#prefix
  }

  /**
   * Obtains the number of elements saved in reactiveWebStorage.
   *
   * @returns {number} Number of elements saved in reactiveWebStorage.
   * @readonly
   */
  get length() {
    return this.#reactiveStorageAdapter.length
  }

  /**
   * Returns the key in nth position into reactiveWebStorage.
   *
   * @param {number} index The index of a key in the reactiveWebStorage.
   * @returns {string} The key in nth position.
   */
  key(index) {
    return this.#reactiveStorageAdapter.key(index)
  }

  /**
   * Returns the parsed key's value saved into reactiveWebStorage.
   *
   * @param {string} key A key saved into reactiveWebStorage.
   * @returns {string | null} The key's value.
   */
  getItem(key) {
    let value = this.#reactiveStorageAdapter.getItem(key)
    if (!value) {
      const webStorageKey = this.obtainWebStorageKey(key)
      value = this.#webStorage.getItem(webStorageKey)
      if (value) {
        this.#reactiveStorageAdapter.setItem(key, value)
      }
    }
    return value
  }

  /**
   * Saves the pair key/value into reactiveWebStorage.
   *
   * @param {string} key A key saved into reactiveWebStorage.
   * @param {string} item The key's value to save.
   */
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
   * Removes the pair key/value from reactiveWebStorage.
   *
   * @param {string} key The key to remove from reactiveWebStorage.
   */
  removeItem(key) {
    const webStorageKey = this.obtainWebStorageKey(key)
    this.#webStorage.removeItem(webStorageKey)
    this.#reactiveStorageAdapter.removeItem(key)
  }

  /** Removes all pairs key/value into reactiveWebStorage. */
  clear() {
    const length = this.#reactiveStorageAdapter.length()
    for (let i = 0; i < length; i++) {
      const key = this.#reactiveStorageAdapter.key(i)
      const webStorageKey = this.obtainWebStorageKey(key)
      this.#webStorage.removeItem(webStorageKey)
    }
    this.#reactiveStorageAdapter.clear()
  }

  /**
   * This method must be used into listener object that listens an event. Sets
   * the data from localStorage into reactiveLocalStorage when the listened
   * event is fired.
   */
  loadDataFromWebStorage() {
    const length = this.#webStorage.length
    for (let index = 0; index < length; ++index) {
      const webStorageKey = this.#webStorage.key(index)
      if (this.#isWebStorageKey(webStorageKey)) {
        const value = this.#webStorage.getItem(webStorageKey)
        const reactiveStorageAdapterKey =
          this.obtainReactiveStorageAdapterKey(webStorageKey)
        this.#reactiveStorageAdapter.setItem(reactiveStorageAdapterKey, value)
      }
    }
  }
}
