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
    },
  },

  defaultVariants: { size: 'lg' },
})

export default Button
