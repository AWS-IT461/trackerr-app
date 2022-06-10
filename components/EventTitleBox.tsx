import { css, styled } from '../stitches.config'
import type * as Stitches from '@stitches/react'

const EventTitleBox = styled('div', {
  borderRadius: '0.25rem',
  textAlign: 'center',
  alignItems: 'center',
  marginBlock: 'auto',
  textOverflow: 'ellipsis',
  backgroundColor: 'gray',
  fontWeight: 600,
  width: 'fit-content',
  fontSize: '130%',

  variants: {
    size: {
      sm: {
        padding: '0.25rem 0.625rem',
        fontSize: '0.75rem',
      },
      base: {
        padding: '0.25rem 0.75rem',
      },
    },
    color: {
      purple: {
        backgroundColor: 'rgba(137,76,255,0.1)',
        color: '#894cff',
      },
      lightRed: {
        backgroundColor: 'rgba(255,116,116,0.1)',
        color: '#ff7474',
      },
      blue: {
        backgroundColor: 'rgba(50,138,255,0.1)',
        color: '#328aff',
      },
      pink: {
        backgroundColor: 'rgba(255,104,212,0.1)',
        color: '#ff68D4',
      },
      green: {
        backgroundColor: 'rgba(0,184,92,0.1)',
        color: '#00b85c',
      },
      red: {
        backgroundColor: 'rgba(251,78,78,0.1)',
        color: '#fb4e4e',
      },
    },
  },
  defaultVariants: {
    color: 'red',
    size: 'base',
  },
})

export type EventTitleColorVariants = Stitches.VariantProps<
  typeof EventTitleBox
>['color']

export const colorList: Readonly<EventTitleColorVariants[]> = [
  'purple',
  'red',
  'blue',
  'pink',
  'lightRed',
  'green',
]

export function getRandomColor(textLength: number) {
  return colorList[textLength % colorList.length]
}
export default EventTitleBox
