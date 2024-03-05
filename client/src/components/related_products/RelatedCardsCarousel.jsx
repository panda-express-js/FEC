import React, {useState, useEffect} from 'react'
import RelatedCard from './RelatedCard.jsx'
import axios from 'axios'
const RelatedCardsCarousel = ({uniqueProductIds, server, options, changeId}) => {

  const [currentPosition, setCurrentPosition] = useState(0);
  const [productList, setProductList] = useState([])

  useEffect(() => {
    Promise.all(uniqueProductIds.map((id) => {
      return axios.get(`${server}/products/${id}`, options)
      .then((productResponse) => {
        return axios.get(`${server}/products/${id}/styles`, options)
        .then((stylesResponse) => {
          return {
            id: id,
            name: productResponse.data.name,
            category: productResponse.data.category,
            default_price: productResponse.data.default_price,
            url: stylesResponse.data.results[0].photos[0].url,
            sale_price: stylesResponse.data.results[0].sale_price
        }})
      })
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
    <div style={{ display: 'flex' }}>
    <div>{currentPosition === 0 ? null: <button onClick={() => {leftArrow()}}>{'<'}</button>}</div>
    <div style={{ display: 'flex' }}>
      {productList.map((obj, index) => {
        if (index >= currentPosition && index <= currentPosition + 3) {
          return <RelatedCard key={obj.id} id={obj.id} obj={obj} changeId={changeId}/>
        } else {
          return null;
        }
      })}
    </div>
    <div>{currentPosition === uniqueProductIds.length - 4 ? null :<button onClick={() => {rightArrow()}}>{'>'}</button>}</div>
    </div>
  )
}

export default RelatedCardsCarousel;