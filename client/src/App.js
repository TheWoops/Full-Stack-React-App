import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col,
  Jumbotron,
  Button,
  InputGroup,
  Input,
  FormGroup,
  InputGroupAddon,
} from "reactstrap";

import Weather from "./Weather";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      citylist: [],
      newCityName: "",
    };
  }

  getCityList = () => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((res) => {
        var citylist = res.map((r) => r.city_name);
        this.setState({ citylist });
      });
  };

  componentDidMount() {
    this.getCityList();
  }

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    console.log("FrontEnd adds City: " + this.state.newCityName);
    fetch("/api/cities", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ city: this.state.newCityName }),
    })
      .then((res) => res.json()) // we want the response in json format
      .then((res) => {
        this.getCityList();
        this.setState({ newCityName: "" });
      });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
      .then((res) => res.json())
      .then((weather) => {
        console.log(weather);
        this.setState({ weather });
      });
  };

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Weather App</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron className="centered">
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">
                This app enables you to get weather information about your
                favorite cities.
              </p>
              <hr className="my-2" />

              <InputGroup>
                <Input
                  placeholder="Enter new city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>
                    Add Weather
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <div className="centered">
          <h1 className="display-5">Current Weather </h1>
          <FormGroup>
            <Input type="select" onChange={this.handleChangeCity}>
              {this.state.citylist.length === 0 && (
                <option>No cities added yet.</option>
              )}
              {this.state.citylist.length > 1 && (
                <option>Select a city.</option>
              )}
              {this.state.citylist.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </Input>
          </FormGroup>
        </div>
        <Weather data={this.state.weather} />
      </div>
    );
  }
}

export default App;
