import * as React from 'react'
import Layout from '../src/components/layout/Layout'
import withAuth from '../src/auth/withAuth'

export class Home extends React.Component {
  render() {
    return (
      <Layout>
        <main>
          <h1>Open Budget WebClient</h1>
          <p>Welcome {JSON.stringify(this.props.userProfile)}!</p>
        </main>
      </Layout>
    )
  }
}

export default withAuth(Home)
