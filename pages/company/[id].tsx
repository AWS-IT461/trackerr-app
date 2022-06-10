import { useRouter } from 'next/router'
import { Box, Column, Row } from '../../components'
import Auth from '../../components/Auth'
import Button from '../../components/Button'
import Container from '../../components/Container'
import {
  JOB_APP_QUERY_KEY,
  patchApp,
  useEvents,
  useJobApplication,
} from '../../utils/api'
import * as Dialog from '../../components/Dialog'
import { useState } from 'react'
import AddEventDialogForm from '../../components/AddEventDialogForm'
import EventCard from '../../components/EventCard'
import { ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons'
import StatusBadge from '../../components/StatusBadge'
import EventTitleBox, { getRandomColor } from '../../components/EventTitleBox'
import { styled } from '../../stitches.config'
import { useQueryClient } from 'react-query'

export default function CompanyPage() {
  const query = useRouter().query
  const companyId = parseInt((query?.id as string) ?? '0', 10)

  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false)

  const queryClient = useQueryClient()

  const { data: jobApplicationData, status: jobStatus } = useJobApplication(
    companyId,
    {
      options: { enabled: Boolean(companyId) },
    }
  )
  const { data: events, status } = useEvents({
    params: { application: jobApplicationData?.id as number },
    options: { enabled: Boolean(jobApplicationData?.id) },
  })

  if (status !== 'success' || jobStatus !== 'success') return 'loading'

  return (
    <Auth>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Container as="main">
          <Box>
            {/* company data */}
            <Button
              size="xs"
              css={{ display: 'flex', gap: '0.25rem' }}
              onClick={() => router.back()}
            >
              <ChevronLeftIcon />
              <Text as="h4">Go back</Text>
            </Button>
            <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
              <Row css={{ justifyContent: 'space-between' }}>
                <Column css={{ gap: '0.5rem' }}>
                  <Row css={{ alignItems: 'center', gap: '1rem' }}>
                    <Text
                      as="h1"
                      css={{ fontWeight: 'bold', paddingLeft: '0.5rem' }}
                    >
                      {jobApplicationData.company.name}
                    </Text>

                    <StatusBadge status={jobApplicationData.status} />
                  </Row>
                  {jobApplicationData.company.contact_info.length ? (
                    <EventTitleBox
                      color={getRandomColor(
                        jobApplicationData.company.contact_info.length
                      )}
                      size="sm"
                      css={{ width: 'fit-content' }}
                    >
                      {jobApplicationData.company.contact_info}
                    </EventTitleBox>
                  ) : null}
                  {jobApplicationData.company.address.length ? (
                    <EventTitleBox
                      color={getRandomColor(
                        jobApplicationData.company.address.length
                      )}
                      size="sm"
                      css={{ width: 'fit-content', textAlign: 'start' }}
                    >
                      {jobApplicationData.company.address}
                    </EventTitleBox>
                  ) : null}
                </Column>

                {jobApplicationData.status === 'P' ? (
                  <Row css={{ gap: '0.5rem' }}>
                    <Button
                      size="lg"
                      variant="primary"
                      css={{
                        height: 'fit-content',
                        backgroundColor: '$error',
                        borderColor: 'transparent',
                      }}
                      onClick={() => {
                        patchApp(jobApplicationData.id, { status: 'R' }).then(
                          () => {
                            queryClient.invalidateQueries(JOB_APP_QUERY_KEY)
                          }
                        )
                      }}
                    >
                      Rejected
                    </Button>
                    <Button
                      size="lg"
                      variant="primary"
                      css={{
                        height: 'fit-content',
                        background: '#40be88',
                        borderColor: 'transparent',
                      }}
                      onClick={() => {
                        patchApp(jobApplicationData.id, { status: 'A' }).then(
                          () => {
                            queryClient.invalidateQueries(JOB_APP_QUERY_KEY)
                          }
                        )
                      }}
                    >
                      Accepted
                    </Button>
                    <Dialog.Trigger asChild>
                      <Button
                        size="lg"
                        variant="primary"
                        css={{ height: 'fit-content' }}
                      >
                        Add Event
                      </Button>
                    </Dialog.Trigger>
                  </Row>
                ) : null}
              </Row>

              <Dialog.Content>
                <AddEventDialogForm
                  job_application_id={companyId}
                  onSubmit={() => setOpenDialog(false)}
                />
              </Dialog.Content>
            </Dialog.Root>

            {/* events list */}
            <Column css={{ marginTop: '2rem' }}>
              {events?.map((e) => (
                <EventCard event={e} key={e.id} />
              ))}
            </Column>
          </Box>
        </Container>
      </Box>
    </Auth>
  )
}

const Text = styled('span', {
  color: '$muted',
})
