import React, { Fragment } from "react";

interface IState {
}
export interface IProps {
    deleteHandler: any;
    editHandler: any;
    postId: string;
    editContent: string
}

class DropDown extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { deleteHandler, editHandler, postId, editContent } = this.props;

        return (
            <Fragment>
                <span
                    className="ic-more ml-5"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                ></span>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div
                        className="dropdown-item text-center p-2"
                        onClick={() => deleteHandler(postId)}
                    >
                        Delete
                    </div>

                    <div
                        className="dropdown-item text-center p-2"
                        onClick={() => editHandler(postId, editContent)}
                    >
                        Edit
                    </div>
                </div>
            </Fragment>
        )
    }
}



export default DropDown;
