import styled from '@emotion/styled'
import Link from 'next/link'
import { lighten, rgba } from 'polished'
import { colors } from '../styles/colors'

const Header = styled.header`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`

const Navbar = styled.nav`
  height: 6rem;
  background: white;
  padding: 0 20%;
  border-bottom: 3px solid ${colors.lighterGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 15rem;
  }
  button {
    padding: 0.8rem 3rem;
  }
`

const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(to right, white 50%, ${rgba('white', 0.6)}),
    url('bg.jpeg');
  background-size: cover;
  padding: 0 20%;
`

const Left = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  h1 {
    color: ${colors.darkGray};
    font-size: 3rem;
    font-family: 'source code pro';
  }
  small {
    font-size: 1.4rem;
    color: ${colors.darkGray};
  }
`

const Button = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 100px;
  border: none;
  font-family: inherit;
  background: ${colors.main};
  color: white;
  font-weight: 500;
  font-size: 1.5rem;
  transition: 0.2s background;
  &:hover,
  &:active {
    background: ${lighten(0.03, colors.main)};
  }
`

const Index = () => (
  <Header>
    <Navbar>
      <img src="/logo.png" alt="Logo" />
      <ul>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </ul>
    </Navbar>
    <Content>
      <Left>
        <h1>One good thing about music, when it hits you, you feel no pain.</h1>
        <small>― Bob Marley</small>
        <div>
          <Button>Try VolumePeak</Button>
        </div>
      </Left>
    </Content>
  </Header>
)

export default Index
