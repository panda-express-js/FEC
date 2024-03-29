import React , { useState, useEffect } from 'react';
import axios from 'axios';

//  Rating Helpfulness - Any user on the site will have the ability to provide feedback on whether reviews are helpful.
//  At the bottom of the review the text “Was this review helpful?” will precede two links “Yes (#)” and “No (#)”.
//  Following “Yes” and “No” will be the count of users that have selected that button.
//  Clicking either link should cast a vote for that selection.
//  A user on the site does not need to be logged in to provide feedback on helpfulness.
//  A user can provide feedback on any review. However, they can only make one submission for each review.
//  If the user selects either “Yes” or “No” for a review, they should not be able to select another option again for that review.

export default function Helpful ({ helpful, setHelpful, updateHelpfulAPI, reviewID }) {

  const [hasClicked, setHasClicked] = useState(false);

  function clickHandler (event) {
    event.preventDefault();

    let button = event.target.innerHTML


    if (!hasClicked) {
      setHasClicked(true)
      if (button.includes('Yes')) {
        let newHelpful = helpful + 1
      setHelpful(newHelpful);
      updateHelpfulAPI(reviewID)
      }
    }
  }


  return <span className="helpful-box">
    <span>Was this review helpful? </span>
    <a href='#' id ="helpful-link" className="helpful-link" onClick={clickHandler}>Yes</a>
    <a href='#' id ="helpful-link" className="helpful-link" onClick={clickHandler}>No</a>
    <span> {helpful} people found this helpful</span>
  </span>
}