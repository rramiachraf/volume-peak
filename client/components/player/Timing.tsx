import styled from '@emotion/styled'
import { formatDuration } from '../../functions/formatDuration'
import { colors } from '../../styles/colors'

const Container = styled.div`
  color: ${colors.darkGray};
  font-size: 1.2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 3rem auto 3rem;
  time {
    justify-self: center;
  }
`

interface Props {
  currentTime: number
  duration: number
}

const Timing = ({ currentTime, duration }: Props) => {
  return (
    <Container>
      <time>{formatDuration(currentTime)}</time>
      <div>/</div>
      <time>{formatDuration(duration)}</time>
    </Container>
  )
}

export default Timing
