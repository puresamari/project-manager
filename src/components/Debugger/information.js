import React, { Component } from 'react';

class List extends Component {
  stringifyValue(value){
    switch(typeof value) {
      case 'object':
        return JSON.stringify(value);
      case 'number':
      case 'string':
        return value;

      default:
        return 'unknown type';
    }
  }
  renderListItem(title, value){
    return <li key={title}>{ title }: { this.stringifyValue(value) }</li>;
  }
  render(){
    let { list } = this.props;
    return (
      <ul>
        { list.map(({ title, value })=>this.renderListItem(title, value)) }
      </ul>
    )
  }
}

class Information extends Component {
  renderTitle(){
    let { title } = this.props;
    return <figcaption>{ title }</figcaption>;
  }
  render() {
    let { list } = this.props;
    return (
      <figure>
        { this.renderTitle() }
        { list && list.length > 0 && <List list={list}/> }
      </figure>
    );
  }
}

export default Information;
