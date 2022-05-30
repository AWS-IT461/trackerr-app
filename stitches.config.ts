import { createStitches, globalCss } from '@stitches/react'

export const { styled, getCssText, css } = createStitches({
  theme: {
    fonts: {},
    fontSizes: {},
  },
})

export const globalStyles = globalCss({
  '*': {
    margin: 0,
  },

  'html, body': {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },

  a: {
    textDecoration: 'none',
  },
})
