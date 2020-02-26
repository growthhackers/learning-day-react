import React, { Component } from "react";
import logo from "./logo.svg";
import { Row, Col, Layout, Spin } from "antd";
import FormCar from "./components/FormCar";
import Cars from "./components/FormCar/Cars";
import "./App.css";
import axios from "axios";

const apiURL = "https://crudcrud.com/api/67e7d97d03bc4fe5bcdbd946943c6414/cars";

const axiosGet = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

const axiosPost = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

const axiosPut = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, payload)
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

const axiosDelete = (url, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/${id}/`)
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: null
    };
  }

  componentDidMount() {
    axiosGet(apiURL).then(
      cars => {
        this.setState({ cars });
      },
      error => {
        console.log("Error message: " + error);
      }
    );
  }

  addCar = carName => {
    const { cars } = this.state;

    return new Promise((resolve, reject) => {
      axiosPost(apiURL, { name: carName }).then(
        newCar => {
          this.setState({
            cars: [...cars, newCar]
          });

          resolve();
        },
        error => {
          console.log("Error message: " + error);
          reject();
        }
      );
    });
  };

  updateCar = (idToChange, updatedName) => {
    const { cars } = this.state;

    return axiosPut(`${apiURL}/${idToChange}`, {
      name: updatedName
    })
      .then(() => {
        this.setState({
          cars: cars.map(car => ({
            _id: car._id,
            name: car._id === idToChange ? updatedName : car.name
          }))
        });
      })
      .catch(error => {
        console.log("Error message: " + error);
      });
  };

  deleteCar = idToDelete => {
    const { cars } = this.state;

    return axiosDelete(apiURL, idToDelete).then(
      () => {
        this.setState({
          cars: cars.filter(car => car._id !== idToDelete)
        });
      },
      error => {
        console.log("Error message: " + error);
      }
    );
  };

  render() {
    const { cars } = this.state;

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
            <FormCar addCar={this.addCar} cars={cars} />
          </Row>
          <Row type="flex" justify="center">
            <Col className="gutter-row" span={24}>
              {cars ? (
                <Cars
                  cars={cars}
                  deleteCar={this.deleteCar}
                  updateCar={this.updateCar}
                />
              ) : (
                <Spin />
              )}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
