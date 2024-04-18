import { Installer } from './installer'
import { getGreeting, greet } from './greeting'

/**
 * Creates an installer used to install this plugin.
 *
 * @returns {object} The installer object that will install this plugin.
 */
export function createInstaller() {
  return new Installer(getGreeting, greet)
}
