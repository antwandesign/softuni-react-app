import React from "react";
import "../../css/ListingCard.css";
import { Link } from "react-router-dom";

export default function ListingCard(listing) {
	const { id, attributes } = listing.listing;
	const images = attributes.album.data;

	const price = attributes.offers.data.reduce((prev, curr) => {
		return Math.max(prev, curr.attributes.amount);
	}, 0);

	return (
		<div className="card">
			<header className={`card-header  ${attributes.sold ? "has-background-primary" : null}`}>
				<p className="card-header-title">{attributes.title}</p>
			</header>
			<div className="card-image">
				<img
					className="image listing-card-image"
					src={images[0].attributes.formats.medium.url}
					alt="Placeholder image"
				/>
			</div>

			<footer className="card-footer">
				<div className=" card-footer-item">
					<p className="title is-6">{price + "лв."}</p>
				</div>
				<div className=" card-footer-item">
					<Link to={"/listing/" + id} className="button is-primary is-fullwidth">
						{attributes.sold ? "SOLD" : "VIEW"}
					</Link>
				</div>
			</footer>
		</div>
	);
}
