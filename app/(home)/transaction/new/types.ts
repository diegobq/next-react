export interface ITypesConfig {
  [key: string]: {
    id: string
    label: string
    value: string
  }
}

export interface SelectProps {
  id: string
  value: number
  label: string
}
