import React from 'react'
import { Header } from './Components/Header/Header'

interface IProps {
  children: any
}

const MainLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout
