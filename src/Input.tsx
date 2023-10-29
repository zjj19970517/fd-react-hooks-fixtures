import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react'
import clsx from 'clsx'
import { Clear } from '@react-vant/icons'

import { InputInstance, InputPropsType } from './propsType'
import { mergeProps } from 'src/components/utils/get-default-props'
import {
  createNamespace,
  formatNumber,
  isDef,
  resetScroll,
} from 'src/components/utils'
import { usePropsValue } from 'src/components/hooks'

const [bem] = createNamespace('input')

const Input = forwardRef<InputInstance, InputPropsType>((p, ref) => {
  // 合并 defaultProps
  const props = mergeProps(p, {
    clearIcon: <Clear />,
    clearTrigger: 'focus',
    defaultValue: '',
  })

  const [inputFocus, setInputFocus] = useState(false) // input 是否聚焦
  const compositionStartRef = useRef(false) // composition 的开始标志位
  const inputRef = useRef<HTMLInputElement>() // input 元素
  const [value, setValue] = usePropsValue(props) // input 受控和非受控

  const { className, align, style, type, name, disabled, autoFocus } = props
  const { readOnly, placeholder, maxLength } = props

  const classes = clsx(bem([align], className))

  // 是否展示清除 Icon
  const showClearIcon = useMemo(() => {
    if (props.clearable && !readOnly) {
      const hasValue = value !== ''
      const trigger =
        props.clearTrigger === 'always' ||
        (props.clearTrigger === 'focus' && inputFocus)
      return hasValue && trigger
    }
  }, [props.clearTrigger, inputFocus])

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    get nativeElement() {
      return inputRef.current
    },
  }))

  // 主动控制 input 失焦
  function blur() {
    if (inputRef?.current) {
      inputRef.current.blur()
    }
  }

  // 主动控制 input 聚焦
  function focus() {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }

  // 失焦事件处理
  function handleBlur(event) {
    setInputFocus(false)
    props.onBlur?.(event)
    resetScroll()
  }

  // 聚焦事件处理
  function handleFocus(event) {
    setInputFocus(true)
    props.onFocus?.(event)
    if (readOnly) {
      blur()
    }
  }

  // 清除事件处理
  function handleClear(e) {
    setValue('')
    props.onClear?.(e)
  }

  // 处理输入 change 事件
  const handleValueChange = (inputValue?: string) => {
    let finalValue = inputValue
    if (!compositionStartRef.current) {
      if (isDef(maxLength) && finalValue.length > +maxLength) {
        // 字数超限制了
        finalValue = finalValue.slice(0, maxLength)
        props.onOverlimit?.()
      }
      if (type === 'number' || type === 'digit') {
        // 输入数字的话，将输入的值转换为 number
        const isNumber = type === 'number'
        finalValue = formatNumber(finalValue, isNumber, isNumber)
      }
    }
    setValue(finalValue)
  }

  const handleKeyPress = e => {
    props.onKeyPress?.(e)
  }

  // 渲染 input 元素
  const renderInnerInput = () => {
    let inputType = type
    let inputMode
    if (type === 'number') {
      inputType = 'text'
      inputMode = 'decimal'
    }

    if (type === 'digit') {
      inputType = 'tel'
      inputMode = 'numeric'
    }

    return (
      <input
        type={inputType}
        inputMode={inputMode}
        ref={inputRef}
        name={name}
        className={clsx(bem('control'))}
        disabled={disabled}
        autoFocus={autoFocus}
        readOnly={readOnly}
        placeholder={placeholder}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={props.onClick}
        onChange={e => handleValueChange(e?.currentTarget?.value)}
        // autoCapitalize 可以控制手机软键盘呼起时候，字母的大小写设置
        autoCapitalize={props.autoCapitalize}
        onKeyDown={props.onKeyDown}
        onKeyPress={handleKeyPress}
        onKeyUp={props.onKeyUp}
        onCompositionStart={e => {
          compositionStartRef.current = true
          props.onCompositionStart?.(e)
        }}
        onCompositionEnd={e => {
          compositionStartRef.current = false
          props.onCompositionEnd?.(e)
          handleValueChange(e?.currentTarget?.value)
        }}
      />
    )
  }

  return (
    <div className={classes} style={style}>
      {/* 前缀 */}
      {props.prefix && (
        <div className={clsx(bem('prefix'))}>{props.prefix}</div>
      )}
      {/* input 元素 */}
      {renderInnerInput()}
      {/* 清空按钮 */}
      {showClearIcon &&
        React.cloneElement(
          (props.clearIcon || <Clear />) as React.ReactElement,
          {
            className: clsx(bem('clear')),
            onTouchStart: handleClear,
          }
        )}
      {/* 后缀 */}
      {props.suffix && (
        <div className={clsx(bem('suffix'))}>{props.suffix}</div>
      )}
    </div>
  )
})

export default Input
