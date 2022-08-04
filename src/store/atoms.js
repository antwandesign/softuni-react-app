import { atom } from "recoil";

const user = sessionStorage.getItem("user");

export const userState = atom({
	key: "user",
	default: JSON.parse(user) || "",
});
