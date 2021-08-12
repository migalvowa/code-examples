import { ReactNode } from 'react'

export interface ICardFieldProps {
  title: string
  vertical?: boolean
  children: ReactNode
  icon?: ReactNode
}
