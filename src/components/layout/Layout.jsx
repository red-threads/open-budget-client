import Link from 'next/link'
import Head from 'next/head'
import * as React from 'react'

export function Layout ({ children, title = 'Open Budget Client' }) {
  return (
    <React.Fragment>
      <Head>
        <title>{ title }</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1, width=device-width, shrink-to-fit=no' />
        <link rel='stylesheet' href='/static/bootstrap/4.1.3.css' crossOrigin='anonymous' />
        <script src='/static/jquery/3.3.1.slim.js' crossOrigin='anonymous' />
        <script src='/static/popper.js/1.14.4.js' crossOrigin='anonymous' />
        <script src='/static/bootstrap/4.1.3.js' crossOrigin='anonymous' />
        <link rel='stylesheet' href='/static/react-s-alert/1.4.1.default.css' crossOrigin='anonymous' />
        <link rel='stylesheet' href='/static/react-s-alert/1.4.1.stackslide.css' crossOrigin='anonymous' />
      </Head>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link href='#'>
            <a className='navbar-brand'>Home</a>
          </Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <Link href='/organization'><a className='nav-link'>Organizations</a></Link>
              <Link href='/card'><a className='nav-link'>Cards</a></Link>
              <Link href='/transaction'><a className='nav-link'>Transactions</a></Link>
              <Link href='/transaction-type'><a className='nav-link'>Transaction types</a></Link>
            </ul>
          </div>
        </nav>
      </header>
      <main className='container py-4'>
        { children }
      </main>
      <footer className='container-fluid py-4 text-center text-small bg-light text-danger'>
        RedThreads
      </footer>
    </React.Fragment>
  )
}

export default Layout
