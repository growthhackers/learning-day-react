import React from 'react';


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

  isCarSubmitable = () => {
    const {cars} = this.props;
    const {name} = this.state;
    if (!cars || !name){
      return true;
    }
    return !!cars.find((car) => car.name === name);
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
        <button type="submit" disabled={this.isCarSubmitable()}>
          Submit
        </button>
      </form>

    );
  }
}
