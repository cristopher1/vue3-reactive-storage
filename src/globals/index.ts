import { ReactiveWebStorage } from '../storage/ReactiveWebStorage.js'

declare module '@vue/runtime-core' {
  /**
   * When the user installs this plugin and he calls
   * app.config.globalProperties, it will appear this information.
   */
  interface ComponentCustomProperties {
    $reactiveWebStorage: ReactiveWebStorage
  }
}

export {}
