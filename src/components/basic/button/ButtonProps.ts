import React from 'react'
import { BaseTypeProps } from '../../../common/interfaces/BaseTypeProps'

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'

export interface ButtonPropsType extends BaseTypeProps {
  // 按钮类型
  type?: ButtonType
  // 按钮尺寸
  size?: ButtonSize
  // 是否禁用
  disabled?: boolean
  // 自定义 class 名
  className?: string
  // 按钮文案
  text?: React.ReactNode
  // 是否为块级元素
  block?: boolean
  // 是否为朴素按钮
  plain?: boolean
  // 是否为方型按钮
  square?: boolean
  // 是否为圆形按钮
  round?: boolean
  // 按钮文字颜色
  color?: string
  // 按钮背景
  background?: string
  // 点击事件回调处理函数
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type ButtonGroupPropsType = BaseTypeProps &
  Pick<
    ButtonPropsType,
    'size' | 'type' | 'square' | 'block' | 'round' | 'plain' | 'disabled'
  > & {
    // 点击事件
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  }

export const DefaultButtonProps: ButtonPropsType = {
  type: 'default',
  disabled: false,
  className: 'className',
  text: '按钮',
  size: 'normal',
  block: false,
  plain: false,
  square: false,
  round: true,
  color: '',
  background: '',
}

export const DefaultButtonGroupProps: ButtonGroupPropsType = {
  type: 'default',
  disabled: false,
  className: 'className',
  size: 'normal',
  block: false,
  plain: false,
  square: false,
  round: true,
}
