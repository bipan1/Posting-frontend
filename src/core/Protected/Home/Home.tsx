import React, { Fragment } from "react";
import { RootState } from "store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import HomePage from "core/Public/HomePage";

interface IState {
  rowValue: { [key: string]: Array<number> };
  selectedRowCol: { [key: string]: string | number };
}

class DashboardHome extends React.Component<PropsFromRedux, IState> {
  componentDidMount() {
  }

  render() {

    return (
      <Fragment>
        <HomePage />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DashboardHome);
