import { ReactNode } from 'react'

export interface IDetailsLayoutTypes {
  children: ReactNode
  aside?: ReactNode
}

export type StylesConfig = Pick<IDetailsLayoutTypes, 'aside'>
