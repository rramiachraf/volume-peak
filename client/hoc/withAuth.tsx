import { gql } from 'graphql-request'
import router from 'next/router'
import { Component } from 'react'
import { Loading } from '../components/Loading'
import { client } from '../graphql/client'

const withAuth = C => {
  return class Auth extends Component {
    state: {
      authenticated: undefined
      id: undefined
    }
    async componentDidMount() {
      const query = gql`
        {
          me {
            id
          }
        }
      `
      try {
        const { me } = await client.request(query)
        this.setState({
          authenticated: true,
          id: me.id
        })
      } catch (e) {
        this.setState({ authenticated: false })
      }
    }

    render() {
      if (this.state === null || this.state.authenticated === undefined) {
        return <Loading />
      }

      if (this.state.authenticated === true) {
        return <C userId={this.state.id} {...this.props} />
      }

      if (this.state.authenticated === false) {
        router.push('/login')
        return <div></div>
      }
    }
  }
}

export default withAuth
