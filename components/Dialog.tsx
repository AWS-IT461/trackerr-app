import type { ComponentProps } from 'react'

import { styled, keyframes } from '../stitches.config'
import { blackA, blue, mauve, slate } from '@radix-ui/colors'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  zIndex: '$max',
})

function DialogRoot({
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  )
}

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '700px',
  maxHeight: '85vh',
  padding: '1rem',
  zIndex: '$max',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
  },
  '&:focus': { outline: 'none' },
})

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: '1rem',
})

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
})

const StyledTrigger = styled(DialogPrimitive.Trigger, {})

export const CleanedUpTrigger = styled(DialogPrimitive.Trigger, {
  background: 'none',
  border: 'none',

  cursor: 'pointer',
})

const StyledClose = styled(DialogPrimitive.Close, {
  background: 'none',
  border: 'none',
  borderRadius: 5,
  color: slate.slate11,
  padding: 5,
  cursor: 'pointer',
  transition: 'background-color 200ms ease',

  '&:hover': {
    backgroundColor: blue.blue3,
  },
})

export const Root = DialogRoot
export const Trigger = StyledTrigger
export const Content = StyledContent
export const Title = StyledTitle
export const Description = StyledDescription
export const Close = StyledClose
export const CleanClose = DialogPrimitive.Close
