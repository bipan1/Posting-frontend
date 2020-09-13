import React from 'react';
import { withRouter,  RouteComponentProps } from 'react-router-dom'

interface IState {
  error: any;
  errorInfo: any
}

type Props = RouteComponentProps

class ErrorBoundary extends React.Component<Props,IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  refreshHandler = () => {
    this.setState({
      error: null,
      errorInfo: null,
    })
  }

  goBackHandler = () => {
    let self = this
    this.setState({
      error: null,
      errorInfo: null,
    }, () => {
      self.props.history.goBack()
      setTimeout(() => self.refreshHandler(), 200)
    })
  }

  componentDidCatch(error: any, info: any) {
    this.setState({
      error: error,
      errorInfo: info,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}>
          <div className="text-center">
            <summary
              className="text-center mb-4"><h2>Something went wrong</h2></summary>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}>
              <button className="btn btn-danger" onClick={this.refreshHandler}> Refresh Page</button>
              <button className="btn btn-danger" onClick={this.goBackHandler}> Previous Page</button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
export default withRouter(ErrorBoundary);