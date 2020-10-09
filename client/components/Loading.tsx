import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const heartBeat = keyframes`
    0%{
        transform: scale(.9)
    }
    100%{
        transform: scale(1)
    }
`

const Container = styled.div`
  height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 30rem;
    animation: 0.5s ${heartBeat} ease-in-out infinite;
  }
`

export const Loading = () => (
  <Container>
    <img src="/logo.png" alt="Loading..." />
  </Container>
)
