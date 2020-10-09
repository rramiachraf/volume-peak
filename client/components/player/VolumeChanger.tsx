import styled from '@emotion/styled'
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

import { AudioContext } from '../../context/Audio'
import { ForwardButton } from './Controls'
import {
  Draggable as StandardDraggable,
  SeekBar as StandardSeekBar
} from '../player/SeekBar'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5rem;
  gap: 1rem;
  align-items: center;
`

const SeekBar = styled(StandardSeekBar)`
  height: 0.7rem;
  border-radius: 100px;
`

const Draggable = styled(StandardDraggable)`
  border-radius: 100px;
`

const Muted = ForwardButton.withComponent(FaVolumeMute)
const Unmuted = ForwardButton.withComponent(FaVolumeUp)

export const VolumeChanger = () => {
  const { mute, toggleMute, audioRef } = useContext(AudioContext)
  const seekBarRef = useRef() as MutableRefObject<HTMLDivElement>
  const [draggableWidth, setDraggableWidth] = useState('100%')
  useEffect(() => {
    const seekBarWidth = window.getComputedStyle(seekBarRef.current).width
    seekBarRef.current.addEventListener('click', e => {
      const volume = e.offsetX / parseInt(seekBarWidth)
      audioRef.current.volume = volume
      const newWidth = `${volume * 100}%`
      setDraggableWidth(newWidth)
    })
  }, [])
  return (
    <Container>
      <SeekBar ref={seekBarRef}>
        <Draggable style={{ width: draggableWidth }} />
      </SeekBar>
      {mute ? <Muted onClick={toggleMute} /> : <Unmuted onClick={toggleMute} />}
    </Container>
  )
}
