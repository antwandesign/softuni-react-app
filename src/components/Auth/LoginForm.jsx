import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atoms.js";
import axios from "axios";

export default function LoginForm() {
	const [details, setDetails] = useState({ email: "", password: "" });

	const [user, setUser] = useRecoilState(userState);
	const [error, setError] = useState("");


	const submitHandler = (e) => {
		e.preventDefault();

		//Validation

		if(!details.email){
			setError("Please enter your email");
			return;
		}

		if(!details.password){
			setError("Please enter your password");
			return;
		}

		//Send request to server

		axios
			.post("https://strapi.antwandesign.com/api/auth/local", {
				identifier: details.email,
				password: details.password,
			})
			.then((res) => {
				sessionStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
			}).catch((err) => {
				setError(err?.response?.data?.error?.message || "Something went wrong");
			});;
	};

	return (
		<section className="section">
			<div className="columns">
				<div className="column is-half is-offset-one-quarter">
					

					<form className="container form box " onSubmit={submitHandler}>
					<h3 className="title">Login</h3>
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
						</div>


						
						{error ? (<div className="notification is-danger m-4">{error}</div>) :  null}
							
						<input className="button is-primary" type="submit" />
					</form>
				</div>
			</div>
		</section>
	);
}
