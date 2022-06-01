import { styled } from '../stitches.config'

const FormControl = styled('div', {
  variants: {
    error: {
      true: {
        '& label, & small': {
          color: '$error',
        },
      },
    },
  },
})

export default FormControl
