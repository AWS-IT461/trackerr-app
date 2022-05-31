import { styled } from '../stitches.config'

const Card = styled('div', {
  padding: '2.5rem',
  backgroundColor: '#fff',
  border: '0 solid rgba(0,0,0,0.125)',
  minWidth: 0,
  flex: `0 0 ${(2 / 3) * 100}%`,
  maxWidth: `${(2 / 3) * 100}%`,
  color: '#333342',
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
})

export default Card
