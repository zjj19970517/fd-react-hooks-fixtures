import React from 'react'
import { ButtonGroupPropsType } from '../ButtonProps'

type ButtonContextType = {
  parent?: ButtonGroupPropsType
}

const ButtonContext = React.createContext<ButtonContextType>({})

export default ButtonContext
