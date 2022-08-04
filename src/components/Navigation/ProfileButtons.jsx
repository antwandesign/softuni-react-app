export default function ProfileButtons() {

    const logout = () => {
        sessionStorage.removeItem('user')
        window.location.reload()
    }
	return (
		<>
			<div className="navbar-item">
				<div className="buttons">
					<button onClick={logout} className="button is-primary">
						<strong>Log Out</strong>
					</button>
					<button to="/login" className="button is-light">
						Profile
					</button>
				</div>
			</div>
		</>
	);
}
