import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Box, Column, Row } from '.'
import Button from './Button'
import FormControl from './FormControl'
import FormHint from './FormHint'
import FormLabel from './FormLabel'
import TextField from './TextField'

import {
  createEventSchema,
  CreateEventRequestBody,
  createEvent,
  JobApplication,
  EVENTS_QUERY_KEY,
} from '../utils/api'
import EventTitleBox, { getRandomColor } from './EventTitleBox'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function AddEventDialogForm({
  job_application_id,
  onSubmit,
}: {
  job_application_id: JobApplication['id']
  onSubmit: () => void
}) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CreateEventRequestBody>({
    resolver: zodResolver(createEventSchema),
    defaultValues: { user: 1, job_application: job_application_id, tags: '' },
  })

  const tags = watch('tags')

  const { mutate } = useMutation((values: CreateEventRequestBody) =>
    createEvent(values)
  )

  const handleOnSubmit = (values: CreateEventRequestBody) => {
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    mutate(
      { ...values, date: values.date || formatDate(new Date()) },
      {
        onSuccess: () => {
          onSubmit()
          reset()
          queryClient.invalidateQueries(EVENTS_QUERY_KEY)
        },
      }
    )
  }

  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTag, setNewTag] = useState('')

  const closeIsAdding = () => {
    setIsAddingTag(false)
    setNewTag('')
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Column css={{ gap: '1rem' }}>
        <Row css={{ gap: '1rem' }}>
          <FormControl
            error={Boolean(errors.title?.message)}
            css={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          >
            <FormLabel htmlFor="title">Title</FormLabel>
            <TextField
              id="title"
              {...register('title')}
              placeholder="Got a call from Company A"
            />
            <FormHint>{errors.title?.message}</FormHint>
          </FormControl>

          <FormControl css={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel htmlFor="date">Date</FormLabel>
            <TextField id="date" type="date" {...register('date')} />
            <FormHint>{errors.date?.message}</FormHint>
          </FormControl>
        </Row>

        <FormControl css={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="remarks">Notes</FormLabel>
          <TextField
            id="remarks"
            {...register('remarks')}
            as="textarea"
            css={{ minHeight: 100, resize: 'vertical' }}
            placeholder="I had a great time talking with the HR Rep"
          />
        </FormControl>

        <FormControl css={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="tags">
            Tags <small>(e.g. Phone Interview)</small>
          </FormLabel>
          <Row css={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.split(',').map((tag, index) =>
              tag.length ? (
                <EventTitleBox
                  color={getRandomColor(tag.length)}
                  size="sm"
                  key={index}
                >
                  {tag}
                </EventTitleBox>
              ) : null
            )}

            {!isAddingTag ? (
              <Button
                size="xs"
                type="button"
                variant="outlined"
                css={{ display: 'flex', gap: '0.25rem' }}
                onClick={() => setIsAddingTag(true)}
              >
                <PlusIcon />
                <span>Add a Tag</span>
              </Button>
            ) : (
              <Row css={{ gap: '0.5rem' }}>
                <TextField
                  size="sm"
                  placeholder="Tag Name"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />

                <Row css={{ gap: '0.5rem' }}>
                  <Button
                    size="xs"
                    variant="outlined"
                    type="button"
                    onClick={closeIsAdding}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    variant="primary"
                    type="button"
                    onClick={() => {
                      if (newTag)
                        setValue(
                          'tags',
                          !tags.length ? newTag : `${tags},${newTag}`
                        )
                      closeIsAdding()
                    }}
                  >
                    Save
                  </Button>
                </Row>
              </Row>
            )}
          </Row>
        </FormControl>
      </Column>

      <footer style={{ display: 'flex', marginBlockStart: '2rem' }}>
        <Box css={{ width: 'fit-content', marginLeft: 'auto' }}>
          <Button variant="primary" type="submit">
            Add Event
          </Button>
        </Box>
      </footer>
    </form>
  )
}
