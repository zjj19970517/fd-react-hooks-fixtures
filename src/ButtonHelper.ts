/**
 * 计算 Button 组件最终的 style
 * @param customStyle 用户自定义的 style
 * @param param1 其他样式 props 集
 * @returns
 */
export function computedStyle(
  customStyle: Record<string, string | number>,
  { color, background }: { color: string; background: string }
) {
  const style: Record<string, string | number> = {}
  if (color) {
    style.color = color
  }
  if (background) {
    style.background = background
  }
  return {
    ...style,
    ...customStyle,
  }
}
