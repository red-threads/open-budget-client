import * as React from 'react'
import Layout from '../src/components/layout/Layout'
import { LIST } from '../src/auth/roles'
import withAuth from '../src/auth/withAuth'

export class Home extends React.Component {
  static async getInitialProps () {
    return {
      action: LIST,
      entity: 'home'
    }
  }

  render () {
    return (
      <Layout>
        <main>
          <h1>Open Budget WebClient</h1>
          <p>Welcome {JSON.stringify(this.props.userScopes)}!</p>
        </main>
      </Layout>
    )
  }
}

export default withAuth(Home)
