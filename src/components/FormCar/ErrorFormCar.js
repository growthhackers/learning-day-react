import React from 'react';
import { Alert } from 'antd';

export default class ErrorFormCar extends React.Component {

  constructor(props){
    super(props);
  }

  displayError = () => {
    const {name, isCarSubmittable} = this.props;

    return !!name && !isCarSubmittable;
  }

  render(){
    return (
      <div>
        { this.displayError() ? <Alert message="Error Text" type="error" /> : '' }
      </div>
    )
  }
}
