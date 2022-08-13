import React from "react";
import ListingAlbum from "./ListingAlbum";
import AuthorDetails from "./AuthorDetails";
import ListingOffers from "./ListingOffers";
import ListingMakeOffer from "./ListingMakeOffer";
import ListingControls from "./ListingControls";

import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms.js";

export default function ListingDetails(props) {
	const { id, attributes } = props.listing;

	const user = useRecoilValue(userState);
	const isOwner = attributes.author.data.id == user?.user?.id;

	return (
		<div className="container">
			<div className="columns">
				<div className="column is-8">
					<div className="box">
						<h1 className="title">{attributes.title}</h1>
						<ListingAlbum album={attributes.album} />
					</div>
					<div className="box">
						<h1 className="title">Description:</h1>
						<p className="subtitle">{attributes.description}</p>
						{user && isOwner ? (
							<ListingControls id={id} title={attributes.title} description={attributes.description} />
						) : null}
					</div>
				</div>
				<div className="column is-4">
					<div className="box">
						<AuthorDetails author={attributes.author} />
					</div>
					{}
					<div className="box">
						{attributes.offers.data.length <= 0 ? (
							<p>No offers</p>
						) : (
							<ListingOffers offers={attributes.offers} isOwner={isOwner} />
						)}
						{user && !isOwner ? <ListingMakeOffer listingId={id} /> : null}
					</div>
				</div>
			</div>
		</div>
	);
}
