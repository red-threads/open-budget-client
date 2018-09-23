import Link from 'next/link'
import Layout from '../src/components/layout/Layout'

export default () => (
  <Layout>
    <main className='jumbotron'>
      <h1 className='display-4'>Open Budget</h1>
      <p className='lead'>The web client</p>
      <Link href='/login'>
        <a className='btn btn-outline-dark btn-lg' role='button'>Please login</a>
      </Link>
      <hr class='my-4' />
      <p>
        Authentication provided by <a width='150' height='50' href='https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss' target='_blank' alt='Single Sign On & Token Based Authentication - Auth0'><img width='150' height='50' alt='JWT Auth for open source projects' src='//cdn.auth0.com/oss/badges/a0-badge-light.png' /></a>
      </p>
    </main>
  </Layout>
)
