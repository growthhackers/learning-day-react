import React from 'react';
import ErrorFormCar from '../FormCar/ErrorFormCar';

export default class FormCar extends React.Component {

  constructor(props){
    super(props);
    this.state = {name:''};
  }

  onSubmitRender = (event) => {
    event.preventDefault();
    const {addCar} = this.props;
    const {name} = this.state;
    addCar(name);
    this.setState({name: ""});
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
    const {name} = this.state;
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

        <button type="submit" disabled={!this.isCarSubmittable()}>
          Submit
        </button>
      </form>

    );
  };
};
