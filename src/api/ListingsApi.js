import axios from "axios"


// const [listings, setListings] = useRecoilState(listingState);

const API_URL = "https://strapi.antwandesign.com/api/"

export async function getAllListings() {
    try {
        const res = await axios.get(API_URL + 'listings?populate=*&filters[sold][$eq]=false')
        return res
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getListingById(id) {
    try {
        //strapi.antwandesign.com/api/listings/21

        const res = await axios.get(API_URL + "listings/" + id + '?populate[offers][populate][0]=author&populate[album][populate][0]=*&populate=author&populate[acceptedOffer][populate][0]=*')
        return res
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getMyListings(id,jwt) {
    try {

        const res = await axios.get(API_URL + `listings?populate=*&filters[author][id][$eq]=${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`

            }
            
        })
        return res
    } catch (err) {
        throw new Error(err.message)
    }
}


export async function createListing(listing,jwt) {
    try {
        const res = await axios.post(API_URL + "listings/", listing)
        return res
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteListing(id, jwt) {
    try {

        const res = await axios.delete(API_URL + "listings/" + id, {
            headers: {
                Authorization: `Bearer ${jwt}`

            }
        })
        return res
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function updateListing(id, data,jwt) {
    try {
        const res = await axios.put(API_URL + "listings/" + id, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
            
        })
        return res
    } catch (err) {
        throw new Error(err)
    }
}



//strapi.antwandesign.com/api/