import React from "react";

export default function AuthorDetails(props) {
	const author = props.author.data.attributes;

	return (
		<>
			<div className="media">
				<div className="media-left"></div>
				<div className="media-content">
					<p className="title is-4">{author.username}</p>
					<p className="subtitle is-6">{author.email}</p>
				</div>
			</div>
		</>
	);
}
