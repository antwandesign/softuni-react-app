import { useRecoilValue } from "recoil";
import { listingState } from "../store/atoms.js";
import Listingcard from "../components/ListingCard.jsx";
import { useParams } from "react-router-dom";
import {useEffect} from "react"

export default function Listing() {
    const { id } = useParams();
	const [listing] = getFromState(id) || []
	const attributes = listing.attributes;
    useEffect(()=>{

    },[])


    console.log(listing)

	return(
	<div className="container">
		<div className="columns">
			<div className="column is-4">
				<Listingcard listing={listing} />
			</div>
		</div>
	</div>
    )



    function getFromState(id){
        return useRecoilValue(listingState).filter((el) => el.id == id)
    }

}
