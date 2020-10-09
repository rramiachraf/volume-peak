import styled from '@emotion/styled'
import { useContext } from 'react'
import { AudioContext } from '../../context/Audio'
import { colors } from '../../styles/colors'

const Container = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  height: 100%;
  gap: 0.5rem;
`

interface ArtworkProps {
  artwork: string
}

const Artwork = styled.div`
  background: url(${({ artwork }: ArtworkProps) => artwork});
  background-size: cover;
  border-radius: 5px;
  margin: 0.5rem;
  border: 1px solid ${colors.lightGray};
`

const TrackData = styled.div`
  padding: 1rem;
  justify-self: flex-start;
  align-self: center;
  h4 {
    font-weight: 500;
    font-size: 1.4rem;
    color: ${colors.main};
  }
  p {
    font-weight: 500;
    font-size: 1.3rem;
    color: ${colors.darkGray};
  }
`

export const TrackInfo = () => {
  const { artwork, songName, artist } = useContext(AudioContext)
  return (
    <Container>
      <Artwork artwork={artwork} />
      <TrackData>
        <h4>{songName}</h4>
        <p>{artist}</p>
      </TrackData>
    </Container>
  )
}
