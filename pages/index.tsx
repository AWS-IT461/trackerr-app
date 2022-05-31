import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import { styled } from '../stitches.config'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Trackerr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundBanner />
      <Navbar />
      <Main>
        <Card>
          <Timeline />
        </Card>
      </Main>
    </Container>
  )
}

const Main = styled('main', {
  minHeight: '100vh',
  padding: '4rem 0',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
})

const Container = styled('div', {
  padding: '0 2rem',
})

const BackgroundBanner = styled('div', {
  height: '25rem',
  left: 0,
  top: 0,
  position: 'absolute',
  width: '100%',
  zIndex: -1,
  //TODO: Multiple colors
  backgroundColor: '#37c5ab',
})
export default Home
