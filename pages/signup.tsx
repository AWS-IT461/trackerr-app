import Link from 'next/link'
import SignupForm from '../components/SignupForm'
import { styled } from '../stitches.config'

const Box = styled('div', {})
const Span = styled('span', {})
const A = styled('a', {})

export default function SignupScreen() {
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
        <SignupForm />
        <Box css={{ marginBlockStart: '1rem', textAlign: 'center' }}>
          <Span css={{ color: '$muted', fontSize: '0.875rem' }}>
            Already have an acount?
          </Span>{' '}
          <Link passHref href="/login">
            <A
              css={{
                color: '#333342',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              Log in
            </A>
          </Link>
        </Box>
      </div>
    </Box>
  )
}
