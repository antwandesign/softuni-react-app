import { useState, useEffect } from "react";
import "../css/Create.css";

import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms.js";

import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import { updateListing } from "../api/ListingsApi";

export default function Edit() {
	//Route Guard
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, []);
	//End Route Guard

	const [searchParams, setSearchParams] = useSearchParams();
	const { id } = useParams();

	const [listing, setListing] = useState({
		title: searchParams.get("title") || "",
		description: searchParams.get("description") || ""
	});
	const [error, setError] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();

		if (!listing.title || !listing.description) {
			setError("All fields are required!");
			return;
		}

		const data = {
			data: {
				title: listing.title,
				description: listing.description
			}
		};

		updateListing(id, data, user.jwt).then(() => {
			navigate("/listing/" + id);
		});
	};

	return (
		<section className="section">
			<div className="columns">
				<div className="column is-half is-offset-one-quarter">
					<form className="container form box" onSubmit={submitHandler}>
						<h3 className="title">Edit listing</h3>
						<div className="field">
							<label className="label">Title</label>
							<div className="control">
								<input
									className="input"
									type="text"
									name="title"
									id="title"
									onChange={(e) => setListing({ ...listing, title: e.target.value })}
									value={listing.title}
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Description</label>
							<div className="control">
								<textarea
									className="input textarea"
									type="textarea"
									name="description"
									id="description"
									onChange={(e) => setListing({ ...listing, description: e.target.value })}
									value={listing.description}
								/>
							</div>
						</div>

						<div className="field">
							<input className="button is-primary is-fullwidth" type="submit" />
						</div>
						{error ? <div className="notification is-danger m-4">{error}</div> : null}
					</form>
				</div>
			</div>
		</section>
	);
}
