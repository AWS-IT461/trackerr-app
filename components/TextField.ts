import { styled } from '../stitches.config'

const TextField = styled('input', {
  width: '100%',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#333342',
  background: '#f1f4f9',
  backgroundClip: 'padding-box',

  border: '2px solid #f1f4f9',

  '&:focus': {
    outline: 'none',
    border: '2px solid #e4e8f1',
  },

  variants: {
    size: {
      sm: {
        fontSize: '0.75rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '0.25rem',
        lineHeight: 1,
      },
      base: {
        height: '3rem',
        padding: '0.875rem 0.75rem',
        borderRadius: '0.5rem',
        lineHeight: 1.4285,
      },
    },
  },

  defaultVariants: {
    size: 'base',
  },
})

export default TextField
