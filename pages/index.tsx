import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth'
import Button from '../components/Button'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import { styled } from '../stitches.config'
import {
  COMPANIES_QUERY_KEY,
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

function Home() {
  // TODO: filter by user id
  const { data: applications, status } = useJobApplications()

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
            company: id,
            // TODO: change
            user: 1,
            status: 'P',
            applying_date: '2022-01-01',
          })
        )
        .then(({ id }) =>
          createEvent({
            // TODO: change
            user: 1,
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

  const onSubmit = (values: any) => mutate(values)

  if (status !== 'success') return null

  return (
    <>
      <Head>
        <title>Trackerr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Auth>
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
            <header>
              <Box css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Image
                  src={`https://avatars.dicebear.com/api/micah/${'dave@dave.com'}.svg?r=50`}
                  alt="profile pic"
                  height={32}
                  width={32}
                />

                <Box css={{ display: 'flex', flexDirection: 'column' }}>
                  <span>dave@dave.com</span>
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

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="primary">Add Journey</Button>
                  </Dialog.Trigger>
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
                          css={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <FormLabel htmlFor="name">Company Name</FormLabel>
                          <TextField id="name" {...register('name')} />
                          <FormHint>{errors.name?.message}</FormHint>
                        </FormControl>
                      </Box>

                      <footer>
                        <Box
                          css={{ display: 'flex', marginBlockStart: '2rem' }}
                        >
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
              </Box>
            </header>

            <section>
              <header>Journeys</header>
              <div>
                {applications.results.map((app) => (
                  <div key={app.id}>{app.company}</div>
                ))}
              </div>
            </section>
          </Main>
        </Box>
      </Auth>
    </>
  )
}

const Main = styled('main', {
  maxWidth: '42.5rem',
  width: '100%',
  padding: '2.5rem',
})

const Container = styled('div', {})
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
