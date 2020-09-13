import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ILoginData } from "../../../store/reducers/modules/auth/login";
import Spinner from "../../../components/Spinner/Spinner";
import { IDefaultReducerObject } from "types/reduxTypes";
import { AxiosPromise } from "axios";
import { toast } from "react-toastify";

interface IState {
  loading: boolean;
}

interface Props extends RouteComponentProps {
  loginData: IDefaultReducerObject;
  loginAction: (loginData: ILoginData) => AxiosPromise;
}

class Login extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleLogin = (values: any): void => {
    this.setState({
      loading: true,
    });
    let loginData: ILoginData = {
      username: values.email,
      password: values.loginPassword,
    };
    this.props.loginAction(loginData).then((loginResponse: any) => {
      this.setState({
        loading: false,
      });
      console.log(loginResponse);
      if (loginResponse.data) {
        if (loginResponse.data.data) {
          toast.success(loginResponse.data.message);
          this.props.history.push("/home");
        } else {
          toast.error(loginResponse.data.message);
        }
      } else {
        toast.error(loginResponse.message);
      }
    });
  };

  render() {

    let { loading } = this.state;

    let initialValues = {
      email: "",
      loginPassword: "",
    };

    let loginSchema = {
      email: Yup.string()
        .required("login.validateUsernameRequired")
        .max(255, "login.validateUsernameMax"),

      loginPassword: Yup.string()
        .required("login.validatePasswordRequired")
        .min(5, "login.validatePasswordMin")
        .max(255, "login.validatePasswordMax"),
    };

    let validateLogin = Yup.object().shape(loginSchema);

    return (
      <div className="loginform">
        <Formik
          initialValues={initialValues}
          validationSchema={validateLogin}
          onSubmit={(values, { setSubmitting }) => {
            this.handleLogin(values);
            setSubmitting(false);
          }}
        >
          {({ values, touched, errors, handleChange, handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="form-group">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className="error">
                    <i className="ic-error"></i>
                    Email is required
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="loginPassword"
                  className="form-control"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.loginPassword}
                />
                {errors.loginPassword && touched.loginPassword && (
                  <div className="error">
                    <i className="ic-error"></i>
                    Password is required
                  </div>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block text-white btn-lg"
              >
                {loading ? (
                  <div>
                    {/* <Loader noMarginTop = {true} /> */}
                    <Spinner />
                  </div>
                ) : (
                    'Login'
                  )}
              </button>
              {/* <Link to="/dashboard" className="btn btn-primary btn-block text-white btn-lg">Login</Link> */}
              {/* </form> */}
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(Login);
