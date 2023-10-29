import VInput from "../index"

import React, { useState } from "react"

const InputDemo: React.FC<unknown> = () => {

  const [state, updateState] = useState('测试文案')

  return (
    <>
      <VInput
        value={state}
        onChange={text => updateState(text)}
        placeholder='请输入文本'
        clearable
      />
    </>
  )
}

export default InputDemo
