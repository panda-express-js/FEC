import React, {useState, useEffect} from 'react';
import RelatedCard from './RelatedCard.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const RelatedCardsCarousel = ({avgRating, changeId, options,  product, server,  style, uniqueProductIds}) => {

  const [currentPosition, setCurrentPosition] = useState(0);
  const [productList, setProductList] = useState([]);
  //format data for each uniqueProductIds into an obj and add to state
  useEffect(() => {
    Promise.all(uniqueProductIds.map((id) => {
      return Promise.all([
        axios.get(`${server}/products/${id}`, options),
        axios.get(`${server}/products/${id}/styles`, options),
        axios.get(`${server}/reviews/meta/?product_id=${id}`, options)
      ])
      .then(([productResponse, stylesResponse, reviewsResponse]) => {
        var ratings = reviewsResponse.data.ratings;
        var totalRatings = 0;
        var totalStars = 0;
        for (var key in ratings) {
          totalRatings += parseInt(ratings[key]);
          totalStars += (parseInt(ratings[key]) * key);
        }
        var averageRating = totalStars / totalRatings;
        var stylesArray = stylesResponse.data.results;
        var defaultStyle = stylesArray.find((style) => style['default?']) || stylesArray[0];
        return {
          id: productResponse.data.id,
          name: productResponse.data.name,
          category: productResponse.data.category,
          default_price: productResponse.data.default_price,
          features: productResponse.data.features,
          photosArray: defaultStyle.photos,
          sale_price: defaultStyle.sale_price,
          stars: averageRating
        }
      })
      .catch((err) => {console.log(err)})
    }))
    .then((arrayOfDetails) => {
      setProductList(arrayOfDetails);
      setCurrentPosition(0)
    })
  }, [uniqueProductIds]);

  const rightArrow = () => {
    setCurrentPosition(currentPosition + 1);
  }

  const leftArrow = () => {
    setCurrentPosition(currentPosition - 1);
  }

  return (
    <div className='relatedCarousel' data-testid='relatedCarousel'>
    <div data-testid='carBtnContainerBack' className='carBtnContainer'>
      {currentPosition === 0 ? null: <FontAwesomeIcon data-testid='carBtnBack' className='carBtn' icon={faChevronLeft} onClick={() => {leftArrow()}}/>}
    </div>
    <div className='relatedCardsDiv' data-testid='relatedCardsDiv'>
      {productList.map((obj, index) => {
        if (index >= currentPosition && index <= currentPosition + 3) {
          return <RelatedCard key={obj.id} avgRating={avgRating} changeId={changeId} id={obj.id} obj={obj} product={product} style={style}/>
        } else {
          return null;
        }
      })}
    </div>
    <div data-testid='carBtnContainerNext' className='carBtnContainer'>
      {currentPosition >= uniqueProductIds.length - 4 ? null :<FontAwesomeIcon data-testid='carBtnNext' className='carBtn' icon={faChevronRight} onClick={() => {rightArrow()}}/>}
    </div>
    </div>
  )
}

export default RelatedCardsCarousel;