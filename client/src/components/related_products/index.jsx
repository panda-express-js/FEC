import React , { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedCard from './RelatedCard.jsx'

const RelatedProducts = ({product, server, options, productIds}) => {
  /*
  useEffect(() => {
    if (product.id) {
      axios.get(`${server}/products/${product.id}/related`, options)
      .then((response) => {
        setRelatedIds(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [product])
*/

  return (
    <div id='relatedProductsCards'>
      ---related products list ------
      {productIds.map(ID => {
        return <RelatedCard key={ID} id={ID} server={server} options={options} />
      })}
      ---related products list ------
    </div>
  )
}
//function idea for running get for an array of ids
  /*
  const getAllRelatedProducts = (idArray) => {
    idArray.forEach((id) => {
      console.log(id)
      axios.get(`${server}/products/${id}`, options)
      .then((result)=> {
        setRelatedProducts(relatedProducts.concat(result.data))
      })
      .catch((err) => {
        console.log('function err', err)
      })
    })
  }
  */

export default RelatedProducts;