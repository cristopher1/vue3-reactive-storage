<h1 align="center">Welcome to vue3-reactive-storage 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/cristopher1/vue3-reactive-storage#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/cristopher1/vue3-reactive-storage/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/cristopher1/vue3-reactive-storage/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/cristopher1/vue3-reactive-storage" />
  </a>
</p>

> Vue3 plugin to use reactivity with object that implements the Storage interface

### 🏠 [Homepage](https://github.com/cristopher1/vue3-reactive-storage)

A Vue3 plugin to use reactivity with object that implements the Storage interface, for example: localStorage, sessionStorage or customer object. Working with one or various app instances. Based on [@cljimenez/vue-localstorage-reactive](https://www.npmjs.com/package/@cljimenez/vue-localstorage-reactive). Include the class ReactiveWebStorageError used by ReactiveWebStorage to throw Errors.

### [Index](#index)

- [Install](#install)
- [How to use?](#how-to-use?)
  - [Install the plugin](#install)
  - [Install options](#install-options)
  - [About the ReactiveLocalStorage methods](#about-reactive-local-storage-methods)
  - [Use the composition API](#composition-api)
- [Author](#author)
- [Contributing](#contributing)
- [License](#license)

## <a id="install"></a> Install

```sh
npm install vue3-reactive-storage
```

## <a id="how-to-use?"></a> How to use?

- ### <a id="install"></a> Install the plugin.

  **Using an app instance**

  ```js
  import { createApp, reactive, ref } from 'vue'
  import createReactiveWebStorageInstaller from 'vue3-reactive-storage'

  import { createApp } from 'vue'

  import App from './App.vue'

  const app = createApp(App)

  app.use(createReactiveWebStorageInstaller(), {
    webStorage: localStorage,
    reactiveStorage: ref({}),
  })

  const appReactiveStorage = app.config.globalProperties.$reactiveWebStorage

  app.provide('storage', appReactiveStorage)

  app.mount('#app')
  ```

  **Using various app instances**

  ```js
  import { createApp, reactive, ref } from 'vue'
  import createReactiveWebStorageInstaller from 'vue3-reactive-storage'
  import App from './App.vue'
  import SubApp from './SubApp.vue'
  import OtherSubApp from './OtherSubApp.vue'

  const app = createApp(App)
  const subApp = createApp(SubApp)
  const otherSubApp = createApp(OtherSubApp)

  app.use(createReactiveWebStorageInstaller(), {
    webStorage: localStorage,
    reactiveStorage: ref({}),
  })

  subApp.use(createReactiveWebStorageInstaller(), {
    prefix: 'new_prefix',
    webStorage: sessionStorage,
    reactiveStorage: ref({}),
  })

  otherSubApp.use(createReactiveWebStorageInstaller(), {
    prefix: 'some_prefix',
    webStorage: localStorage,
    reactiveStorage: reactive({}),
  })

  const appReactiveStorage = app.config.globalProperties.$reactiveWebStorage
  const subAppReactiveStorage =
    subApp.config.globalProperties.$reactiveWebStorage
  const otherSubAppReactiveStorage =
    otherSubApp.config.globalProperties.$reactiveWebStorage

  app.provide('storage', appReactiveStorage)
  subApp.provide('storage', subAppReactiveStorage)
  otherSubApp.provide('storage', otherSubAppReactiveStorage)

  app.mount('#app')
  subApp.mount('#subapp')
  otherSubApp.mount('#othersubapp')
  ```

- ### <a id="install-options"></a> Install options.

  When you installs this plugin using you can use options:

  ```js
  app.use(createReactiveWebStorageInstaller(), options)
  ```

  The options object can contain the following attributes:

  - webStorage: Required value. localStorage, sessionStorage or other object that implements the Storage interface.
  - reactiveStorage: Required value. ref or reactive object.
  - prefix: Optional value. Used to segment the Storage object, the prefix is added to key (using '-') in Storage object. For example:

    ```js
    import { createApp, reactive, ref } from 'vue'
    import createReactiveWebStorageInstaller from 'vue3-reactive-storage'

    import { createApp } from 'vue'

    import App from './App.vue'

    const app = createApp(App)

    app.use(createReactiveWebStorageInstaller(), {
      prefix: 'hello_world'
      webStorage: localStorage,
      reactiveStorage: ref({}),
    })

    const appReactiveStorage = app.config.globalProperties.$reactiveWebStorage

    // Adds in Storage object
    // key: hello_world-my_key
    // value: data
    // Adds in reactive object
    // key: my_key
    // value: data
    appReactiveStorage.setItem('my_key', 'data')

    app.provide('storage', appReactiveStorage)

    app.mount('#app')
    ```

    by default, prefix is ''.

  - loadDataFromWebStorage: Optional value. By default is true. Loads the keys/values in Storage object to reactive object when the load event is fired by window object. Useful when closing and opening the
    browser window.

- ### <a id="about-reactive-local-storage-methods"></a> About the ReactiveLocalStorage methods

  The `ReactiveLocalStorage` object provides an interface similar to the Storage interface, this methods are:

  - `(getter) length`: Obtains the number of elements saved in reactiveLocalStorage.
  - `(method) key(index)`: Returns the key in nth position into reactiveLocalStorage.
  - `(method) getItem(key, parseOptions = {})`: Returns the parsed key's value saved into reactiveLocalStorage.
  - `(method) setItem(key, item, serializeOptions = {})`: Saves the pair key/value into reactiveLocalStorage.
  - `(method) removeItem(key)`: Removes the pair key/value from reactiveLocalStorage.
  - `(method) clear()`: Removes all pairs key/value into reactiveLocalStorage.

  And include others methods:

  - `(getter) reactiveStorageAdapter`: Returns the reactiveStorageAdapter (object that wraps the reactiveStorage using an insterface similar to Storage) object used by reactiveLocalStorage instance.
  - `(getter) reactiveStorage`: Returns the reactiveStorage object used by reactiveWebStorage instance.

- ### <a id="composition-api"></a> Use the composition API:

  You can use the provide / inject functions.

  ```js
  import { createApp, reactive, ref } from 'vue'
  import createReactiveWebStorageInstaller from 'vue3-reactive-storage'

  import { createApp } from 'vue'

  import App from './App.vue'

  const app = createApp(App)

  app.use(createReactiveWebStorageInstaller(), {
    webStorage: localStorage,
    reactiveStorage: ref({}),
  })

  const appReactiveStorage = app.config.globalProperties.$reactiveWebStorage

  app.provide('storage', appReactiveStorage)

  app.mount('#app')
  ```

  ```vue
  // you can use the inject function to access to the reactiveWebStorage.
  <template>
    <h2>{{ getUsername }}</h2>
    <button @click="storage.setItem('username', 'an username')">
      Add username
    </button>
    <button @click="storage.removeItem('username')">Delete username</button>
  </template>

  <script setup>
  import { inject, computed } from 'vue'

  const storage = inject('storage')

  const getUsername = computed(() => {
    return storage.getItem('username')
  })
  </script>
  ```

## <a id="author"></a> Author

👤 **Cristopher Jiménez Meza**

- Github: [@cristopher1](https://github.com/cristopher1)

## <a id="contributing"></a> 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/cristopher1/vue3-reactive-storage/issues). You can also take a look at the [contributing guide](https://github.com/cristopher1/vue3-reactive-storage/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## <a id="license"></a> 📝 License

Copyright © 2024 [Cristopher Jiménez Meza](https://github.com/cristopher1).<br />
This project is [MIT](https://github.com/cristopher1/vue3-reactive-storage/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
