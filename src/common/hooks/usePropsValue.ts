import { SetStateAction, useRef } from "react"

type Options<T> = {
  value?: T
  defaultValue?: T
  onChange?: (v: T) => void
}

/**
 * 实现受控组件
 * @param options 
 * @returns 
 */
export default function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options

  const stateRef = useRef<T>(defaultValue!)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = (v: SetStateAction<T>) => {
    const nextValue =
      typeof v === "function" ? (v as (prevState: T) => T)(stateRef.current) : v
    if (nextValue === stateRef.current) return

    stateRef.current = nextValue
    onChange?.(nextValue)
  }

  return [stateRef.current, setState] as const
}
