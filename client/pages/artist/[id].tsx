import { GetServerSideProps } from 'next'
import { gql } from 'graphql-request'
import { MusicPlayerLayout } from '../../components/MusicPlayerLayout'
import { client } from '../../graphql/client'
import styled from '@emotion/styled'
import { colors } from '../../styles/colors'
import TrackSnippet from '../../components/TrackSnippet'
import withAuth from '../../hoc/withAuth'
import Head from 'next/head'

const Container = styled.div`
  display: grid;
  grid-template-rows: 35rem 1fr;
  gap: 1rem;
  h2 {
    font-size: 2rem;
    color: ${colors.darkGray};
  }
`

const Cover = styled.div`
  background: ${colors.darkGray};
  padding: 2rem;
  display: grid;
  background: url('https://i.imgur.com/oDy2ai3.jpg');
  background-size: cover;
  h1 {
    align-self: flex-end;
    font-size: 3rem;
    color: white;
  }
`

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20rem);
  padding: 1rem 2rem;
  gap: 1rem;
`

const ArtistPage = ({ artist, tracks }) => {
  if (!artist) {
    return <h1>404</h1>
  }
  return (
    <MusicPlayerLayout>
      <Container>
        <Head>
          <title>{artist.artistName} | VolumePeak</title>
        </Head>
        <Cover>
          <h1>{artist.artistName}</h1>
        </Cover>
        <TrackContainer>
          {tracks.map(({ id, artwork, name, year }) => (
            <TrackSnippet
              key={id}
              id={id}
              artwork={artwork}
              name={name}
              year={year}
            />
          ))}
        </TrackContainer>
      </Container>
    </MusicPlayerLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = gql`
    query GetArtistInfo($id: ID!) {
      artist(id: $id) {
        artistName
      }
      tracks(artist: $id) {
        id
        artwork
        name
        year
      }
    }
  `
  try {
    const { artist, tracks } = await client.request(query, { id: params.id })
    return { props: { artist, tracks } }
  } catch (e) {
    return { props: {} }
  }
}

export default withAuth(ArtistPage)
