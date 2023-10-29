import React from 'react'
import clsx from 'clsx'

import ButtonContext from './context/ButtonContext'
import { ButtonGroupPropsType, DefaultButtonGroupProps } from './ButtonProps'
import { createNamespace } from '../../../common/utils/createNamespace'

const [bem] = createNamespace('button-group')

const ButtonGroup: React.FC<ButtonGroupPropsType> = (
  props = DefaultButtonGroupProps
) => {
  const { children, className, style, onClick } = props
  const classes = clsx(
    className,
    bem([
      {
        round: props.round,
        plain: props.plain,
        disabled: props.disabled,
      },
    ])
  )

  const internalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.disabled) return
    onClick?.(e)
  }

  return (
    <div className={classes} onClick={internalClick} style={style}>
      {/* ButtonGroup 会包裹 Button 组件 */}
      {/* 我们可以使用 ButtonContext 将传递给 ButtonGroup 组件的属性，向下传递给 Button 组件 */}
      <ButtonContext.Provider value={{ parent: props }}>
        {children}
      </ButtonContext.Provider>
    </div>
  )
}

export default ButtonGroup
