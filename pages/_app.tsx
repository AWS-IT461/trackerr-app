import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { globalStyles } from '../stitches.config'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
