import { styled } from '../stitches.config'

const FormHint = styled('small', {
  fontSize: '12px',
  fontWeight: 500,
  marginBlockStart: '0.25rem',
  display: 'inline-block',
  color: '$muted',

  variants: {
    error: {
      true: {
        color: '$error',
      },
    },
  },
})

export default FormHint
