import React from "react";
import ListingAlbum from "./ListingAlbum";
import AuthorDetails from "./AuthorDetails";
import ListingOffers from "./ListingOffers";
import ListingMakeOffer from "./ListingMakeOffer";
import ListingControls from "./ListingControls";
import ListingSold from "./ListingSold";

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
					</div>
					{user && isOwner ? (
						<ListingControls id={id} title={attributes.title} description={attributes.description} />
					) : null}
				</div>
				<div className="column is-4">
					<div className="box">
						<AuthorDetails author={attributes.author} />
					</div>

					{!attributes.sold ? (
						<div className="box">
							{attributes.offers.data.length <= 0 ? (
								<p>No offers</p>
							) : (
								<ListingOffers
									user={user}
									listingId={id}
									offers={attributes.offers}
									isOwner={isOwner}
									isSold={attributes.sold}
								/>
							)}
							{user && !isOwner && !attributes.sold ? <ListingMakeOffer listingId={id} /> : null}
						</div>
					) : null}

					{attributes.sold ? <ListingSold /> : null}
				</div>
			</div>
		</div>
	);
}
