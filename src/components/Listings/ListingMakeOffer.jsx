import { makeOffer } from "../../api/OfferApi";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms";

export default function ListingMakeOffer(props) {
	const user = useRecoilValue(userState);

	const handleMakeOffer = (e) => {
		e.preventDefault();
		const amount = e.target[0].value;
		makeOffer(props.listingId, amount, user).then((res) => {
			location.reload();
		});
	};

	return (
		<form onSubmit={handleMakeOffer} className="Form">
			<div className="field has-addons has-addons-centered">
				<p className="control">
					<input className="input" type="number" defaultValue="0" placeholder="Amount of money" />
				</p>
				<p className="control">
					<input type="submit" value="Make Offer" className="button is-primary" />
				</p>
			</div>
		</form>
	);
}
