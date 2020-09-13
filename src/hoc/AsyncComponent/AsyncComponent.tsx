import React from "react";
import AsyncSpinner from "./AsyncSpinner";
import { GeneralComponent } from "../../types/generalTypes";

interface IState {
  component: null | GeneralComponent;
}
export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<{}, IState> {
    constructor(props: {}) {
      super(props);
      this.state = { component: null };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component: component });
    }

    render() {
      let C = this.state.component;
      return C ? <C {...this.props} /> : <AsyncSpinner />;
    }
  }

  return AsyncComponent;
}
