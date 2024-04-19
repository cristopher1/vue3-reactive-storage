import { ReactiveWebStorageInstaller } from './installer'

/**
 * Creates an installer used to install this plugin.
 *
 * @returns {ReactiveWebStorageInstaller} The installer object that will install
 *   this plugin.
 */
export function createInstaller() {
  return new ReactiveWebStorageInstaller()
}
