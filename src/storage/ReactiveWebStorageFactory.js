import { ReactiveStorage } from './ReactiveStorage.js'
import { ReactiveWebStorage } from './ReactiveWebStorage.js'

export class ReactiveWebStorageFactory {
  static createReactiveWebStorage(prefix, webStorage, reactiveStorage) {
    return new ReactiveWebStorage(
      prefix,
      webStorage,
      new ReactiveStorage(reactiveStorage),
    )
  }
}
