import React from 'react'
import '../css/card.css'
import { Link } from "react-router-dom";

export default function ListingCard(listing) {

    const { id, attributes } = listing.listing;
    const images = attributes.album.data

    const price = attributes.offers.data.reduce((prev, curr) => {
        return prev + curr.attributes.amount
    },0)

  return (
    <div className="card">

  <div className="card-image">

      <img className="listing-card-image" src={images[0].attributes.formats.medium.url} alt="Placeholder image"/>

  </div>
  <div className="card-content">
    {attributes.description}
  </div>
  <footer className="card-footer">
    <div className=" card-footer-item">
    <p className="title is-6">{price+'лв.'}</p>
    </div>
    <div className=" card-footer-item">
    <Link to={'/listing/'+id} className="button is-primary is-fullwidth">BUY</Link>

    </div>
    
  </footer>
</div>
  )
}
