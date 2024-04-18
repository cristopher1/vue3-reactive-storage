import { ReactiveWebStorage } from '../storage/ReactiveWebStorage.js'

export {}

declare module '@vue/runtime-core' {
  /**
   * When the user installs this plugin and he calls
   * app.config.globalProperties, it will appear this information.
   */
  export interface ComponentCustomProperties {
    /**
     * A function used to obtain a greeting.
     *
     * @returns {ReactiveWebStorage} A greeting.
     */
    $reactiveWebStorage: () => ReactiveWebStorage
  }
}
