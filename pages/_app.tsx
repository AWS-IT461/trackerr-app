import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { globalStyles } from '../stitches.config'
import { getUser } from '../utils/api'
import { useAuth, useUser } from '../utils/auth'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  const setUser = useUser((s) => s.setUser)
  const token = useAuth((s) => s.token)

  if (token) getUser().then((user) => setUser(user))

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
