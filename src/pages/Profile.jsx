import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms.js";
import { getMyListings } from "../api/ListingsApi";
import { getMyOffers } from "../api/OfferApi";

import ListingCard from "../components/Listings/ListingCard.jsx";

import { useState, useEffect } from "react";

export default function Profile() {
	const { jwt, user } = useRecoilValue(userState);
	const [listings, setListings] = useState([]);
	const [offers, setOffers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useState(() => {
		getMyListings(user.id, jwt)
			.then((res) => {
				console.log(res.data.data);
				setListings(res.data.data);
				setIsLoaded(true);
			})
			.catch((err) => {
				console.log(err);
			});

		getMyOffers(user.id, jwt).then((res) => {
			setOffers(res.data.data);
			console.log(res.data.data);
			setIsLoaded(true);
		});
	}, []);

	return (
		<>
			<div className="container">
				<div className="box">
					<div className="media">
						<div className="media-content">
							<h4 className="title is-4">Hello {user.username}</h4>
							<p className="subtitle is-6">{user.email}</p>
						</div>
						<div className="media-right">
							<button className="button is-danger">Logout</button>
						</div>
					</div>
				</div>

				{isLoaded && !listings.length <= 0 ? (
					<>
						<h4 className="title is-4">My Listings:</h4>
						<div className="columns is-multiline p4">
							{listings.map((listing) => {
								return (
									<div key={listing.id} className="column is-3">
										<ListingCard listing={listing} />
									</div>
								);
							})}
						</div>

						<br />
					</>
				) : null}

				{isLoaded && !offers.length <= 0 ? (
					<>
						<h4 className="title is-4">My Offers:</h4>
						<div className="columns is-multiline p-4">
							{offers.map((offer) => {
								return (
									<div key={offer.id} className="column is-3">
										<ListingCard listing={offer} />
									</div>
								);
							})}
						</div>
					</>
				) : null}
			</div>
		</>
	);
}
