import { createStitches, globalCss } from '@stitches/react'

export const { styled, getCssText, css } = createStitches({
  theme: {
    colors: {
      muted: '#666c7e',
      error: '#ff7474',
      primary: '#582be8',
      purple: '#894cff',
      'bg-purple': 'rgba(137,76,255,0.1)',
      red: '#fb4e4e',
      'bg-red': 'rgba(251,78,78,0.1)',
      'light-red': '#ff7474',
      'bg-light-red': 'rgba(255,116,116,0.1)',
      blue: '#328aff',
      'bg-blue': 'rgba(50,138,255,0.1)',
      pink: '#ff68D4',
      'bg-pink': 'rgba(255,104,212,0.1)',
      green: '#00b85c',
      'bg-green': 'rgba(0,184,92,0.1)',
    },
    fonts: {},
    fontSizes: {},
  },
})

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
  },

  'html, body': {
    padding: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  li: {
    listStyleType: 'none',
  },
})
