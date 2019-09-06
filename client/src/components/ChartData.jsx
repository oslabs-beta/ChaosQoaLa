import React, { Component } from "react";
import "./App.css";
import Chart from "./Chart.jsx";

class ChartData extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here, for example, pulling data from an API
    this.setState({
      chartData: {
        labels: [
          "Boston1",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "blue",
              "pink",
              "green",
              "orange",
              "purple",
              "yellow"
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Welcome To React</h2>
        <Chart
          chartData={this.state.chartData}
          location="Massachusetts"
          legendPosition="bottom"
        />
      </div>
    );
  }
}

export default ChartData;
