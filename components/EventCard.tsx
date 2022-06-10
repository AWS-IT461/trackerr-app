import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row } from '.'
import { styled } from '../stitches.config'
import { Event } from '../utils/api'
import Button from './Button'
import * as Dialog from './Dialog'
import EditEventDialogForm from './EditEventDialogForm'
import { deleteEvent, EVENTS_QUERY_KEY } from '../utils/api'

export default function EventCard({ event }: { event: Event }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: deleteMutation } = useMutation((id: Event['id']) =>
    deleteEvent(id)
  )

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
            <EditEventDialogForm
              event={event}
              onSubmit={() => setOpenEditDialog(false)}
            />
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

          <Dialog.Content css={{ maxWidth: 400 }}>
            <form>
              <header>
                <h3>Are you sure?</h3>
                <P>This action can not be undone.</P>
              </header>
              <Row as="footer" css={{ marginBlockStart: '2rem' }}>
                <Row css={{ marginInlineStart: 'auto', gap: '0.5rem' }}>
                  <Dialog.CleanClose asChild>
                    <Button size="sm" variant="outlined" type="button">
                      Cancel
                    </Button>
                  </Dialog.CleanClose>
                  <Dialog.CleanClose asChild>
                    <Button
                      size="sm"
                      variant="primary"
                      css={{ background: '$error' }}
                      onClick={() =>
                        deleteMutation(event.id, {
                          onSuccess: () => {
                            queryClient.invalidateQueries(EVENTS_QUERY_KEY)
                          },
                        })
                      }
                    >
                      Delete
                    </Button>
                  </Dialog.CleanClose>
                </Row>
              </Row>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Row>
    </div>
  )
}

const P = styled('p', { fontSize: '1rem', color: '$muted' })
