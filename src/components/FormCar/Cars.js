import React, { Component } from 'react';


export default class Cars extends Component {
  render () {
    const { cars, setCarName, deleteCar, ...rest } = this.props
    return(
      <div>
        {cars.map((car,index) => (
        <li key={car._id}>
          <input
            id={car._id}
            type='text'
            name='carName'
            value={car.name}
            onChange={(event) => setCarName(car, event.target.value)}
          />
          <button type="button" onClick={(event) => deleteCar(car)}>
            Delete
          </button>
        </li>
        ))}
      </div>
    )
  };
};
