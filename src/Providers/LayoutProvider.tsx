import { ReactNode } from 'react'
import './Layout.css'
type Props = {
    children:ReactNode
}

const LayoutProvider = ({children}: Props) => {
  return (
    <div className='layout'>
        {children}
    </div>
  )
}

export default LayoutProvider