import styled from '@emotion/styled'
import { Field } from 'formik'
import { rgba } from 'polished'
import { colors } from '../styles/colors'

export const Input = styled(Field)`
  border-radius: 3px;
  padding: 0.5rem 2rem;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  height: 4rem;
  width: 40rem;
  font-family: inherit;
  color: ${colors.darkGray};
  font-size: 1.4rem;
  transition: 0.3s box-shadow;
  &:focus {
    box-shadow: 0 2px 1px ${rgba(colors.darkGray, 0.2)};
  }
`
