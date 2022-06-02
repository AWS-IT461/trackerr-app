import Link from 'next/link'
import { styled } from '../stitches.config'
import Logo from './Logo'

export default function Navbar() {
  return (
    <Nav>
      <h3>Logo</h3>
      <Ul>
        <Li>
          <Link href="#">
            <A>
              <H5>Home</H5>
            </A>
          </Link>
        </Li>
        <Li>
          <Link href="#">
            <A>
              <H5>Applications</H5>
            </A>
          </Link>
        </Li>
      </Ul>
      <h3>Login</h3>
    </Nav>
  )
}

const Nav = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background:
    'linear-gradient(180deg, rgba(51,51,66,0.24) 0%, rgba(51,51,66,0) 100%)',
  textRendering: 'optimizeLegibility',
  padding: '0.375rem 1.25rem',
})

const Ul = styled('ul', {
  display: 'flex',
  margin: 0,
  flexDirection: 'row',
  flexGrow: 1,
  justifyContent: 'center',
})

const H5 = styled('h5', {
  color: 'White',
  fontWeight: '600',
  margin: 0,
})

const Li = styled('li', {
  marginRight: '0.5rem',
  padding: '0.875rem 1rem',
  borderRadius: '1.5rem !important',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#333342',
  },
  lineHeight: '1.25rem',
})

const A = styled('a', {})
