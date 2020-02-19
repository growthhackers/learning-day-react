import React from 'react';
import { Button } from 'antd';
import ErrorFormCar from '../FormCar/ErrorFormCar';

export default class FormCar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name:'',
      isLoading: false
    };
  }

  onSubmitRender = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const {addCar} = this.props;
    const {name} = this.state;
    addCar(name).then(() => {
      this.setState({
        isLoading: false,
        name: "",
      });
    });
  }

  isCarSubmittable = () => {
    const {cars} = this.props;
    const {name} = this.state;

    if (!name){
      return false;
    }

    return !cars.find((car) => car.name === name);
  }

  onChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  render() {
    const {name, isLoading} = this.state;
    return (
      <form onSubmit={ this.onSubmitRender }>
        <p>Enter car name:</p>
        <input
          onChange={this.onChangeName}
          value={name}
          type='text'
          name='name'
        />

        <ErrorFormCar isCarSubmittable={this.isCarSubmittable()} name={name}/>

        <Button loading={isLoading} onClick={this.onSubmitRender} disabled={!this.isCarSubmittable()}>
          Submit
        </Button>
      </form>

    );
  };
};
