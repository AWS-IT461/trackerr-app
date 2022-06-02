import create from 'zustand'
import { persist } from 'zustand/middleware'

interface BearState {
  token: string
  setToken: (t: string) => void
}

export const useAuth = create<BearState>()(
  persist((set) => ({
    token: '',
    setToken: (token) => set({ token }),
  }))
)
