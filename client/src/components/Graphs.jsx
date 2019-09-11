import React, { Component } from 'react';
import SteadyStateChart from './SteadyStateChart.jsx';
import ChaosFlagChart from './ChaosFlagChart.jsx';

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steadyStateChartData: {},
      chaosFlagChartData: {}
    };
  }

  // componentWillMount() {
  //   this.getChartData();
  // }


  render() {
    const steadyStateChartConfig = {
      labels: this.props.data.chaosTimes,
      datasets: [
        {
          label: "Latency",
          data: this.props.data.chaosData,
          fill: false,
          borderColor: "red",
          backgroundColor: "blue"
        }
      ]
    };
    const chaosFlagChartConfig = {
      labels: this.props.data.agentTimes,
      datasets: [
        {
          label: "Chaos Instances",
          data: this.props.data.agentFlags,
          backgroundColor: "red",
          fill: false
        }
      ]
    }; 
    console.log('props',  this.props);
    return (
      <div className="App">
        <h2>ChaosQoaLa Experiment Results</h2>
        <SteadyStateChart
          steadyStateChartData={steadyStateChartConfig}
          legendPosition="bottom"
        />
        <ChaosFlagChart 
        chaosFlagChartData={chaosFlagChartConfig}
        legendPosition="bottom"
        />
      </div>
    );
  }
}

export default Graphs;