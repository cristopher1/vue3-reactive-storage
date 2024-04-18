import { ReactiveLocalStorageInstaller } from './installer'

/**
 * Creates an installer used to install this plugin.
 *
 * @returns {object} The installer object that will install this plugin.
 */
export function createInstaller() {
  return new ReactiveLocalStorageInstaller()
}
