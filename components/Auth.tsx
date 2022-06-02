import { useRouter } from 'next/router'
import { useEffect, type ReactNode } from 'react'
import { useAuth } from '../utils/auth'

export default function Auth({ children }: { children: ReactNode }) {
  const token = useAuth((s) => s.token)
  const router = useRouter()

  useEffect(() => {
    if (!token) router.push('/login')
  }, [router, token])

  return <>{children}</>
}
