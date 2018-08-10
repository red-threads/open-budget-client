import React from 'react'

export default class Error extends React.Component {
  static getInitialProps ({ res, err, errors = {} }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return {
      errors,
      statusCode
    }
  }

  render () {
    return (
      <React.Fragment>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        {
          process.env.NODE_ENV !== 'production' && (
            <pre>{JSON.stringify(this.props.errors, '\t', 2)}</pre>
          )
        }
      </React.Fragment>
    )
  }
}
