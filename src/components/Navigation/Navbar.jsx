import { useState } from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms.js";

import { Link } from "react-router-dom";

import AuthButtons from "./AuthButtons.jsx";
import ProfileButtons from "./ProfileButtons.jsx";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen)
	};

	const user = useRecoilValue(userState);

	return (
		<header>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item">
						<img
							src="https://bulma.io/images/bulma-logo.png"
							width="112"
							height="28"
						/>
					</Link>

					<a
						onClick={toggle}
						role="button"
						className={isOpen ? "is-active navbar-burger" : "navbar-burger"}
						aria-label="menu"
						data-target="navbarBasicExample"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div
					id="navbarBasicExample"
					className={isOpen ? "is-active navbar-menu" : "navbar-menu"}
				>
					<div className="navbar-start">
						<Link to="/" className="navbar-item">
							Home
						</Link>

						<Link to="/about" className="navbar-item">
							About
						</Link>
					</div>

					<div className="navbar-end">

						{user ? <ProfileButtons /> : <AuthButtons />}


					</div>
				</div>
			</nav>
		</header>
	);
}
