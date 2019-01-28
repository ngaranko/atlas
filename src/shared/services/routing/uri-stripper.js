import sharedConfig from '../shared-config/shared-config';

/**
 * Strips a domain, as specified in `sharedConfig`, from the given
 * uri.
 *
 * The possible domains are specified in `sharedConfig` by key. This
 * key will be used as the return value for the domain being stripped.
 * All possible domain keys are white listed in
 * `sharedConfig.ROOT_KEYS`.
 *
 * @param {string} uri The uri to strip the domain from.
 * @return {string[]} Containing only the uri without the domain, or,
 * in case the uri has an unknown or no domain, the unmodified uri
 * only.
 *
 * This is an array for forwards compatibility to be able to
 * store the domain key in case multiple domains are configured. This
 * param should then containing one or two items. The config key of the
 * domain stripped and the uri without the domain. Or, in case the uri
 * has an unknown or no domain, the unmodified uri only.
 */
export function stripDomain(uri) {
  let result = [uri];

  const strippedApi = uri.replace(sharedConfig.API_ROOT, '');

  if (strippedApi !== uri) {
    result = [strippedApi];
  }

  return result;
}

/**
 * Restores a domain to a uri that has had its domain stripped from it.
 *
 * This is the reverse of the `stripDomain` function.
 *
 * The domain key specified will be checked for existance in the white
 * list `sharedConfig.ROOT_KEYS`.
 *
 * For backwards compatibility, in case no domain key is specified, the
 * uri will pre prepended with the ROOT_API domain.
 *
 * @param {string[]} Containing one or two items. The config key of
 * the domain and the uri without the domain. Or only a uri. This is
 * the value as returned by `stripDomain`.
 * @return {string} The uri with its domain attached to it.
 */
export function restoreDomain(parts) {
  let result;

  if (parts.length === 1) {
    // Restore the API_ROOT by default
    result = sharedConfig.API_ROOT + parts[0];
  } else {
    // Check root based on white listing for security reasons
    // eslint-disable-next-line no-lonely-if
    if (sharedConfig.ROOT_KEYS.indexOf(parts[0]) !== -1) {
      result = sharedConfig[parts[0]] + parts[1];
    } else {
      result = parts[1];
    }
  }

  return result;
}
