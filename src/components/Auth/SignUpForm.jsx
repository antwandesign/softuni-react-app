import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atoms.js";
import axios from "axios";

export default function SignUpForm() {
	const [details, setDetails] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [user, setUser] = useRecoilState(userState);
	const [error, setError] = useState("");

	const [passwordValidation, setPasswordValidation] = useState({
		hasEmail: false,
		hasUsername: false,
		length: false,
		hasNumber: false,
	});

	useEffect(() => {
		const tmpValidation = {
			hasEmail: false,
			hasUsername: false,
			length: false,
			hasNumber: false,
		};

		//Validate email
		if (details.email.length > 0) {
			tmpValidation.hasEmail = true;
		} else {
			tmpValidation.hasEmail = false;
		}

		if (details.username.length > 0) {
			tmpValidation.hasUsername = true;
		} else {
			tmpValidation.hasUsername = false;
		}

		//Validate length of password
		if (details.password.length > 5) {
			tmpValidation.length = true;
		} else {
			tmpValidation.length = false;
		}

		//Validate if password contains number

		if (details.password.match(/\d/)) {
			tmpValidation.hasNumber = true;
		} else {
			tmpValidation.hasNumber = false;
		}

		setPasswordValidation({ ...tmpValidation });
	}, [details]);

	//Send request to server

	const submitHandler = (e) => {
		e.preventDefault();

		if (
			!passwordValidation.hasEmail &&
			!passwordValidation.hasUsername &&
			!passwordValidation.length &&
			!passwordValidation.hasNumber
		) {
			setError("Please fill out all the fields!");
			return;
		}
		axios
			.post("https://strapi.antwandesign.com/api/auth/local/register", {
				username: details.username,
				email: details.email,
				password: details.password,
			})
			.then((res) => {
				sessionStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
				setError(err?.response?.data?.error?.message || "Something went wrong");
			});
	};

	return (
		<section className="section">
			<div className="columns">
				<div className="column is-half is-offset-one-quarter">
					

					<form className="container form box" onSubmit={submitHandler}>
					<h3 className="title">Sing Up</h3>
						<div className="field">
							<label className="label">Email</label>
							<div className="control">
								<input
									className="input"
									type="email"
									name="email"
									id="email"
									onChange={(e) =>
										setDetails({ ...details, email: e.target.value })
									}
									value={details.email}
								/>
							</div>
							{passwordValidation.hasEmail ? null : (
								<p className="help is-danger">Please enter a vaild email.</p>
							)}
						</div>

						<div className="field">
							<label className="label">Username</label>
							<div className="control">
								<input
									className="input"
									type="text"
									name="text"
									id="text"
									onChange={(e) =>
										setDetails({ ...details, username: e.target.value })
									}
									value={details.username}
								/>
							</div>
							{passwordValidation.hasUsername ? null : (
								<p className="help is-danger">Please enter a username.</p>
							)}
						</div>

						<div className="field">
							<label className="label">Password</label>
							<div className="control">
								<input
									className="input"
									type="password"
									name="password"
									id="password"
									onChange={(e) =>
										setDetails({ ...details, password: e.target.value })
									}
									value={details.password}
								/>
							</div>
							{passwordValidation.length ? null : (
								<p className="help is-danger">Password too short.</p>
							)}
							{passwordValidation.hasNumber ? null : (
								<p className="help is-info">
									Password should contain a number.
								</p>
							)}
						</div>
						{error ? (
							<div className="notification is-danger m-4">{error}</div>
						) : null}

						<input className="button is-primary is-fullwidth"  type="submit" />
					</form>
				</div>
			</div>
		</section>
	);
}
