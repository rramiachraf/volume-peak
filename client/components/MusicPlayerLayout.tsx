import styled from '@emotion/styled'
import { ReactChild, useContext } from 'react'
import { AudioContext } from '../context/Audio'
import { colors } from '../styles/colors'
import { Aside } from './Aside'
import { MusicPlayer } from './MusicPlayer'

interface Props {
  children: ReactChild
}

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 20% 1fr;
  background: ${colors.lighterGray};
`

interface PageSplitProps {
  src: string
}

const PageSplit = styled.div`
  display: grid;
  grid-template-rows: ${({ src }: PageSplitProps) =>
    src ? '1fr 6.5rem' : '1fr'};
`

export const MusicPlayerLayout = ({ children }: Props) => {
  const { src } = useContext(AudioContext)
  return (
    <Container>
      <Aside></Aside>
      <PageSplit src={src}>
        {children}
        {src && <MusicPlayer />}
      </PageSplit>
    </Container>
  )
}
