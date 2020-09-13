import React from "react";
import { RootState } from "store/reducers/rootReducer";
import { getAllPosts } from "store/reducers/modules/post/getAllPosts";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import "../layout.scss";
import "../cards.scss";
import { toast } from "react-toastify";
import Avatar from '../../assets/image/newUser.png';
import { addComment } from "store/reducers/modules/comment/addComment";
import { addChildComment } from "store/reducers/modules/comment/addChildComment";
import { getChildComments } from "store/reducers/modules/comment/getChildComments";


interface IState {
    searchString: string,
    newComment: string,
    indexForReply: number,
    indexForComment: number;
    newReply: string;
}

class HomePage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            newReply: "",
            searchString: "",
            newComment: "",
            indexForReply: 0,
            indexForComment: 0,
        };
    }

    componentDidMount() {
        console.log('Bipan')
        this.props.getAllPosts({ string: this.state.searchString });
    }

    handleClick = () => {
        const { getAllPosts } = this.props;
        getAllPosts({ string: this.state.searchString }).then((res: any) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        })
    }

    enterPressedReply = (event: any, parentId: string) => {
        const { addChildComment } = this.props;
        let code = event.keyCode || event.which;
        if (code === 13) {
            let submitData = {
                childComment: this.state.newReply,
                parentId: parentId
            }

            addChildComment(submitData)
                .then((res: any) => {
                    if (res.data.status === 1) {
                        toast.success(res.data.message)
                        this.setState({
                            newReply: ''
                        })
                        this.props.getAllPosts({
                            string: this.state.searchString
                        })
                    } else {
                        toast.error(res.data.message)
                    }
                })
        }
    }

    enterPressedComment = (event: any, postId: any) => {
        console.log(event)
        const { addComment } = this.props;
        let code = event.keyCode || event.which;
        if (code === 13) {
            let submitData = {
                text: this.state.newComment,
                postId: postId
            }

            addComment(submitData)
                .then((res: any) => {
                    if (res.data.status === 1) {
                        toast.success(res.data.message)
                        this.setState({
                            newComment: ''
                        })
                        this.props.getAllPosts({
                            string: this.state.searchString
                        })
                    } else {
                        toast.error(res.data.message)
                    }
                })
        }
    }

    setIndexReply = (index: number) => {
        this.setState({ indexForReply: index })
    }

    setIndexComment = (index: number) => {
        this.setState({ indexForComment: index, indexForReply: 0 })
    }

    render() {
        let {
            loginData,
            allPosts
        } = this.props;

        return (
            <div className="contact-container">
                <div className="d-flex flex-column flex-nowrap cardContainer">
                    <div className="row" style={{ width: "40%", margin: "auto" }}>
                        <div className="mt-2 ml-3 col-10">
                            <input
                                className="form-control"
                                value={this.state.searchString}
                                onChange={(e: any) => { this.setState({ searchString: e.target.value }) }}
                                placeholder="Search Posts"
                            />
                        </div>
                        <div className="col-1 mt-2">
                            <button
                                onClick={this.handleClick}
                                className="btn btn-primary"
                            >Search</button>
                        </div>
                    </div>

                    <ul>
                        {allPosts.status === 100 && <Spinner />}
                        {allPosts?.data?.length === 0 && <>
                            <div className="mt-4" style={{ textAlign: "center" }}>
                                <h6>No Posts Available</h6>
                            </div>
                        </>}
                        {allPosts.data && allPosts.data.map((post: any, index: number) => {
                            return (
                                <li style={{ listStyle: "none" }}>
                                    <div className="card card--post mt-3 mb-2">
                                        <div className="d-inline-flex">
                                            <div className='imgcomposition mr-2'>
                                                <img src={Avatar} className='user--image' alt={"User"} />
                                            </div>

                                            <div className="comment">
                                                <h6>
                                                    {post.user.username},   <span>{post.createdAt ? (new Date(post.createdAt).toDateString()) : '-'}</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <p className="ml-4">{post.content}</p>

                                        {!(this.state.indexForComment === index) && loginData.data && <span className="ml-4 text-primary" onClick={() => this.setIndexComment(index)} style={{ cursor: 'pointer' }} >Comment</span>}

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

                                                                {(!(this.state.indexForReply === indexc) && this.state.indexForComment === index) && loginData.data && <span className="mr-2 text-primary" onClick={() => this.setIndexReply(indexc)} style={{ cursor: 'pointer' }} >Reply</span>}

                                                                {(comment.childComments.length > 0 || this.state.indexForReply === indexc) &&
                                                                    <>
                                                                        <ul className='ml-3 mt-2 commentList' id='commentSection'>
                                                                            {comment.childComments.map((childComment: any) => {
                                                                                return (
                                                                                    <li className="mb-2" key={indexc}>
                                                                                        <div className='imgcomposition'>
                                                                                            <img src={Avatar} className='user--image' alt={childComment.user.username} />
                                                                                        </div>

                                                                                        <div className='comment'>
                                                                                            <h6>
                                                                                                {childComment.user.username}<span>{childComment.createdAt && (new Date(comment.createdAt).toDateString())} </span>
                                                                                            </h6>
                                                                                            <p className="mb-2">
                                                                                                {
                                                                                                    childComment.text
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                )

                                                                            })}
                                                                        </ul>
                                                                        {loginData.data && this.state.indexForReply === indexc && this.state.indexForComment === index && <div className='form-group form-group-image mt-2'>
                                                                            <img src={Avatar} alt='Commentor' />
                                                                            <input
                                                                                value={this.state.newReply}
                                                                                name='newReply'
                                                                                id='newReply'
                                                                                placeholder='Add a Reply'
                                                                                className='form-control'
                                                                                onChange={(e: any) => { this.setState({ newReply: e.target.value }) }}
                                                                                onKeyPress={(event) => this.enterPressedReply(event, comment._id)}
                                                                            />
                                                                        </div>}
                                                                    </>
                                                                }
                                                                {/* {comment.childComments.length > 0 && <span className="mr-2 text-primary" style={{ cursor: 'pointer' }} onClick={() => this.fetchReplies(comment._id)}>Replies<i className="ic-arrow-down ml-1" style={{ fontSize: '0.5rem' }}></i></span>} */}
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            {loginData.data && this.state.indexForComment === index && <div className='form-group form-group-image mt-2'>
                                                <img src={Avatar} alt='Commentor' />
                                                <input
                                                    value={this.state.newComment}
                                                    name='newComment'
                                                    id='newComment'
                                                    placeholder='Add a comment'
                                                    className='form-control'
                                                    onChange={(e: any) => { this.setState({ newComment: e.target.value }) }}
                                                    onKeyPress={(event) => this.enterPressedComment(event, post._id)}
                                                />
                                            </div>}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    loginData: state.auth.login,
    allPosts: state.post.allPosts,
    addCommentData: state.comment.addCommentData,
    addChildCommentData: state.comment.addChildCommentData,
    childComments: state.comment.childComments,
});

const mapDispatchToProps = {
    getAllPosts: getAllPosts,
    addChildComment: addChildComment,
    getChildComments: getChildComments,
    addComment: addComment,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
