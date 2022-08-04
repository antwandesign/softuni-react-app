import { useState } from "react";
import {useRecoilState} from "recoil";
import {userState} from '../store/atoms.js'
import axios from "axios";

export default function LoginForm() {
	const [details, setDetails] = useState({ email: "", password: "" });
	const [user,setUser] = useRecoilState(userState)

	const submitHandler = (e) => {
		e.preventDefault();

		axios
			.post("https://strapi.antwandesign.com/api/auth/local", {
				identifier: details.email,
				password: details.password,
			})
			.then((res) => {
                sessionStorage.setItem('user',JSON.stringify(res.data))
				setUser(res.data)
			});
	};

	return (
        
		<section className="section">
			<div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <h3 className="title">Login</h3>
				<form className="container" onSubmit={submitHandler}>
					<input
						className="input"
						type="email"
						name="email"
						id="email"
						onChange={(e) => setDetails({ ...details, email: e.target.value })}
						value={details.email}
					/>
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
					<input className="button is-primary" type="submit" />
				</form>
                </div>
			</div>
		</section>
	);
}
