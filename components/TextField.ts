import { styled } from '../stitches.config'

const TextField = styled('input', {
  width: '100%',
  height: '3rem',
  padding: '0.875rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.4285',
  color: '#333342',
  background: '#f1f4f9',
  backgroundClip: 'padding-box',
  borderRadius: '0.5rem',

  border: '2px solid #f1f4f9',

  '&:focus': {
    outline: 'none',
    border: '2px solid #e4e8f1',
  },
})

export default TextField
