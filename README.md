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

  ```js
  import { createReactiveLocalStorageInstaller } from '@cljimenez/vue-localstorage-reactive'

  import { createApp } from 'vue'

  import App from './App.vue'

  const app = createApp(App)

  app.use(createReactiveLocalStorageInstaller())
  ```

  **Note: Always you should create a new Installer using createReactiveLocalStorageInstaller when you use the app.use method**

- ### <a id="install-options"></a> Install options.

  When you installs this plugin using:

  ```js
  app.use(createReactiveLocalStorageInstaller(), options)
  ```

  The options object can contain the following attributes:

  - `useRefStorage`: (boolean). By default is true. When this value is true, the reactiveStorage object is created using `ref` function; otherwise is used the `reactive` function.
  - `serializer`: (object). By default is undefined. This object is used to serializes and unserializes data to save complex object into localStorage.

    The serializer object contains two methods:

    1.  `serialize(value: any, options?: object)`: Serializes the data.
    2.  `parse(value: string, options?: object)`: Unserializes the data.

    When the value of `serializer` is undefined, the default serializer used is:

    ```js
    {
      serialize: (value, options) => {
       const { replacer, space } = options
       return JSON.stringify(value, replacer, space)
      },
      parse: (value, options) => {
       const { reviver } = options
       return JSON.parse(value, reviver)
      },
    }
    ```

    You can define your own serializer wrapping an object or static methods that serializes and unserializes data using the structure:

    ```js
    {
      serialize: (value, options) => {
        // const {option1, option2, ... etc} = options
        // return objectThatSerializesData.methodThatSerializesData(value, option1, option2, ... etc)
      },
      parse: (value, options) => {
        // const {option1, option2, ... etc} = options
        // return objectThatUnserializesData.methodThatUnserializesData(value, option1, option2, ... etc)
      }
    }
    ```

    You can use serializers like JSON with replacer and reviver functions, [@cljimenez/json-serializer-core](https://www.npmjs.com/package/@cljimenez/json-serializer-core) with [@cljimenez/json-serializer-base-serializers](https://www.npmjs.com/package/@cljimenez/json-serializer-base-serializers), others.

- ### <a id="about-reactive-local-storage-methods"></a> About the ReactiveLocalStorage methods

  The `ReactiveLocalStorage` object provides an interface similar to the Storage interface, this methods are:

  - `(getter) length`: Obtains the number of elements saved in reactiveLocalStorage.
  - `(method) key(index)`: Returns the key in nth position into reactiveLocalStorage.
  - `(method) getItem(key, parseOptions = {})`: Returns the parsed key's value saved into reactiveLocalStorage.
  - `(method) setItem(key, item, serializeOptions = {})`: Saves the pair key/value into reactiveLocalStorage.
  - `(method) removeItem(key)`: Removes the pair key/value from reactiveLocalStorage.
  - `(method) clear()`: Removes all pairs key/value into reactiveLocalStorage.

  And include others methods:

  - `(getter) reactiveStorage`: Returns the reactiveStorage object used by reactiveLocalStorage instance.
  - `(method) setLoadDataFromLocalStorageParameters(parameters)`: Sets the parseOptions that will be used to serialize.parse method that will be called into loadDataFromLocalStorage method.
  - `(method) loadDataFromLocalStorage()`: This method must be used into listener object that listens an event. Sets the data from localStorage into reactiveLocalStorage when the listened event is fired.
    **When the @cljimenez/vue-localstorage-reactive is installed, it is added a loadDataFromLocalStorageListener that is used when the load event is fired by the window object to load the initial data from
    localStorage into reactiveStorage. The loadDataFromLocalStorageListener uses the loadDataFromLocalStorage method.**

    ```js
    return function loadDataFromLocalStorageListener() {
      reactiveLocalStorage.loadDataFromLocalStorage()
    }
    ```

- ### <a id="composition-api"></a> Use the composition API:

  You can use the provide / inject functions.

  ```js
  // main.js
  import { createReactiveLocalStorageInstaller } from '@cljimenez/vue-localstorage-reactive'

  import { createApp } from 'vue'

  import App from './App.vue'

  const app = createApp(App)

  app.use(createReactiveLocalStorageInstaller())

  app.provide(
    'reactiveLocalStorage',
    app.config.globalProperties.$reactiveLocalStorage,
  )
  ```

  ```vue
  // you can use the inject function to access to the reactiveLocalStorage
  object, for example in a MainNav.vue

  <script setup>
  import { inject, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import jwt_decode from 'jwt-decode'

  const urlApp = inject('urlApp')
  const apis = inject('apis')
  const reactiveLocalStorage = inject('reactiveLocalStorage')

  const home = {
    message: 'Inicio',
    url: { name: urlApp.home.name },
  }
  const signUp = {
    message: 'Registrarse',
    url: { name: urlApp.signUp.name, hash: urlApp.signUp.hash },
  }
  const contact = {
    message: 'Contacto',
    url: { name: urlApp.contact.name },
  }
  const characteristics = {
    message: 'Características',
    url: { name: urlApp.characteristics.name },
  }
  const logout = {
    message: 'Cerrar sesión',
    url: { name: urlApp.logout.name },
  }

  const thereIsUser = computed(() => {
    return reactiveLocalStorage.getItem(
      apis.extractorCaracteristicas.storage.accessTokenItem.name,
    )
  })

  const obtainInfoUser = computed(() => {
    const accessToken = reactiveLocalStorage.getItem(
      apis.extractorCaracteristicas.storage.accessTokenItem.name,
    )
    if (accessToken) {
      return jwt_decode(accessToken).user_id
    }
    return null
  })
  </script>

  <template>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container px-5">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li v-if="thereIsUser" class="nav-item">
              <span class="nav-link"
                >Registrado como: {{ obtainInfoUser }}</span
              >
            </li>
            <li v-if="thereIsUser" class="nav-item">
              <RouterLink class="nav-link" :to="characteristics.url">
                {{ characteristics.message }}
              </RouterLink>
            </li>
            <li v-if="!thereIsUser" class="nav-item">
              <RouterLink class="nav-link" :to="home.url">
                {{ home.message }}
              </RouterLink>
            </li>
            <li v-if="!thereIsUser" class="nav-item">
              <RouterLink class="nav-link" :to="signUp.url">
                {{ signUp.message }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :to="contact.url">
                {{ contact.message }}
              </RouterLink>
            </li>
            <li v-if="thereIsUser" class="nav-item">
              <RouterLink class="nav-link" :to="logout.url">
                {{ logout.message }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  ```

  ```js
  // also you can use the reactiveLocalStorage object with vue-router using the inject function.

  import { createRouter, createWebHistory } from 'vue-router'
  import { inject } from 'vue'
  import { urlApp } from '../urlApp'
  import { apis } from '../apis'
  import HomeView from '../views/HomeView.vue'

  const logout = (to, from, next) => {
    const reactiveLocalStorage = inject('reactiveLocalStorage')
    reactiveLocalStorage.removeItem(
      apis.extractorCaracteristicas.storage.accessTokenItem.name,
    )
    reactiveLocalStorage.removeItem(
      apis.extractorCaracteristicas.storage.refreshTokenItem.name,
    )
    next({ name: urlApp.home.name })
  }

  const isAuthenticated = (to, from, next) => {
    const reactiveLocalStorage = inject('reactiveLocalStorage')
    if (
      reactiveLocalStorage.getItem(
        apis.extractorCaracteristicas.storage.accessTokenItem.name,
      )
    ) {
      next()
    } else {
      next({ name: urlApp.home.name })
    }
  }

  const isNotAuthenticated = (to, from, next) => {
    const reactiveLocalStorage = inject('reactiveLocalStorage')
    if (
      !reactiveLocalStorage.getItem(
        apis.extractorCaracteristicas.storage.accessTokenItem.name,
      )
    ) {
      next()
    } else {
      next({ name: urlApp.principal.name })
    }
  }

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: urlApp.home.path,
        name: urlApp.home.name,
        beforeEnter: [isNotAuthenticated],
        component: HomeView,
      },
      {
        path: urlApp.contact.path,
        name: urlApp.contact.name,
        component: () => import('../views/ContactoView.vue'),
      },
      {
        path: urlApp.information.path,
        name: urlApp.information.name,
        beforeEnter: [isNotAuthenticated],
        component: () => import('../views/DescripcionView.vue'),
      },
      {
        path: urlApp.login.path,
        name: urlApp.login.name,
        beforeEnter: [isNotAuthenticated],
        component: () => import('../views/LoginView.vue'),
      },
      {
        path: urlApp.principal.path,
        name: urlApp.principal.name,
        beforeEnter: [isAuthenticated],
        component: () => import('../views/PrincipalView.vue'),
      },
      {
        path: urlApp.logout.path,
        name: urlApp.logout.name,
        beforeEnter: [isAuthenticated, logout],
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      } else if (savedPosition) {
        return savedPosition
      } else {
        return { left: 0, top: 0 }
      }
    },
  })

  export default router
  ```

## Author

👤 **Cristopher Jiménez Meza**

- Github: [@cristopher1](https://github.com/cristopher1)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/cristopher1/vue3-reactive-storage/issues). You can also take a look at the [contributing guide](https://github.com/cristopher1/vue3-reactive-storage/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024 [Cristopher Jiménez Meza](https://github.com/cristopher1).<br />
This project is [MIT](https://github.com/cristopher1/vue3-reactive-storage/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
