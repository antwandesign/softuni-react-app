import SignUpForm from "../components/Auth/SignUpForm.jsx";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms.js";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	let navigate = useNavigate();

	const user = useRecoilValue(userState);
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	return <SignUpForm />;
}
