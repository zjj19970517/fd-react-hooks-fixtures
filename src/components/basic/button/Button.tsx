import React, { useContext } from 'react'
import clsx from 'clsx'

// hooks
import { useMergeProps } from '../../../common/hooks/use-merge-props'

import { ButtonPropsType, DefaultButtonProps } from './ButtonProps'
import ButtonContext from './context/ButtonContext'

// utils
import { createNamespace } from '../../../common/utils/createNamespace'
import { computedStyle } from './helper/buttonHelper'

const [bem] = createNamespace('button')

const Button: React.FC<ButtonPropsType> = (p) => {
  const props = useMergeProps(p, DefaultButtonProps)
  const {
    type: _type,
    plain: _plain,
    size: _size,
    block: _block,
    disabled: _disabled,
    className,
    round,
    square,
    color,
    background,
    ...resetProps
  } = props

  const { parent } = useContext(ButtonContext)

  // 可从 ButtonGroup 上继承属性值
  // useMemo 可类比 computed
  const size = React.useMemo(
    () => _size || parent?.size || 'normal',
    [parent?.size, _size]
  )

  const type = React.useMemo(
    () => _type || parent?.type || 'default',
    [parent?.type, _type]
  )

  const plain = React.useMemo(
    () => _plain ?? parent?.plain,
    [parent?.plain, _plain]
  )

  const block = React.useMemo(
    () => _block ?? parent?.block,
    [parent?.block, _block]
  )

  const disabled = React.useMemo(
    () => _disabled ?? parent?.disabled,
    [parent?.disabled, _disabled]
  )

  // 组装 className
  const classes = clsx(
    className,
    bem([
      type,
      size,
      {
        disabled,
        block,
        plain,
        square,
        round,
      },
    ])
  )

  // 组装自定义组件样式
  const style = computedStyle(props.style, { color, background })

  // 点击事件处理函数
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!disabled && props.onClick) {
      props.onClick(event)
    }
  }

  // 渲染按钮文案
  function renderButtonText() {
    const text = props.children || props.text
    if (text) {
      return (
        <span key='text' className={clsx(bem('text'))}>
          {text}
        </span>
      )
    }
    return null
  }

  // 渲染按钮内容
  function renderContent() {
    return <div className={clsx(bem('content'))}>{renderButtonText()}</div>
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      {...resetProps}
    >
      {renderContent()}
    </button>
  )
}

export default Button
