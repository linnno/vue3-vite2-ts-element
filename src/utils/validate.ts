/**
 * Created by wx on 2/07/21.
 */

export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}
