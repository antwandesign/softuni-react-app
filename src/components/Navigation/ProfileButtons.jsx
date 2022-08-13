export default function ProfileButtons() {
	const logout = () => {
		sessionStorage.removeItem("user");
		window.location.reload();
	};
	return (
		<>
			<div className="navbar-item">
				<div className="buttons">
					<button to="/create" className="button is-primary">
						ADD
					</button>
					<button onClick={logout} className="button is-light">
						<strong>Log Out</strong>
					</button>
				</div>
			</div>
		</>
	);
}
