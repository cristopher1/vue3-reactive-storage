import { ReactiveStorageAdapter } from './ReactiveStorageAdapter.js'
import { ReactiveWebStorage } from './ReactiveWebStorage.js'

export class ReactiveWebStorageFactory {
  static createReactiveWebStorage(prefix, webStorage, reactiveStorage) {
    return new ReactiveWebStorage(
      prefix,
      webStorage,
      new ReactiveStorageAdapter(reactiveStorage),
    )
  }
}
