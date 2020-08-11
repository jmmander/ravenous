const apiKey = '<API-KEY-HERE>';

const Yelp = {

    search(term, location, sortBy) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        console.log(url)
        const auth = {headers: {Authorization: `Bearer ${apiKey}`}}
        console.log(auth)
        return fetch(url, auth).then(
            response=>{
                return response.json()
            }).then(
                jsonResponse=>{
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business=> {
                            return {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: business.location.address1,
                                city: business.location.city,
                                state: business.location.state, 
                                zipCode: business.location.zip_code,
                                category: business.categories[0].title,
                                rating: business.rating,
                                reviewCount: business.review_count, 
                                    }
                        }                            
                            );
                } else {
                    console.log('here')
                    console.log(JSON.stringify(jsonResponse))
                }
            });
    }
}   

export default Yelp;