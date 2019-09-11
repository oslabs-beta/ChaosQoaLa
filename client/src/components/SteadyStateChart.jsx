import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class SteadyStateChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      steadyStateChartData: props.steadyStateChartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.steadyStateChartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Steady State Results",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
  
}

export default SteadyStateChart;