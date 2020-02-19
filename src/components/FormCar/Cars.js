import React, { Component } from 'react';
import { Button } from 'antd';


export default class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleClick = (car) => {
    this.setState({isLoading: true});
    const { deleteCar } = this.props;

    deleteCar(car).then(() => {
      this.setState({isLoading: false});
    }).catch(() => {
      this.setState({isLoading: false})
    });
  }

  render () {
    const { cars, setCarName, deleteCar, ...rest } = this.props
    const { isLoading } = this.state;
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
          <Button type="button" loading={isLoading} onClick={(event) => this.handleClick(car)}>
            Delete
          </Button>
        </li>
        ))}
      </div>
    )
  };
};
