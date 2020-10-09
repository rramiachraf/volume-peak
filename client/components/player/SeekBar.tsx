import styled from '@emotion/styled'
import { colors } from '../../styles/colors'

export const SeekBar = styled.div`
  cursor: pointer;
  background: ${colors.lightGray};
`

export const Draggable = styled.div`
  background: ${colors.main};
  height: 100%;
  border-radius: 0 100px 100px 0;
  transition: 0.2s width;
`
