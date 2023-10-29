
/**
 * 判断某个值是否存在（即非空）
 * @param val 
 * @returns 
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}
