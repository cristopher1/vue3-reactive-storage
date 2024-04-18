import { jest, beforeEach } from '@jest/globals'
import { faker, createApp } from './helpers'
import { createInstaller } from '../src/main.js'
import { Installer } from '../src/installer'

jest.spyOn(console, 'log').mockImplementation((msg) => msg)

const filePath = 'src/main.js'

describe(`export function createInstaller (${filePath})`, () => {
  it('Should create the installer object', () => {
    // Arrange
    const expected = Installer

    // Act
    const result = createInstaller()

    // Assert
    expect(result).toBeInstanceOf(expected)
  })
  describe('Installer object', () => {
    let app

    beforeEach(() => {
      app = createApp()
    })
    it('Should add the $getGreeting global property', () => {
      // Arrange
      const getGreeting = () => 'hello from test'
      app.install(createInstaller(), { getGreeting })

      const { $getGreeting } = app.config.globalProperties
      const expected = getGreeting()

      // Act
      const result = $getGreeting()

      // Assert
      expect(result).toBe(expected)
    })
    it('Should add the $greet global property', () => {
      // Arrange
      app.install(createInstaller())

      const { $greet } = app.config.globalProperties
      const expected = faker.string.sample()

      // Act
      const result = $greet(expected)

      // Assert
      expect(result).toBe(expected)
    })
  })
})
