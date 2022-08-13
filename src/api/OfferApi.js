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


