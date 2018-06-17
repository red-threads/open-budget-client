import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

import rollbar from '../src/rollbar'
rollbar()

export default class OpenBudgetApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>Open Budget</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
