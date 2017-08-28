import React, { Component } from 'react';
import { connect } from 'react-redux';

import Information from './information';

class Debugger extends Component {
  renderServer(){
    let { Data = {} } = this.props.store;
    return (
      <Information title="Server Information"
        list={Object.keys(Data).map((v,k)=>({ title: v, value: Data[v] }))}
        />
      );
  }
  render() {
    return (
      <section>
        Debugger
        { this.renderServer() }
      </section>
    )
  }
}

export default connect(
  store => ({ store })
)(Debugger);
