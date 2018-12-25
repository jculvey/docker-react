import React from "react";
import axios from "axios";

export default class Fib extends React.Component {
  state = {
    seenIndices: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndices();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({
      values: values.data
    });
  }

  async fetchIndices() {
    const seenIndices = await axios.get("/api/values/all");
    this.setState({
      seenIndices: seenIndices.data
    });
  }

  renderSeenIndices() {
    const things = this.state.seenIndices
      .map(({ number }) => number)
      .join(", ");
    return things;
  }

  // calculates stuff
  renderCalculatedValues() {
    return Object.keys(this.state.values).map(key => (
      <div key={key}>
        For index {key} I calculated {this.state.values[key]}
      </div>
    ));
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    axios.post(`/api/values`, {
      index: this.state.index
    });
    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter a number:</label>
          <input
            value={this.state.index}
            onChange={evt => this.setState({ index: evt.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indices I've seen</h3>
        {this.renderSeenIndices()}

        <h3>Calculated Values</h3>
        {this.renderCalculatedValues()}
      </div>
    );
  }
}
