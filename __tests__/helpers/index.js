import { jest } from '@jest/globals'
import { faker } from '@faker-js/faker'

const createApp = jest.fn(() => ({
  config: {
    globalProperties: {},
  },
  install: function (plugin, options = {}) {
    plugin.install(this, options)
  },
}))

faker.seed(17)

export { faker, createApp }
