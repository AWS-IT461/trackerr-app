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
import Link from 'next/link'
import { Column, Row } from '../components'

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
  } = useForm<CreateCompanyRequestBody>({
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
                      <Button variant="primary">Add Company</Button>
                    </Dialog.Trigger>
                  </Box>
                </header>

                <Column as="section" css={{ marginBlockStart: '2rem' }}>
                  <header>
                    <h1>Companies</h1>
                  </header>

                  <Box
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem',
                    }}
                  >
                    {/* list */}
                    <Box
                      css={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBlockStart: '1rem',
                      }}
                    >
                      {applications.results.reverse().map((app) => (
                        <Link key={app.id} href={`/company/${app.id}`}>
                          <a>
                            <JourneyCard key={app.id} jobApp={app} />
                          </a>
                        </Link>
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
                </Column>

                <Dialog.Content>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Column css={{ gap: '1rem' }}>
                      <FormControl
                        error={Boolean(errors.name?.message)}
                        css={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <FormLabel htmlFor="name">Company Name</FormLabel>
                        <TextField id="name" {...register('name')} />
                        <FormHint>{errors.name?.message}</FormHint>
                      </FormControl>

                      <Row css={{ gap: '1rem' }}>
                        <FormControl
                          error={Boolean(errors.address?.message)}
                          css={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                          }}
                        >
                          <FormLabel htmlFor="address">Address</FormLabel>
                          <TextField
                            id="address"
                            {...register('address')}
                            placeholder="21 Jump Street"
                          />
                          <FormHint>{errors.address?.message}</FormHint>
                        </FormControl>
                        <FormControl
                          error={Boolean(errors.contact_info?.message)}
                          css={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <FormLabel htmlFor="contact_info">
                            Contact Info
                          </FormLabel>
                          <TextField
                            id="contact_info"
                            {...register('contact_info')}
                            placeholder="09234567890"
                          />
                          <FormHint>{errors.contact_info?.message}</FormHint>
                        </FormControl>
                      </Row>
                    </Column>

                    <Row as="footer" css={{ marginBlockStart: '2rem' }}>
                      <Row css={{ marginInlineStart: 'auto', gap: '0.5rem' }}>
                        <Dialog.CleanClose asChild>
                          <Button variant="outlined" type="button">
                            Cancel
                          </Button>
                        </Dialog.CleanClose>
                        <Button
                          variant="primary"
                          type="submit"
                          css={{ marginInlineStart: 'auto' }}
                        >
                          Create Company
                        </Button>
                      </Row>
                    </Row>
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
