import React from 'react';


export default class FormCar extends React.Component {

  constructor(props){
    super(props);
    this.ref = React.createRef();
  }

  onSubmitRender = (event) => {
    event.preventDefault();
    const {addCar} = this.props;
    addCar(this.ref.current.value);
    this.ref.current.value = "";

  }

  render() {
    return (
      <form onSubmit={ this.onSubmitRender }>
        <p>Enter car name:</p>
        <input
          ref={this.ref}
          type='text'
          name='name'
        />
        <button type="submit">
          Submit
        </button>
      </form>

    );
  }
}
