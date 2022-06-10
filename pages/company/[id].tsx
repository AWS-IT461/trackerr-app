import { useRouter } from 'next/router'
import { Box, Column, Row } from '../../components'
import Auth from '../../components/Auth'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { useEvents, useJobApplication } from '../../utils/api'
import * as Dialog from '../../components/Dialog'
import { useState } from 'react'
import AddEventDialogForm from '../../components/AddEventDialogForm'

export default function CompanyPage() {
  const query = useRouter().query
  const companyId = parseInt((query?.id as string) ?? '0', 10)

  const [openDialog, setOpenDialog] = useState(false)

  const { data: jobApplicationData } = useJobApplication(companyId, {
    options: { enabled: Boolean(companyId) },
  })
  const { data: events, status } = useEvents()

  if (status !== 'success') return 'loading'

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

            <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
              <Row css={{ justifyContent: 'space-between' }}>
                <span>{jobApplicationData?.company.name}</span>

                <Dialog.Trigger asChild>
                  <Button size="lg" variant="primary">
                    Add Event
                  </Button>
                </Dialog.Trigger>
              </Row>

              <Dialog.Content>
                <AddEventDialogForm
                  job_application_id={companyId}
                  onSubmit={() => setOpenDialog(false)}
                />
              </Dialog.Content>
            </Dialog.Root>

            {/* events list */}
            <Column>
              {events?.map((e) => (
                <div key={e.id}>{e.id}</div>
              ))}
            </Column>
          </Box>
        </Container>
      </Box>
    </Auth>
  )
}
