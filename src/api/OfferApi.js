import axios from "axios"


const API_URL = "https://strapi.antwandesign.com/api/"


export async function makeOffer(listingId, amount, user) {
    

    const offer = {
        data: {
            amount: amount,
            author: user.user.id,
            listing: listingId
        }
    }


    const res = await axios.post(API_URL + 'offers', offer)
    
    return res
  
}

export async function getMyOffers(userId,jwt) {
    
    const res = await axios.get(API_URL + `listings?populate[offers][populate][0]=author&populate[album][populate][0]=*&populate=author'&filters[offers][author][id][$eq]=` + userId, {
        headers: {
            Authorization: `Bearer ${jwt}`

        }
    })
    
    return res
  
}

export async function acceptOffer(data,jwt) {
    
    const res = await axios.post(API_URL + `acceptOffer`,data, {
        headers: {
            Authorization: `Bearer ${jwt}`

        }
    })
    
    return res
  
}

//strapi.antwandesign.com/api/listings?populate[offers][populate][0]=author&populate[album][populate][0]=*&populate=author'&filters[offers][author][id][$eq]=1






