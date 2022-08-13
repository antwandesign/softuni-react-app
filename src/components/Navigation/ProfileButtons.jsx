import { Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms.js";

export default function ProfileButtons() {
	const user = useRecoilValue(userState);

	const logout = () => {
		sessionStorage.removeItem("user");
		window.location.reload();
	};
	return (
		<>
			<div className="navbar-item">
				<div className="buttons">
					<Link to="/create/" className="button is-primary">
						ADD LISTING
					</Link>
					<Link to={"/profile/" + user.user.id} className="button is-light">
						<strong>Profile</strong>
					</Link>
				</div>
			</div>
		</>
	);
}
