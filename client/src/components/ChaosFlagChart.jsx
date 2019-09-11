import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class ChaosFlagChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chaosFlagChartData: props.chaosFlagChartData
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
        <Bar
          data={this.state.chaosFlagChartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Chaos Flag Results",
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

export default ChaosFlagChart;