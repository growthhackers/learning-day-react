import React, { Component } from 'react';


export default class Cars extends React.Component {
  render () {
    const { cars } = this.props
    return(
      <div>
        {cars.map((car,index) => <li key={car+index}>{car}</li>)}
      </div>
    )
  };
};
