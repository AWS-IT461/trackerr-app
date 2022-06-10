import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row, Column } from '.'
import { styled } from '../stitches.config'
import { Event } from '../utils/api'
import Button from './Button'
import * as Dialog from './Dialog'
import EditEventDialogForm from './EditEventDialogForm'
import { deleteEvent, EVENTS_QUERY_KEY } from '../utils/api'
import EventTitleBox from './EventTitleBox'
import { TagPill } from './TagPill'

export default function EventCard({ event }: { event: Event }) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: deleteMutation } = useMutation((id: Event['id']) =>
    deleteEvent(id)
  )

  return (
    <Box>
      <Date css={{ alignSelf: 'start', paddingTop: '1.5rem' }}>
        {event.date}
      </Date>
      <TimelineBox
        css={{
          flexDirection: 'column',
          borderLeft: '1px solid #e4e8f1',
          paddingBottom: '.5rem',
          flex: 1,
          flexGrow: 1,
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
      >
        <Column
          css={{
            paddingLeft: '1.5rem',
            justifyContent: 'space-around',
            height: '100%',
            flex: 1,
          }}
        >
          <EventTitleBox>{event.title}</EventTitleBox>
          <Box css={{ flexWrap: 'wrap', alignItems: 'start' }}>
            {event.tags &&
              event.tags
                ?.split(', ')
                .map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
          </Box>

          <Remark>{event.remarks || 'No notes made.'}</Remark>
        </Column>
      </TimelineBox>

      <Row css={{ justifyContent: 'end', gap: 10 }}>
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
    </Box>
  )
}

const P = styled('p', { fontSize: '1rem', color: '$muted' })
const Box = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const Date = styled('span', { color: '$muted', marginRight: '1.5rem' })

const Remark = styled('span', { color: '$black' })

const TimelineBox = styled('div', { display: 'flex', flexDirection: 'column' })
