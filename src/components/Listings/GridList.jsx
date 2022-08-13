import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { listingState } from "../../store/atoms.js";
import { getAllListings } from "../../api/ListingsApi.js";

import axios from "axios";

import ListingCard from "./ListingCard.jsx";

export default function GridList() {
	const [listings, setListings] = useRecoilState(listingState);
	const [error, setError] = useState("");

	useEffect(() => {
		getAllListings()
			.then((res) => {
				setListings(res.data.data);
			})
			.catch((err) => setError(err.message));
	}, []);

	useEffect(() => {}, [listings]);

	return (
		<>
			<div className="container">
				<div className="columns is-multiline">
					{listings.map((listing) => {
						return (
							<div key={listing.id} className="column is-3">
								<ListingCard listing={listing} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
