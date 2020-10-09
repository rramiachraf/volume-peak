import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import Link from 'next/link'

const Container = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-rows: 20rem 1.4rem 1.1rem;
  gap: 0.5rem;
`

interface ArtworkProps {
  url: string
}

const Artwork = styled.div`
  background: url(${({ url }: ArtworkProps) => url});
  background-size: cover;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${colors.lightGray};
`

const Title = styled.h4`
  font-size: 1.4rem;
  color: ${colors.darkGray};
  text-transform: capitalize;
`

const ReleaseDate = styled.small`
  font-size: 1.1rem;
  color: ${colors.darkGray};
`

interface Props {
  id: number
  artwork: string
  name: string
  year: number
}

const TrackSnippet = ({ id, name, year, artwork }: Props) => (
  <Container>
    <Link href="/song/[id]" as={`/song/${id}`}>
      <Artwork url={`${process.env.URL}/artwork/${artwork}`} />
    </Link>
    <Title>{name}</Title>
    <ReleaseDate>{year}</ReleaseDate>
  </Container>
)

export default TrackSnippet
