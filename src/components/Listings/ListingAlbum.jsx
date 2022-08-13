import { useState } from "react";
import "../../css/ListingAlbum.css";

export default function ListingAlbum(props) {
	const { album } = props;
	const [main, setMain] = useState(album.data[0].attributes.url);

	const handleClick = (e) => {
		setMain(e.target.src);
		console.log(main);
	};

	return (
		<>
			<div className="columns">
				<div className="column is-centered">
					<img className="main-image" src={main}></img>
				</div>
			</div>
			<div className="columns">
				{album.data.map((album) => {
					return (
						<div key={album.id} className="column is-1">
							<img className="image-list-element" onClick={handleClick} src={album.attributes.url} />
						</div>
					);
				})}
			</div>
		</>
	);
}
