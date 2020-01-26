import React from 'react';
import {Bar} from 'react-chartjs-2';


function LeaderChart(props){
  const state = {
    labels: props.labels,
    datasets: [
      {
        label: 'Top Score',
        backgroundColor: '#23b8d9',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        data: props.data
      }
    ]
  } 
  return (
    <div>
      <Bar
        data={state}
        options={{
          title:{
            display:true,
            text:'Trivia-Mac Current Leaderboard',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  );
}

export default LeaderChart;