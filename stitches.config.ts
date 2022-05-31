import { createStitches, globalCss } from '@stitches/react'

export const { styled, getCssText, css } = createStitches({
  theme: {
    fonts: {},
    fontSizes: {},
  },
})

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },

  'html, body': {
    margin: 0,
    padding: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
})
