import React from "react";
import Login from "./Login/Login";
import { RootState } from "store/reducers/rootReducer";
import { loginAction } from "store/reducers/modules/auth/login";
import { signUp } from "store/reducers/modules/auth/signUp";
import { connect } from "react-redux";
import LoginImage from "../../assets/image/images.png";
import "../layout.scss";
import SignUp from "./Login/SignUp";

interface IState {
}
class LoginPage extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {
      loginData,
      loginAction,
      location,
      singUpData,
      signUp
    } = this.props;

    console.log(loginData)


    return (
      <div className="contact-container">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-7 col-md-9 col-lg-7 mt-4">
            <div className="d-md-flex align-items-center justify-content-between mb-md-2">
              <div className="login--logo d-flex align-items-center pr-2">
                <h6 className="login--title ml-2">

                </h6>
              </div>
              <div className="my-3 my-md-0 ml-1">
                {location.pathname === "/login" ? <h5>Login</h5> : <h5>Signup</h5>}
              </div>
            </div>
            <div className="card card__login">
              <div className="row no-gutters">
                <div className="col-md-6 col-lg-6 d-none d-md-block">
                  <div className="techtalk--image">
                    <img
                      src={LoginImage}
                      alt="Tech Talk"
                      className="img-fluid w-100 "
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="d-flex align-items-center h-100">
                    {location.pathname === "/login" &&
                      <>
                        <Login
                          loginData={loginData}
                          loginAction={loginAction}
                        />
                      </>
                    }
                    {location.pathname === "/signup" &&
                      <>
                        <SignUp
                          singUpData={singUpData}
                          signUp={signUp}
                        />
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loginData: state.auth.login,
  singUpData: state.auth.signUp
});

const mapDispatchToProps = {
  loginAction: loginAction,
  signUp: signUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
