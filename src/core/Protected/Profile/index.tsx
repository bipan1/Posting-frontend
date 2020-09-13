import React, { Fragment } from "react";
import { RootState } from "store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { getProfile, resetgetProfile } from "store/reducers/modules/profile/getProfile";
import { saveProfile } from "store/reducers/modules/profile/saveProfile";
import UserImage from '../../../assets/image/user.jpg';
import { updateProfile } from "store/reducers/modules/profile/updateProfile";
// import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";


const regex = /(.*?)\.(jpg|png)$/
interface IState {
    image: any;
    imageShow: any;
    nameP: string;
    address: string;
    phoneNo: string;
    profileEdit: boolean;
}

interface ISubmitData {
    name: string;
    address: string;
    phoneNo: string;
    picture?: any;
    profileId?: string;
}

export interface IProps extends PropsFromRedux {
}
class Profile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            image: null,
            imageShow: null,
            nameP: "",
            address: "",
            phoneNo: "",
            profileEdit: false,
        };
    }
    componentDidMount() {
        const { getProfile } = this.props;
        getProfile().then((res: any) => {
            if (res.data.data && res.data.data.length > 0) {
                console.log("called")
                this.setState({
                    nameP: res.data.data[0].name,
                    address: res.data.data[0].address,
                    phoneNo: res.data.data[0].phoneNo,
                    profileEdit: true
                })
            } else {
                this.setState({ profileEdit: false })
            }
        })
    }

    componentWillUnmount() {
        this.props.resetgetProfile();
    }

    handleInputChange(event: any) {
        const value = event.target.value;
        const name = event.target.name;

        if (Object.keys(this.state).includes(name)) {
            this.setState({
                [name]: value
            } as Pick<IState, keyof IState>);
        }
    }

    updateProfile = () => {
        const { profileData, updateProfile, saveProfile } = this.props;
        let submitData: ISubmitData = {
            name: this.state.nameP,
            phoneNo: this.state.phoneNo,
            address: this.state.address,
        };
        if (this.state.image) {
            submitData.picture = this.state.image
        }
        if (profileData.data.length > 0) {
            submitData.profileId = profileData.data[0]._id
        }

        if (profileData.data.length > 0) {
            updateProfile(submitData).then((res: any) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    this.setState({
                        nameP: res.data.data.name,
                        address: res.data.data.address,
                        phoneNo: res.data.data.phoneNo,
                        profileEdit: true
                    })
                } else {
                    toast.error(res.data.message)
                }
            })
        } else {
            saveProfile(submitData).then((res: any) => {
                if (res.data.staus === 1) {
                    toast.success(res.data.message)
                    this.setState({
                        nameP: res.data.data[0].name,
                        address: res.data.data[0].address,
                        phoneNo: res.data.data[0].phoneNo,
                        profileEdit: true
                    })
                } else {
                    toast.error(res.data.message)
                }

            })
        }
    }

    render() {
        let userImage;
        const { profileData } = this.props;
        if (profileData.data && profileData.data.length > 0) {
            userImage = profileData.data[0].picture
        }

        return (
            <Fragment>
                <div className="contact-container cardContainer">
                    <div className="card">
                        <h6 className="heading--form mb-3">User Information</h6>
                        <div className="row">
                            <div className=" col-xl-3 col-lg-6 col-sm-5">
                                <div className="files--display">
                                    {(userImage || this.state.imageShow) ? this.state.imageShow ? <img src={this.state.imageShow} alt="" /> : <img src={`${process.env.REACT_APP_POSTING_ENDPOINT}${userImage}`} alt="" /> : <img src={UserImage} alt="" />}

                                    <input
                                        type="file"
                                        id="file1"
                                        name="image"
                                        onChange={(event: any) => {
                                            if (event.target.files[0]) {
                                                this.setState({
                                                    image: event.target.files[0],
                                                    imageShow: URL.createObjectURL(event.target.files[0])
                                                })
                                            } else {
                                                return false
                                            }
                                        }}
                                    />
                                    <label htmlFor="file1">Change your profile picture</label>
                                </div>
                                {this.state.image && ((this.state.image.size) / 1024 > 200 || !this.state.image.name.match(regex)) &&
                                    <span className="error"><i
                                        className="ic-error" />
                                        {((this.state.image.size) / 1024 > 200) &&
                                            <span>Restrict file size to 200Kb.</span>}
                                        {(!this.state.image.name.match(regex)) &&
                                            <span className="mb-2">Only .jpg, .jpeg and .png files are allowed.</span>}
                                    </span>
                                }
                            </div>

                            <div className="col-lg-6 col-xl-9">
                                <div className="text-right">
                                    <button onClick={() => { this.setState({ profileEdit: false }) }} className="btn btn-lg btn-success">
                                        <label className="ic-edit"></label>
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Name</label>
                                        <input
                                            className="form-control"
                                            value={this.state.nameP}
                                            name="nameP"
                                            onChange={(e) => this.handleInputChange(e)}
                                            disabled={this.state.profileEdit}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label>Phone Number</label>
                                        <input
                                            name="phoneNo"
                                            disabled={this.state.profileEdit}
                                            className="form-control"
                                            value={this.state.phoneNo}
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label>Address</label>
                                        <input
                                            name="address"
                                            value={this.state.address}
                                            disabled={this.state.profileEdit}
                                            className="form-control"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divider my-3"></div>
                        <div className="text-right ">
                            <button onClick={() => { this.setState({ profileEdit: true, image: null, imageShow: null }) }} className="btn text-secondary">Cancel</button>
                            <button
                                onClick={this.updateProfile}
                                className="btn btn-success ml-3"

                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    saveProfileData: state.profile.saveProfileData,
    profileData: state.profile.profileData,
    updateProfileData: state.profile.updateProfileData,
});

const mapDispatchToProps = {
    getProfile: getProfile,
    saveProfile: saveProfile,
    updateProfile: updateProfile,
    resetgetProfile: resetgetProfile,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profile);
