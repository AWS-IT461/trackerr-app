import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth'
import Button from '../components/Button'
import { styled } from '../stitches.config'
import {
  createCompany,
  CreateCompanyRequestBody,
  createCompanySchema,
  createEvent,
  createJobApplication,
  JOB_APP_QUERY_KEY,
  useJobApplications,
} from '../utils/api'
import * as Dialog from '../components/Dialog'
import TextField from '../components/TextField'
import FormControl from '../components/FormControl'
import FormLabel from '../components/FormLabel'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormHint from '../components/FormHint'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import JourneyCard from '../components/JourneyCard'
import { useUser } from '../utils/auth'

const DEFAULT_PAGINATION_SIZE = 5

function Home() {
  const [page, setPage] = useState(1)
  const user = useUser((s) => s.user)
  const { data: applications, status } = useJobApplications({
    page,
    filter: { user: user?.id },
  })

  const [openDialog, setOpenDialog] = useState(false)

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(createCompanySchema),
  })

  const { mutate } = useMutation(
    (values: CreateCompanyRequestBody) =>
      createCompany(values)
        .then(({ id }) =>
          createJobApplication({
            company_id: id,
            user: user?.id as number,
            status: 'P',
          })
        )
        .then(({ id }) =>
          createEvent({
            user: user?.id as number,
            job_application: id,

            title: 'Started Job Application Journey',
            tags: '',
            remarks: '',
            date: '2022-01-01',
          })
        ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(JOB_APP_QUERY_KEY)
      },
    }
  )

  const onSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        setOpenDialog(false)
      },
    })
  }

  const maxPage = applications
    ? Math.ceil(applications.count / DEFAULT_PAGINATION_SIZE)
    : 0

  return (
    <>
      <Head>
        <title>Trackerr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Auth>
        {status !== 'success' ? null : (
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%',

              // replace with header
              paddingBlockStart: '7.5rem',
            }}
          >
            <Main>
              <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                <header>
                  <Box
                    css={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Image
                      src={`https://avatars.dicebear.com/api/micah/${'dave@dave.com'}.svg?r=50`}
                      alt="profile pic"
                      height={32}
                      width={32}
                    />

                    <Box css={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{user?.email}</span>
                      <Box css={{ display: 'flex', gap: '1rem' }}>
                        <div>
                          {
                            applications.results.filter(
                              ({ status }) => status === 'A'
                            ).length
                          }{' '}
                          Accepted
                        </div>
                        <div>
                          {
                            applications.results.filter(
                              ({ status }) => status === 'P'
                            ).length
                          }{' '}
                          Pending
                        </div>
                        <div>
                          {
                            applications.results.filter(
                              ({ status }) => status === 'R'
                            ).length
                          }{' '}
                          Rejected
                        </div>
                      </Box>
                    </Box>

                    <Dialog.Trigger asChild>
                      <Button variant="primary">Add Journey</Button>
                    </Dialog.Trigger>
                  </Box>
                </header>

                <section>
                  <header>Journeys</header>

                  <Box
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem',
                    }}
                  >
                    {/* list */}
                    <Box css={{ display: 'flex', flexDirection: 'column' }}>
                      {applications.results.reverse().map((app) => (
                        <JourneyCard
                          key={app.id.toString()}
                          company={app.company}
                          date="01-20-2022"
                          journeyId={app.id}
                          latestEvent="Did a phone interview."
                          status={app.status}
                        />
                      ))}
                    </Box>

                    {/* pagination stuff */}
                    <Box
                      css={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignSelf: 'center',
                      }}
                    >
                      <Button
                        size="xs"
                        variant="outlined"
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                      >
                        <ChevronLeftIcon />
                      </Button>

                      {Array.from({ length: maxPage }, (_, i) => 1 + i).map(
                        (num) => (
                          <Button
                            size="xs"
                            onClick={() => setPage(num)}
                            key={num}
                            variant={page === num ? 'primary' : 'outlined'}
                          >
                            {num}
                          </Button>
                        )
                      )}

                      <Button
                        size="xs"
                        variant="outlined"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={maxPage === page}
                      >
                        <ChevronRightIcon />
                      </Button>
                    </Box>
                  </Box>
                </section>

                <Dialog.Content>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      <FormControl
                        error={Boolean(errors.name?.message)}
                        css={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <FormLabel htmlFor="name">Company Name</FormLabel>
                        <TextField id="name" {...register('name')} />
                        <FormHint>{errors.name?.message}</FormHint>
                      </FormControl>
                    </Box>

                    <footer>
                      <Box css={{ display: 'flex', marginBlockStart: '2rem' }}>
                        <Button
                          variant="primary"
                          type="submit"
                          css={{ marginInlineStart: 'auto' }}
                        >
                          Start Journey
                        </Button>
                      </Box>
                    </footer>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
            </Main>
          </Box>
        )}
      </Auth>
    </>
  )
}

const Main = styled('main', {
  maxWidth: '60rem',
  width: '100%',
  padding: '2.5rem',
})

const Box = styled('div', {})

const BackgroundBanner = styled('div', {
  height: '25rem',
  left: 0,
  top: 0,
  position: 'absolute',
  width: '100%',
  zIndex: -1,
  //TODO: Multiple colors
  backgroundColor: '$blue',
})
export default Home
