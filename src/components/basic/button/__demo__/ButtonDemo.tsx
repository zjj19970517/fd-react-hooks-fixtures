import VButton from "../index"

import React from "react"

const ButtonDemo: React.FC<unknown> = () => {
  return (
    <>
      <VButton type="danger" text="测试文案"></VButton>
      <VButton size="large" type="default" text="测试文案"></VButton>
      <VButton size="large" type="default" disabled text="测试文案"></VButton>
    </>
  )
}

export default ButtonDemo
