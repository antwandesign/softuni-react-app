import axios from "axios";
import { useState, useEffect } from "react";
import "../css/Create.css";

import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms.js";

import { useNavigate } from "react-router-dom";
import { createListing } from "../api/ListingsApi";

export default function Create() {
	const user = useRecoilValue(userState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, []);

	const [listing, setListing] = useState({});
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");

	//Send request to server

	const submitHandler = (e) => {
		e.preventDefault();

		if (!listing.title || !listing.description || !listing.files) {
			setError("All fields are required!");
			console.log(error);
			return;
		}

		setLoading(true);

		const formData = new FormData();

		const data = {
			title: listing.title,
			description: listing.description,
			author: user.user.id
		};

		formData.append("data", JSON.stringify(data));

		Object.keys(listing.files).forEach((key) => {
			const file = listing.files[key];
			formData.append("files.album", file, file.name);
		});

		createListing(formData, user.jwt)
			.then((res) => {
				setLoading(false);
				navigate("/");
			})
			.catch((err) => console.error(err.res));
	};
	return (
		<section className="section">
			<div className="columns">
				<div className="column is-half is-offset-one-quarter">
					<form className="container form box" onSubmit={submitHandler}>
						<h3 className="title">Create new listing</h3>
						<div className="field">
							<label className="label">Title</label>
							<div className="control">
								<input
									className="input"
									type="text"
									name="title"
									id="title"
									onChange={(e) => setListing({ ...listing, title: e.target.value })}
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
								/>
							</div>
						</div>

						<div className="file field">
							<label className="file-label">
								<input
									multiple
									className="file-input"
									type="file"
									name="album"
									onChange={(e) => setListing({ ...listing, files: e.target.files })}
								/>
								<span className="file-cta">
									<span className="file-icon">
										<i className="fas fa-upload"></i>
									</span>
									<span className="file-label">Choose a file…</span>
								</span>
							</label>
						</div>

						{/* {listing.files ? previewImages(listing.files) : null} */}

						<div className="field">
							<button
								className={`button is-primary is-fullwidth ${loading ? "is-loading" : null}`}
								type="submit"
							>
								Submit
							</button>
						</div>
						{error ? <div className="notification is-danger m-4">{error}</div> : null}
					</form>
				</div>
			</div>
		</section>
	);
}

function previewImages(files) {
	return (
		<div className="field">
			<div className="columns is-mobile">
				{Object.keys(files).map((key) => {
					return (
						<div className="column is-one-fifth ">
							<img src={URL.createObjectURL(files[key])} className="image preview-image" />
						</div>
					);
				})}
			</div>
		</div>
	);
}
