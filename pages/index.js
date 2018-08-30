import Link from 'next/link'
import Layout from '../src/components/layout/Layout'

export default () => (
  <Layout>
    <main>
      <h1>Open Budget WebClient</h1>
      <p>
        <Link href='/login'>
          <a>Please login</a>
        </Link>
      </p>
      <p>
        Authentication provided by <a width='150' height='50' href='https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss' target='_blank' alt='Single Sign On & Token Based Authentication - Auth0'><img width='150' height='50' alt='JWT Auth for open source projects' src='//cdn.auth0.com/oss/badges/a0-badge-light.png' /></a>
      </p>
    </main>
  </Layout>
)
