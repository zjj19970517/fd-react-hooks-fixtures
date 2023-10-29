import React from 'react'
import clsx from 'clsx'

import { ButtonGroupPropsType, DefaultButtonGroupProps } from './buttonProps'
import { createNamespace } from '../../components/utils'
import ButtonContext from './ButtonContext'

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
      <ButtonContext.Provider value={{ parent: props }}>
        {children}
      </ButtonContext.Provider>
    </div>
  )
}

export default ButtonGroup
