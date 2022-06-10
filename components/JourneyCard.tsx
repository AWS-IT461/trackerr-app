import { styled } from '../stitches.config'
import { Company, JobApplication } from '../utils/api'
import { HomeIcon } from '@radix-ui/react-icons'
import StatusBadge from './StatusBadge'
import EventTitleBox, { getRandomColor } from './EventTitleBox'
import { Column, Row } from '.'

export default function JourneyCard({
  jobApp: { company, status },
}: {
  jobApp: JobApplication
}) {
  return (
    <Box
      css={{
        flexDirection: 'column',
        padding: '1rem 1.5rem',
        width: '100%',
        border: '1px solid #e4e8f1',
        borderRadius: '1.5rem',
      }}
    >
      <Column css={{ gap: '0.5rem' }}>
        <Row css={{ alignItems: 'center' }}>
          <HomeIcon color="#666c7e" />
          <Text css={{ fontWeight: 'bold', paddingLeft: '0.5rem' }}>
            {company.name}
          </Text>
        </Row>
        <StatusBadge status={status} />
        {company.contact_info.length ? (
          <EventTitleBox
            color={getRandomColor(company.contact_info.length)}
            size="sm"
            css={{ width: 'fit-content' }}
          >
            {company.contact_info}
          </EventTitleBox>
        ) : null}
        {company.address.length ? (
          <EventTitleBox
            color={getRandomColor(company.address.length)}
            size="sm"
            css={{ width: 'fit-content', textAlign: 'start' }}
          >
            {company.address}
          </EventTitleBox>
        ) : null}
      </Column>
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
