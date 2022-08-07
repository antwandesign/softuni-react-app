import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { listingState } from "../store/atoms.js";
import axios from "axios";

import ListingCard from "./ListingCard.jsx";

export default function GridList() {
	const [listings, setListings] = useRecoilState(listingState);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get("https://strapi.antwandesign.com/api/listings?populate=*")
			.then((res) => {
				setListings(res.data.data);
			})
			.catch((err) => setError(JSON.stringify(err)));
	}, []);

	useEffect(() => {}, [listings]);

	return (
		<>
			<div className="container">
				<div className="columns">
					
						{listings.map((listing) => {
                            
							return (
                                <div key={listing.id} className="column is-3">
                                 <ListingCard  listing={listing} />
                                </div>
                                )
						})}
					
				</div>
			</div>
		</>
	);
}
