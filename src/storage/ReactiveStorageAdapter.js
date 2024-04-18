import { ReactiveStorageError } from './Error.js'
import { isReactive, isRef } from 'vue'

export class ReactiveStorageAdapter {
  #reactiveStorage

  constructor(reactiveStorage) {
    if (
      !reactiveStorage ||
      (!isReactive(reactiveStorage) && !isRef(reactiveStorage))
    ) {
      throw new ReactiveStorageError(
        '"reactiveStorage" object must be a reactive or ref object',
      )
    }
    this.#reactiveStorage = reactiveStorage
  }

  get reactiveStorage() {
    return this.#reactiveStorage
  }

  #obtainReactiveStorageValue() {
    const reactiveStorage = this.#reactiveStorage
    return isRef(reactiveStorage) ? reactiveStorage.value : reactiveStorage
  }

  /**
   * Obtains the number of elements saved in reactiveStorage.
   *
   * @returns {number} Number of elements saved in reactiveStorage.
   * @readonly
   */
  get length() {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return Object.keys(reactiveStorage).length
  }

  /**
   * Returns the key in nth position into reactiveStorage.
   *
   * @param {number} index The index of a key in the reactiveStorage.
   * @returns {string} The key in nth position.
   */
  key(index) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return Object.keys(reactiveStorage)[index] ?? null
  }

  /**
   * Saves the pair key/value into reactiveStorage.
   *
   * @param {string} key A key saved into reactiveStorage.
   * @param {string} item The key's value to save.
   */
  setItem(key, item) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    reactiveStorage[key] = item
  }

  /**
   * Returns the parsed key's value saved into reactiveStorage.
   *
   * @param {string} key A key saved into reactiveStorage.
   * @returns {string | null} The key's value.
   */
  getItem(key) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return reactiveStorage[key] ?? null
  }

  /**
   * Removes the pair key/value from reactiveStorage.
   *
   * @param {string} key The key to remove from reactiveStorage.
   */
  removeItem(key) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    if (Object.hasOwn(reactiveStorage, key)) {
      delete reactiveStorage[key]
    }
  }

  /** Removes all pairs key/value into reactiveStorage. */
  clear() {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    for (const key in reactiveStorage) {
      this.removeItem(key)
    }
  }
}
