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

  #obtainReactiveStorageValue() {
    const reactiveStorage = this.#reactiveStorage
    return isRef(reactiveStorage) ? reactiveStorage.value : reactiveStorage
  }

  /**
   * Obtains the number of elements saved.
   *
   * @returns {number} Number of elements saved.
   * @readonly
   */
  get length() {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return Object.keys(reactiveStorage).length
  }

  key(index) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return Object.keys(reactiveStorage)[index] ?? null
  }

  setItem(key, item) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    reactiveStorage[key] = item
  }

  getItem(key) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    return reactiveStorage[key] ?? null
  }

  removeItem(key) {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    if (Object.hasOwn(reactiveStorage, key)) {
      delete reactiveStorage[key]
    }
  }

  /** Removes all pairs key/value. */
  clear() {
    const reactiveStorage = this.#obtainReactiveStorageValue()
    for (const key in reactiveStorage) {
      this.removeItem(key)
    }
  }
}
