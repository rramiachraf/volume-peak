import styled from '@emotion/styled'
import { FaPause, FaPlay, FaForward, FaBackward } from 'react-icons/fa'
import { MdRepeat, MdRepeatOne } from 'react-icons/md'
import { lighten, rgba } from 'polished'
import { useContext } from 'react'

import { AudioContext } from '../../context/Audio'
import { colors } from '../../styles/colors'
import Timing from './Timing'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: ${colors.lighterGray};
  border-radius: 5px;
  padding: 1rem 3rem;
  /* box-shadow: 0 2px 0 ${rgba('black', 0.2)}; */
  border: 1px solid ${rgba('black', 0.1)};
`

interface IconProps {
  playing?: string
}

const PlayButton = styled(FaPlay)`
  color: ${({ playing }: IconProps) =>
    playing ? colors.darkGray : colors.main};
  font-size: 2rem;
  cursor: pointer;
`

const PauseButton = PlayButton.withComponent(FaPause)
export const ForwardButton = styled(FaForward)`
  color: ${colors.darkGray};
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s color;
  &:hover,
  &:active {
    color: ${lighten(0.2, colors.darkGray)};
  }
`
const BackwardButton = ForwardButton.withComponent(FaBackward)
const RepeatOne = ForwardButton.withComponent(MdRepeatOne)
const Repeat = RepeatOne.withComponent(MdRepeat)

export const Controls = () => {
  const {
    playing,
    togglePlay,
    backward,
    forward,
    loop,
    toggleLoop,
    currentTime,
    duration
  } = useContext(AudioContext)
  return (
    <Container>
      <Timing duration={duration} currentTime={currentTime} />
      <BackwardButton onClick={backward} />
      {playing ? (
        <PauseButton playing={String(playing)} onClick={togglePlay} />
      ) : (
        <PlayButton onClick={togglePlay} />
      )}
      <ForwardButton onClick={forward} />
      {loop ? (
        <RepeatOne onClick={toggleLoop} />
      ) : (
        <Repeat onClick={toggleLoop} />
      )}
    </Container>
  )
}
