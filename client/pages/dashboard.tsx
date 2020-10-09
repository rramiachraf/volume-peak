import styled from '@emotion/styled'
import { MusicPlayerLayout } from '../components/MusicPlayerLayout'

const Container = styled.div`
  padding: 2rem;
`

const Dashboard = () => (
  <MusicPlayerLayout>
    <Container>
      <h1>Dashboard</h1>
    </Container>
  </MusicPlayerLayout>
)

export default Dashboard
