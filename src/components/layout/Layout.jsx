import Link from 'next/link'
import Head from 'next/head'
import * as React from 'react'

export default ({ children, title = 'Open Budget Client' }) => (
  <React.Fragment>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1, width=device-width, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css' integrity='sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB' crossOrigin='anonymous' />
      <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossOrigin='anonymous' />
      <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js' integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49' crossOrigin='anonymous' />
      <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js' integrity='sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T' crossOrigin='anonymous' />
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
