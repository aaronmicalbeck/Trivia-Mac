import React from 'react';
import {Bar, HorizontalBar} from 'react-chartjs-2';
import NavigationButton from "../NavigationButton";
import {Link} from "react-router-dom"
import "./style.css"


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

     <Link to="/" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="leaderboardbackbtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
      <Bar
        
        data={state}
        options={{
          maintainAspectRatio: true,
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