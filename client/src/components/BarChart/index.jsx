import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import NavigationButton from "../NavigationButton";
import {Link} from "react-router-dom"
import "./style.css"


function LeaderChart(props){
  const state = {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: 'rebeccapurple',
        data: props.data,
        label: 'Top Score'
      }
    ]
  } 
  return (
    <div id="leaderboardWrapper">

     <Link to="/" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="leaderboardbackbtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
      <HorizontalBar
        data={state}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title:{
            display:true,
            text:'Trivia-Mac Current Leaderboard',
            fontSize: 10
          },
          legend:{
            
            position:'top',
            fontSize: 10
          }
        }}
      />

    </div>
  );
}

export default LeaderChart;