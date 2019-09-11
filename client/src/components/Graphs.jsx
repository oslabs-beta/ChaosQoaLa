import React, { Component } from "react";
import "./App.css";
// import resultsData from './results';
import SteadyStateChart from "./SteadyStateChart.jsx";
import ChaosFlagChart from "./ChaosFlagChart.jsx";

const chaosResults = resultsData.chaosResults;
const agentData = resultsData.agentData;
const chaosTimes = chaosResults.map(function(element) {
  return element["timeOfResult"];  
});
const chaosData = chaosResults.map(function(element) {
  return element["result"];
});
const agentTimes = agentData.map(function(element) {
  return element["timeOfResponse"];
});
const chaosFlags = agentData.map(function(element) {
  return element["chaosResponse"];
});


class Graphs extends Component {
  constructor() {
    super();
    this.state = {
      steadyStateChartData: {},
      chaosFlagChartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here, for example, pulling data from an API
    this.setState({
      steadyStateChartData: {
        labels: chaosTimes,
        datasets: [
          {
            label: "Latency",
            data: chaosData,
            fill: false
          }
        ]
      },
      chaosFlagChartData: {
        labels: agentTimes,
        datasets: [
          {
            label: "Chaos Instances",
            data: chaosFlags,
            backgroundColor: "red",
            fill: false
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h2>ChaosQoaLa Experiment Results</h2>
        <SteadyStateChart
          steadyStateChartData={this.state.steadyStateChartData}
          legendPosition="bottom"
        />
        <ChaosFlagChart 
        chaosFlagChartData={this.state.chaosFlagChartData}
        legendPosition="bottom"
        />
      </div>
    );
  }
}

export default Graphs;