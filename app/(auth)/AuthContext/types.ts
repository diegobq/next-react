import { User } from 'firebase/auth'

export interface AuthContextType {
  user: User
  loading: boolean
}
