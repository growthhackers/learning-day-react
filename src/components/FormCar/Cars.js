import React, { Component } from "react";

import { Car } from "./../Car";

export default class Cars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cars, deleteCar, updateCar } = this.props;

    return (
      <div>
        {cars.map((car, index) => (
          <Car
            key={car._id}
            name={car.name}
            _id={car._id}
            onDelete={deleteCar}
            onUpdate={updateCar}
          />
        ))}
      </div>
    );
  }
}
