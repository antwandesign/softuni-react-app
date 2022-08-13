import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListingDetails from "../components/Listings/ListingDetails";

import { getListingById } from "../api/ListingsApi.js";

export default function Listing() {
	const { id } = useParams();

	const [listing, setListing] = useState();

	useEffect(() => {
		getListingById(id)
			.then((res) => {
				setListing(res.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	if (!listing) {
		return <div>Loading...</div>;
	}

	return <ListingDetails listing={listing} />;
}
