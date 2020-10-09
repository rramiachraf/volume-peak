import { MutableRefObject, useContext, useEffect, useRef } from 'react'
import { AudioContext } from '../../context/Audio'
import { Draggable, SeekBar } from './SeekBar'

export const TrackPlaying = () => {
  const { audioRef, draggableWidth } = useContext(AudioContext)
  const seekBarRef = useRef() as MutableRefObject<HTMLDivElement>
  useEffect(() => {
    const seekBarWidth = window.getComputedStyle(seekBarRef.current).width
    seekBarRef.current.addEventListener('click', e => {
      const timeToSeek =
        (e.offsetX / parseInt(seekBarWidth)) * audioRef.current.duration
      audioRef.current.currentTime = timeToSeek
    })
  }, [])
  return (
    <SeekBar ref={seekBarRef}>
      <Draggable style={{width: draggableWidth}} />
    </SeekBar>
  )
}
