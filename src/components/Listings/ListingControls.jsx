import { Link } from "react-router-dom";
import { deleteListing } from "../../api/ListingsApi";

import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms.js";

import { useNavigate } from "react-router-dom";

export default function ListingControls(props) {
	const user = useRecoilValue(userState);
	const navigate = useNavigate();

	function deleteHandler() {
		deleteListing(props.id, user.jwt)
			.then(() => {
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="field is-grouped is-grouped-centered">
				<p className="control">
					<Link
						to={`/listing/${props.id}/edit/?title=${props.title}&description=${props.description}`}
						className="button is-warning"
					>
						Edit
					</Link>
				</p>
				<p className="control">
					<a onClick={deleteHandler} className="button is-danger">
						Delete
					</a>
				</p>
			</div>
		</>
	);
}
