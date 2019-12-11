import React, { Component } from 'react';
import logo from './logo.svg';
import { Row, Col, Layout} from "antd";
import FormCar from "./components/FormCar";
import Cars from "./components/FormCar/Cars";
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: ["Escort", "Monza"]
    };
  };

  addCar = (carName) => {
    const {cars} = this.state;
    this.setState({
      cars:[...cars, carName]
    });
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
                  <Cars cars={cars}/>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
    );
  }
}

export default App;
