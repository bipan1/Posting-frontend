import React, { Fragment } from "react";
import { RootState } from "store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { IDefaultReducerObject } from "types/reduxTypes";
import DashboardHome from "./Home";

interface IState {
  isSuperAdmin: Array<string>;
}
export interface IProps {
  privilege: IDefaultReducerObject;
  history: object;
}
class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSuperAdmin: [],
    };
  }
  componentDidMount() {

  }

  render() {

    return (
      <Fragment>
        <DashboardHome />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default Home;
