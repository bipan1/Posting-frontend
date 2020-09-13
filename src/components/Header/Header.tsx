import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { RootState } from "store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { resetLoginData } from "store/reducers/modules/auth/login";
import { withRouter } from "react-router-dom";
import { logoutAction } from "store/helpers/storeHelpers";

interface IState {
  token: any
};

interface IProps extends PropsFromRedux {

}

class Header extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      token: null,
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('access_token');

    this.setState({ token })
  }

  handleLogout = () => {
    this.props.resetLoginData();
    this.props.history.push("/homepage");
    this.props.logoutAction();
  }


  render() {
    const { loginData } = this.props;
    return (
      <Navbar fixed="top" expand="sm" bg="light" variant="light" className="navbar" >
        <Navbar.Brand href="#home">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/home">
              All Posts{" "}
            </Nav.Link>
            {loginData.data && <><Nav.Link as={NavLink} to="/ownposts">
              Own Posts
            </Nav.Link>
              <Nav.Link as={NavLink} to="profile">
                Profile
            </Nav.Link></>}
          </Nav>
          {!loginData.data && (
            <Form inline>
              <Button
                className="Button"
                variant="outline-info"
                as={Link}
                to="/signup"
              >
                Signup
              </Button>
              <Button
                className="Button"
                variant="outline-info"
                as={Link}
                to="/login"
              >
                Login
              </Button>
            </Form>
          )}
          {loginData.data && (
            <Form inline>
              <Button
                className="Button"
                variant="outline-info"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.auth.login,
});

const mapDispatchToProps = {
  resetLoginData: resetLoginData,
  logoutAction: logoutAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(Header));