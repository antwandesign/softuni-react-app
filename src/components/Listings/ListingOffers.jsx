import { acceptOffer } from "../../api/OfferApi";

export default function ListingOffers(props) {
	const offers = props.offers.data;
	const isOwner = props.isOwner;

	console.log(props.isSold);

	const acceptHandler = (e) => {
		e.preventDefault();
		const data = {
			data: {
				listingId: props.listingId,
				offerId: e.target.value
			}
		};
		acceptOffer(data, props.user.jwt)
			.then((res) => {
				location.reload();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1 className="title">Offers</h1>
			<table className="table is-fullwidth is-hoverable is-striped">
				<thead>
					<tr>
						<th>User</th>
						<th>Amount</th>
						{!isOwner ? null : <th>Action</th>}
					</tr>
				</thead>
				<tbody>
					{offers.map((offer) => {
						return (
							<tr className="table" key={offer.id}>
								<td>{offer.attributes.author.data.attributes.username}</td>
								<td>{offer.attributes.amount}</td>
								{!isOwner ? null : (
									<td>
										<button onClick={acceptHandler} value={offer.id} className="button is-small">
											Accept
										</button>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
