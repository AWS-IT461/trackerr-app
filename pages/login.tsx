import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import { styled } from '../stitches.config'

const Box = styled('div', {})
const Span = styled('span', {})
const A = styled('a', {})

export default function LoginScreen() {
  return (
    <Box
      css={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div>
        <LoginForm />
        <Box css={{ marginBlockStart: '1rem', textAlign: 'center' }}>
          <Span css={{ color: '$muted', fontSize: '0.875rem' }}>
            Don&apos;t have an acount?
          </Span>{' '}
          <Link passHref href="/signup">
            <A
              css={{
                color: '#333342',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              Sign up
            </A>
          </Link>
        </Box>
      </div>
    </Box>
  )
}
