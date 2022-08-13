import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../store/atoms.js";
import { getMyListings } from "../api/ListingsApi";
import { getMyOffers } from "../api/OfferApi";

import ListingCard from "../components/Listings/ListingCard.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const [userData, setUserState] = useRecoilState(userState);
	const { jwt, user } = userData;
	const [listings, setListings] = useState([]);
	const [offers, setOffers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userData) {
			return navigate("/login");
		}
		getMyListings(user.id, jwt)
			.then((res) => {
				setListings(res.data.data);
				setIsLoaded(true);
			})
			.catch((err) => {
				console.log(err);
			});

		getMyOffers(user.id, jwt).then((res) => {
			setOffers(res.data.data);
			setIsLoaded(true);
		});
	}, []);

	function handleLogout() {
		sessionStorage.removeItem("user");
		setUserState(null);
		navigate("/");
	}

	return (
		<>
			<div className="container">
				{!user ? (
					<h1>No user</h1>
				) : (
					<div className="box">
						<div className="media">
							<div className="media-content">
								<h4 className="title is-4">Hello {user.username}</h4>
								<p className="subtitle is-6">{user.email}</p>
							</div>
							<div className="media-right">
								<button onClick={handleLogout} className="button is-danger">
									Logout
								</button>
							</div>
						</div>
					</div>
				)}

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
