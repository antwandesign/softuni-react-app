import { Link } from "react-router-dom";

export default function AuthButtons() {
	return (
		<>
			<div className="navbar-item">
				<div className="buttons">
					<Link to="/signup" className="button is-primary">
						<strong>Sign up</strong>
					</Link>
					<Link to="/login" className="button is-light">
						Log in
					</Link>
				</div>
			</div>
		</>
	);
}
