import styled from '@emotion/styled'
import { gql } from 'graphql-request'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { client } from '../graphql/client'
import { colors } from '../styles/colors'

const Container = styled.aside`
  background: white;
  border-right: 1px solid ${colors.mediumGray};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  img {
    width: 15rem;
  }
  ul {
    list-style-type: none;
    font-size: 1.3rem;
    display: grid;
    gap: 0.5rem;
    color: ${colors.darkGray};
    font-weight: 500;
    li {
      cursor: pointer;
      padding: 1rem 2rem;
      background: ${colors.lighterGray};
      border-radius: 5px;
      transition: 0.3s background;
      text-transform: capitalize;
      &:hover {
        background: ${colors.main};
        color: white;
      }
    }
  }
`

export const Aside = () => {
  const router = useRouter()
  const logout = async () => {
    const query = gql`
      mutation {
        logout
      }
    `
    const { logout } = await client.request(query)
    if (logout) {
      router.push('/')
    }
  }
  return (
    <Container>
      <img src="/logo.png" alt="Logo" />
      <ul>
        <Link href="/song/add">
          <li>Add Song</li>
        </Link>
        <li onClick={logout}>Log out</li>
      </ul>
    </Container>
  )
}
