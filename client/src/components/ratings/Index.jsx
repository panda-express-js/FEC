import React from 'react';
import StarDisplay from './star_rating/Star_Display.jsx'
import ReviewList from './ReviewList.jsx'

export default function RatingsReviews ({ server, options, product, reviews, setReviews }) {

  return (
  <div id="Ratings & Reviews">
    <h2>Ratings & Reviews</h2>
    <ReviewList reviews={reviews} product={product} server={server} options={options} setReviews={setReviews}/>
    <br></br>
    <>Star rating test</>
    <br></br>
    <StarDisplay rating={4.5}/>
  </div>
)
}