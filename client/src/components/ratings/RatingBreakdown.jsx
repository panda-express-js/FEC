import React , { useState, useEffect } from 'react';
import StarDisplay from './star_rating/Star_Display.jsx'
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// refactor the chart to a separate component in the future

const HorizontalBarChart = ({ratings}) => {

  let dataArray = []

  dataArray[0] = Number(ratings['1'])
  dataArray[1] = Number(ratings['2'])
  dataArray[2] = Number(ratings['3'])
  dataArray[3] = Number(ratings['4'])
  dataArray[4] = Number(ratings['5'])


  const data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label:'Ratings',
        data: dataArray,
        backgroundColor: '#f80',
      }
    ]
  }
  const options = {
    indexAxis:  'y',
    layout: {
      padding: '2rem'
    },
    responsive: true,
    maintainAspectRatio: false
  };


  return (
    <div>

      <Bar data={data} options={options}></Bar>
    </div>
  )
}

// get the average rating to the nearest quarter just like
// in the star display to be able to show the number properly
// on the breakdown

function nearestQuarter (num) {
  if ((num - Math.floor(num)) > 0) {
    let remainder = num - Math.floor(num);

    if (remainder < .25) {
      return Math.floor(num);
    } else if ((remainder >= .25) && (remainder < .5)) {
      num = Math.floor(num) + .25;
      return num;
    } else if ((remainder >= .5) && (remainder < .75)) {
      num = Math.floor(num) + .5;
      return num;
    } else if ((remainder >= .75) && (remainder <= .99)) {
      num = Math.floor(num) + .75;
      return num;
    }
  } else {
    return num;
  }

}


export default function RatingBreakdown ({ reviewMeta, ratingFilter, setRatingFilter, avgRating }) {

  let currRating = nearestQuarter(avgRating);



  return <div className="Rating Breakdown">
    <span className="rating_breakdown_text">Average Rating </span>
    <span className="rating_breakdown_number">{currRating}</span>
    <StarDisplay rating={avgRating} />
    <div className="chartContainer">
    <HorizontalBarChart ratings={reviewMeta.ratings}/>
    </div>
  </div>
}