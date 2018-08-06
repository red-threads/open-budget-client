import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { err, statusCode }
  }

  render() {
    return (
      <React.Fragment>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        {
          process.env.NODE_ENV !== 'production' && (
            <pre>{JSON.stringify(this.props.err, '\t', 2)}</pre>
          )
        }
      </React.Fragment>
    )
  }
}