import { styled } from '../stitches.config'
import { Company, JobApplication } from '../utils/api'
import { HomeIcon } from '@radix-ui/react-icons'
import StatusBadge from './StatusBadge'
import EventTitleBox, { getRandomColor } from './EventTitleBox'

export default function JourneyCard({
  company,
  latestEvent,
  status,
  date,
}: {
  journeyId: number
  company: Company
  latestEvent: string
  status: JobApplication['status']
  date: string
}) {
  return (
    <Box
      css={{
        flexDirection: 'column',
        padding: '1.5rem 2.5rem 0 2.5rem',
        width: '100%',
        border: '1px solid #e4e8f1',
        borderRadius: '2.5rem',
      }}
    >
      <Box
        css={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <HomeIcon color="#666c7e" />

        <Text css={{ fontWeight: 'bold', paddingLeft: '0.5rem' }}>
          {company.name}
        </Text>
        <Box css={{ flexGrow: 1, justifyContent: 'end' }}>
          <StatusBadge status={status} />
        </Box>
      </Box>
      <WithTimeline>
        <Box
          css={{
            '&::before': {
              backgroundColor: '#fff',
              backgroundImage:
                'url(https://d26uz55awpmifc.cloudfront.net/assets/icons/retro-highlight-clock-ccd4a6216bd3c81f258713544147abc14af225dea97d6b70c51e9cebb92c0402.svg)',
              content: '',
              display: 'inline-block',
              height: '1.5rem',
              width: '1.5rem',
            },
          }}
        />
        <Box
          css={{
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          <EventTitleBox color={getRandomColor(latestEvent.length)}>
            {latestEvent}
          </EventTitleBox>
        </Box>
        <Text>{date}</Text>
      </WithTimeline>
    </Box>
  )
}

const Box = styled('div', { display: 'flex' })

const Text = styled('span', {
  color: '$muted',
})

const WithTimeline = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #e4e8f1',
  paddingBottom: '1.5rem',
  marginTop: '1.5rem',
})
