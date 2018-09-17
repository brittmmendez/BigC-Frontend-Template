import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import "../static/App.css";

export default class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      email: ""
    });
    alert(this.state.email + " Has been signed up to receive Newsletters!")
  }

  render() {
    return (
      <div className="Newsletter">
        <h5 className="Newsletter">JOIN THE COMMUNITY</h5>
        <p>You deserve a body (and inbox) that’s healthy and well-loved.</p>
        <Form inline onSubmit={this.handleSubmit}>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="ENTER YOUR EMAIL"
            onChange={this.handleChange}
          />
          <Button disabled={!this.validateForm()} type="submit">></Button>
        </Form>
      </div>
    );
  }
}