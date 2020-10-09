import { MusicPlayerLayout } from '../../components/MusicPlayerLayout'
import styled from '@emotion/styled'
import Head from 'next/head'
import { colors } from '../../styles/colors'
import { lighten } from 'polished'
import { useContext } from 'react'
import { AudioContext } from '../../context/Audio'
import { GetServerSideProps } from 'next'
import { gql } from 'graphql-request'
import { client } from '../../graphql/client'
import { formatDuration } from '../../functions/formatDuration'
import { FaUserAlt, FaClock, FaCalendarAlt, FaMusic } from 'react-icons/fa'
import withAuth from '../../hoc/withAuth'

const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
`

const BG = styled.div`
  position: relative;
`

interface ArtworkProps {
  artwork: string
}

const Artwork = styled.div`
  background-image: url(${({ artwork }: ArtworkProps) => artwork});
  background-repeat: no-repeat;
  background-size: cover;
  filter: grayscale(0.5);
  width: 100%;
  height: 100%;
`

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100px;
  padding: 0.8rem 4rem;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  background: ${colors.main};
  color: white;
  cursor: pointer;
  font-family: inherit;
  transition: 0.3s background;
  &:hover {
    background: ${lighten(0.04, colors.main)};
  }
`

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  background: white;
  color: ${colors.darkGray};
  small {
    font-size: 1.3rem;
    justify-self: center;
  }
  svg {
    font-size: 1.2rem;
  }
`

const IconWithText = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto auto;
  gap: 0.5rem;
`

const SongPage = ({ artist, song, name, artwork, duration, year }) => {
  const trackURL = `${process.env.URL}/track/${song}`
  const artworkURL = `${process.env.URL}/artwork/${artwork}`
  const {
    setSrc,
    setDuration,
    setArtwork,
    setArtist,
    setSongName,
    audioRef
  } = useContext(AudioContext)
  const playSong = () => {
    setSrc(trackURL)
    setDuration(duration)
    setArtwork(artworkURL)
    setArtist(artist)
    setSongName(name)
    localStorage.setItem(
      'last-played',
      JSON.stringify({ trackURL, duration, artworkURL, artist, name })
    )
    audioRef.current.autoplay = true
  }
  return (
    <MusicPlayerLayout>
      <Container>
        <Head>
          <title>
          {name} - {artist} | VolumePeak
          </title>
        </Head>
        <Info>
          <IconWithText>
            <FaUserAlt />
            <small>{artist}</small>
          </IconWithText>
          <IconWithText>
            <FaMusic />
            <small>{name}</small>
          </IconWithText>
          <IconWithText>
            <FaClock />
            <small>{formatDuration(duration)}</small>
          </IconWithText>
          <IconWithText>
            <FaCalendarAlt />
            <small>{year}</small>
          </IconWithText>
        </Info>
        <BG>
          <Artwork artwork={artworkURL} />
          <PlayButton onClick={playSong}>Listen</PlayButton>
        </BG>
      </Container>
    </MusicPlayerLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = gql`
    query getTrackInfos($id: ID!) {
      track(id: $id) {
        name
        artist
        duration
        year
        song
        artwork
      }
    }
  `
  const { track } = await client.request(query, { id: params.id })
  return { props: { ...track } }
}

export default withAuth(SongPage)
