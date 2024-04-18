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
     * @returns {string} A greeting.
     */
    $getGreeting: () => string

    /**
     * A function used to greet the user using console.log.
     *
     * @param {string} greeting A string used to greet to the user.
     */
    $greet: (greeting: string) => void
  }
}
