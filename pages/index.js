import Link from 'next/link'
import Layout from '../src/components/layout/Layout'

export default () => (
  <Layout>
    <main>
      <h1>Open Budget WebClient</h1>
      <Link href='/login'>
        <a>Please login</a>
      </Link>
    </main>
  </Layout>
)
