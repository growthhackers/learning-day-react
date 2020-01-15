import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col, Layout, Spin } from "antd";
import FormCar from "./components/FormCar";
import Cars from "./components/FormCar/Cars";
import './App.css';
import axios from 'axios';

const apiURL = 'https://crudcrud.com/api/3569e3d2bd154309b58f249521b11a82/cars';

const axiosGet = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

const axiosPost = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

const axiosDelete = (url, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/${id}/`)
      .then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: null,
    };
  };

  componentDidMount() {
    axiosGet(apiURL)
      .then((cars) => {
        this.setState({cars});
      },
      (error) => {
        console.log('Error message: ' + error);
      });
  }

  addCar = (carName) => {
    const {cars} = this.state;
    axiosPost(apiURL, { name: carName })
      .then(
        (newCar) => {
          this.setState({
            cars: [...cars, newCar],
          });
        },
        (error) => {
          console.log('Error message: ' + error);
        }
      )
  };

  setCarName = (carToChange, carName) => {
    const {cars} = this.state;
    this.setState({
      cars: cars.map((car) => ({
          id: car.id,
          name: car.id === carToChange.id ? carName : car.name
        })
      )
    });
  };

  deleteCar = (carToChange) => {
    const {cars} = this.state;
    axiosDelete(apiURL, carToChange._id)
      .then(
        () => {
          this.setState({
            cars: cars.filter((car) => car._id !== carToChange._id)
          });
        },
        (error) => {
          console.log('Error message: ' + error);
        }
      )
  };

  render() {
    const { cars } = this.state
    return (
        <Layout>
          <img src={logo} className="App-logo" alt="logo" />
          <Layout.Header>
            <h2 style={{ color: "white", textAlign: "center", marginBottom: 30 }}>
              Cars
            </h2>
          </Layout.Header>
          <Layout.Content>
            <Row type="flex" justify="center">
                <FormCar addCar={this.addCar}/>
            </Row>
            <Row type="flex" justify="center">
              <Col className="gutter-row" span={24}>
                  {cars ? <Cars cars={cars} setCarName={this.setCarName} deleteCar={this.deleteCar}/> : <Spin /> }
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
    );
  }
}

export default App;
