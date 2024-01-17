import React from 'react'

interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children }: Props) {
  return (
    <div>
      CartLayout
      {children}
    </div>
  )
}
