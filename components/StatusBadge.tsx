import { styled } from '../stitches.config'
import { JobApplication } from '../utils/api'
import {
  DrawingPinFilledIcon,
  CheckIcon,
  Cross2Icon,
} from '@radix-ui/react-icons'

export default function StatusBadge({
  status,
}: {
  status: JobApplication['status']
}) {
  let statusLabel = 'Pending'
  let DisplayIcon = DrawingPinFilledIcon
  let color = '#894cff'

  if (status === 'A') {
    statusLabel = 'Accepted'
    DisplayIcon = CheckIcon
    color = '#00b85c'
  } else if (status === 'R') {
    statusLabel = 'Rejected'
    DisplayIcon = Cross2Icon
    color = '#ff7474'
  }

  return (
    <Box css={{ backgroundColor: 'white' }}>
      <DisplayIcon color={color} />
      <Text css={{ color }}>{statusLabel}</Text>
    </Box>
  )
}

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '6.25rem',
  border: '0.5px solid #e4e8f1',
  padding: '0.625rem 1rem',
})

const Text = styled('span', { marginLeft: '0.25rem' })
