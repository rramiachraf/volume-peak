import styled from '@emotion/styled'

import { Controls } from './player/Controls'
import { VolumeChanger } from './player/VolumeChanger'
import { TrackInfo } from './player/TrackInfo'
import { TrackPlaying } from './player/TrackPlaying'

const Container = styled.div`
  background: white;
  display: grid;
  grid-template-rows: 0.5rem 1fr;
  position: sticky;
  right: 0;
  bottom: 0;
`

const Content = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr 20rem;
  gap: 2rem;
  padding: 0 4rem;
`

export const MusicPlayer = () => {
  return (
    <Container>
      <TrackPlaying />
      <Content>
        <TrackInfo />
        <Controls />
        <VolumeChanger />
      </Content>
    </Container>
  )
}
