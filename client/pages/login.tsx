import styled from '@emotion/styled'
import { darken } from 'polished'
import { Formik, Form as FormikForm } from 'formik'
import { useRouter } from 'next/router'

import { colors } from '../styles/colors'
import { client } from '../graphql/client'
import { Input } from '../components/Input'
import { gql } from 'graphql-request'

const Container = styled.div`
  background: ${colors.lighterGray};
  min-height: 100vh;
  padding: 15rem 0;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;
  justify-content: center;
  img {
    width: 25rem;
    justify-self: center;
  }
`

const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Button = styled.button`
  background: ${colors.main};
  padding: 1rem;
  font-size: 1.5rem;
  font-family: inherit;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.3s background;
  &:hover,
  &:focus {
    background: ${darken(0.1, colors.main)};
  }
  &:disabled {
    opacity: 0.7;
  }
`

const LoginPage = () => {
  const route = useRouter()
  return (
    <Container>
      <img src="/logo.png" alt="logo" />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }, options) => {
          options.setSubmitting(true)
          const query = gql`
            mutation Login($email: String!, $password: String!) {
              loginArtist(email: $email, password: $password) {
                id
              }
            }
          `
          try {
            const { loginArtist } = await client.request(query, {
              email,
              password
            })

            route.push('/artist/[id]', `/artist/${loginArtist.id}`)
          } catch (e) {}
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input name="email" type="text" placeholder="E-mail address" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginPage
