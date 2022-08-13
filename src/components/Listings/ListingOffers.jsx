export default function ListingOffers(props) {
	const offers = props.offers.data;
	const isOwner = props.isOwner;

	const acceptHandler = (e) => {
		alert("WIP");
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
										<button onClick={acceptHandler} className="button is-small">
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
