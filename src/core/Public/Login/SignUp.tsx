import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Spinner from "../../../components/Spinner/Spinner";
import { IDefaultReducerObject } from "types/reduxTypes";
import { AxiosPromise } from "axios";
import { toast } from "react-toastify";

interface IState {
}

interface Props extends RouteComponentProps {
    singUpData: IDefaultReducerObject;
    signUp: (loginData: any) => AxiosPromise;
}

class SignUp extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    handleLogin = (values: any): void => {
        let loginData: any = {
            username: values.username,
            email: values.email,
            password: values.loginPassword,
        };
        this.props.signUp(loginData).then((res: any) => {
            if (this.props.singUpData.status === 1) {
                this.props.history.push("/login");
                toast.success(this.props.singUpData.message)
            } else {
                toast.error(this.props.singUpData.message)
            }
        });
    };

    render() {

        let initialValues = {
            email: "",
            loginPassword: "",
            username: ""
        };

        let loginSchema = {
            username: Yup.string()
                .required("Username is required")
                .max(20, "Username too long"),

            loginPassword: Yup.string()
                .required("Password is required")
                .min(8, "Password must be minimum 8 characters")
                .max(20, "Too long password"),

            email: Yup.string()
                .required("Email is required"),
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
                                    name="username"
                                    className="form-control"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    value={values.username}
                                />
                                {errors.email && touched.email && (
                                    <div className="error">
                                        <i className="ic-error"></i>
                                Email is required
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email</label>
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
                                    Email is required.
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
                                disabled={this.props.singUpData.status === 100}
                                type="submit"
                                className="btn btn-primary btn-block text-white btn-lg"
                            >
                                {this.props.singUpData.status === 100 ? (
                                    <div>
                                        {/* <Loader noMarginTop = {true} /> */}
                                        <Spinner />
                                    </div>
                                ) : (
                                        'Signup'
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

export default withRouter(SignUp);
