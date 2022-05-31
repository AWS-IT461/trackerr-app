import { css, styled } from '../stitches.config'
import type * as Stitches from '@stitches/react'

const EventTitle = styled('div', {
  borderRadius: '0.25rem',
  padding: '0.25rem 0.75rem',
  textAlign: 'center',
  alignItems: 'center',
  textOverflow: 'ellipsis',
  backgroundColor: 'gray',
  fontWeight: 600,

  variants: {
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
  },
})

export type EventTitleColorVariants = Stitches.VariantProps<
  typeof EventTitle
>['color']

export const colorList: Readonly<EventTitleColorVariants[]> = [
  'purple',
  'red',
  'blue',
  'green',
  'lightRed',
  'pink',
]

export function getRandomColor(textLength: number) {
  return colorList[textLength % colorList.length]
}
export default EventTitle
