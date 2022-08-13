import React from "react";

export default function AuthorDetails(props) {
	const author = props.author.data.attributes;

	return (
		<>
			<div className="media">
				<div className="media-left">
					<figure className="image is-48x48">
						<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
					</figure>
				</div>
				<div className="media-content">
					<p className="title is-4">{author.username}</p>
					<p className="subtitle is-6">{author.email}</p>
				</div>
			</div>
		</>
	);
}
