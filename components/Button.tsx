import { styled } from '../stitches.config'

const Button = styled('button', {
  display: 'block',
  fontWeight: 600,

  border: '1px solid transparent',

  userSelect: 'none',

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
  '&:disabled': {
    opacity: 0.5,
  },
  '&[type="submit"]': {
    width: '100%',
  },

  variants: {
    size: {
      xs: {
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        lineHeight: '16px',
        borderRadius: '0.25rem',
      },
      sm: {
        padding: '0.5rem 0.75rem',
        fontSize: '0.75rem',
        lineHeight: '16px',
        borderRadius: '0.25rem',
      },
      base: {
        padding: '0.625rem 1rem',
        fontSize: '0.875rem',
        lineHeight: '20px',
        borderRadius: '0.5rem',
      },
      lg: {
        borderRadius: '0.5rem',
        padding: '0.875rem 1.5rem',
        fontSize: '0.875rem',
        lineHeight: '20px',
      },
    },
    variant: {
      primary: {
        color: 'White',
        backgroundColor: '$primary',
        borderColor: '$primary',
      },
      outlined: {
        color: '#333342',
        borderColor: '#333342',
        backgroundColor: 'transparent',
      },
    },
  },

  defaultVariants: { size: 'base' },
})

export default Button
