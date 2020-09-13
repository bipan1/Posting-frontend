import React, { Fragment } from "react";
import { RootState } from "store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { IDefaultReducerObject } from "types/reduxTypes";
import { getOwnPosts } from "store/reducers/modules/post/getOwnPosts";
import { savePost } from "store/reducers/modules/post/savePost";
import { deletePost } from "store/reducers/modules/post/deletePost";
import { updatePost } from "store/reducers/modules/post/updatePost";
import "../../layout.scss";
import Spinner from "../../../components/Spinner/Spinner";
import Avatar from '../../../assets/image/newUser.png';
import { toast } from "react-toastify";
import DropDown from "./DropDown";


interface IState {
    newPost: string;
    editId: string;
    editContent: string;
    editFlag: boolean;
}
export interface IProps extends PropsFromRedux {
    privilege: IDefaultReducerObject;
    history: object;
}
class OwnPosts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            newPost: "",
            editId: "",
            editContent: "",
            editFlag: false,
        };
    }
    componentDidMount() {
        this.props.getOwnPosts();
    }

    createPost = () => {
        const { savePost } = this.props;
        savePost({ content: this.state.newPost }).then((res: any) => {
            if (res.data.status === 1) {
                toast.success(res.data.message);
                this.props.getOwnPosts();
                this.setState({
                    newPost: ""
                })
            } else {
                toast.error(res.data.message)
            }
        })
    }

    deleteHandler = (postId: string) => {
        const { deletePost, getOwnPosts } = this.props;
        deletePost({ postId }).then((res: any) => {
            if (res.data.status === 1) {
                toast.success(res.data.message);
                getOwnPosts();
            } else {
                toast.error(res.data.message);
            }
        })
    }

    doUpdate = () => {
        const { updatePost, getOwnPosts } = this.props;
        const { editId, editContent } = this.state;
        updatePost({ postId: editId, content: editContent }).then((res: any) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                this.setState({
                    editId: "",
                    editContent: "",
                    editFlag: false,
                })
                getOwnPosts();
            }
        })
    }

    editHandler = (postId: string, editContent: string) => {
        this.setState({
            editId: postId,
            editFlag: true,
            editContent: editContent
        })
    }

    render() {
        const { ownPosts, savePostData, updatePostData } = this.props;

        return (
            <Fragment>
                <div className="contact-container">
                    <div className="d-flex flex-column flex-nowrap cardContainer">
                        <div className="row" style={{ width: "90%", margin: "auto" }}>
                            <div className="card card--create mt-2">
                                <textarea
                                    rows={4}
                                    className="form-control"
                                    value={this.state.newPost}
                                    onChange={(e: any) => { this.setState({ newPost: e.target.value }) }}
                                    placeholder="What's On Your Mind"
                                />
                                <div className="text-right mt-3">
                                    <button
                                        onClick={this.createPost}
                                        className="btn btn-primary"
                                        disabled={savePostData.status === 100}
                                    >
                                        {savePostData.status === 100 ? (
                                            <div>
                                                <Spinner />
                                            </div>
                                        ) : (
                                                'Post'
                                            )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ul>
                            {ownPosts.status === 100 && <Spinner />}
                            {ownPosts.data && ownPosts.data.map((post: any) => {
                                return (
                                    <li style={{ listStyle: "none" }}>
                                        <div className="card card--post mt-3 mb-2">
                                            <div className="d-inline-flex">
                                                <div className='imgcomposition mr-2'>
                                                    <img src={Avatar} className='user--image' alt="User" />
                                                </div>

                                                <div className="comment">
                                                    <h6>
                                                        {post.user.username},   <span>{post.createdAt ? (new Date(post.createdAt).toDateString()) : '-'}</span>
                                                    </h6>
                                                </div>
                                                <DropDown
                                                    deleteHandler={this.deleteHandler}
                                                    editHandler={this.editHandler}
                                                    postId={post._id}
                                                    editContent={post.content}
                                                />
                                            </div>
                                            {(this.state.editFlag && this.state.editId === post._id) ?

                                                <>
                                                    <textarea
                                                        rows={2}
                                                        className="form-control"
                                                        value={this.state.editContent}
                                                        onChange={(e: any) => { this.setState({ editContent: e.target.value }) }}
                                                    />
                                                    <div className="text-right mt-2">
                                                        <button
                                                            className="mr-2 btn btn-sm btn-secondary"
                                                            onClick={() => { this.setState({ editFlag: false, editContent: "", editId: "" }) }}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => this.doUpdate()}
                                                            className="btn btn-sm btn-success"
                                                            disabled={updatePostData.status === 100}
                                                        >
                                                            {updatePostData.status === 100 ? (
                                                                <div>
                                                                    <Spinner />
                                                                </div>
                                                            ) : (
                                                                    'Update'
                                                                )}
                                                        </button>
                                                    </div>
                                                </>
                                                :
                                                <p className="ml-4">{post.content}</p>

                                            }
                                            <div className="divider mt-2 mb-2"></div>
                                            <div>
                                                <ul className='ml-4 commentList' id='commentSection'>
                                                    {
                                                        post.comments.length >= 1 &&
                                                        post.comments.map((comment: any, indexc: number) => (
                                                            <li className="mb-2" key={indexc}>
                                                                <div className='imgcomposition'>
                                                                    <img src={Avatar} className='user--image' alt={comment.user.username} />
                                                                </div>
                                                                <div className='comment'>
                                                                    <h6>
                                                                        {comment.user.username}<span>{comment.createdAt && (new Date(comment.createdAt).toDateString())} </span>
                                                                    </h6>
                                                                    <p className="mb-2">
                                                                        {
                                                                            comment.text
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    ownPosts: state.post.ownPosts,
    savePostData: state.post.savePostData,
    deletePostData: state.post.deletePostData,
    updatePostData: state.post.updatePostData
});

const mapDispatchToProps = {
    getOwnPosts: getOwnPosts,
    savePost: savePost,
    deletePost: deletePost,
    updatePost: updatePost,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OwnPosts);
