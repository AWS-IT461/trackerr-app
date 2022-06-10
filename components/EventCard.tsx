import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Row } from '.'
import { Event } from '../utils/api'
import Button from './Button'
import * as Dialog from './Dialog'
import EditEventDialogForm from './EditEventDialogForm'

export default function EventCard({ event }: { event: Event }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <div>
      <span>{event.title}</span>
      <Row>
        <Dialog.Root open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <Dialog.Trigger asChild>
            <Button
              size="xs"
              variant="outlined"
              css={{ borderRadius: 999, height: 24, width: 24, padding: 0 }}
            >
              <Pencil1Icon style={{ margin: 'auto' }} />
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <EditEventDialogForm event={event} />
            {/* <AddEventDialogForm
                  job_application_id={companyId}
                  onSubmit={() => setOpenDialog(false)}
                /> */}
          </Dialog.Content>
        </Dialog.Root>

        <Dialog.Root open={openDelete} onOpenChange={setOpenDelete}>
          <Dialog.Trigger asChild>
            <Button
              size="xs"
              variant="outlined"
              css={{
                borderRadius: 999,
                height: 24,
                width: 24,
                padding: 0,
                color: '$error',
              }}
            >
              <Cross1Icon style={{ margin: 'auto' }} />
            </Button>
          </Dialog.Trigger>
        </Dialog.Root>
      </Row>
    </div>
  )
}
