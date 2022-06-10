import create from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from './api'

interface BearState {
  token: string
  setToken: (t: string) => void
}

interface UserState {
  user: User | undefined
  setUser: (user: User) => void
}
export const useUser = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}))

export const useAuth = create<BearState>()(
  persist((set) => ({
    token: '',
    setToken: (token) => set({ token }),
  }))
)
