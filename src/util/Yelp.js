const apiKey = <API KEY>;

const Yelp = {

    search(term, location, sortBy) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const auth = {headers: {Authorization: `Bearer ${apiKey}`}}
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
                                url: business.url
                                    }
                        }                            
                            );
                } else {
                    console.log(JSON.stringify(jsonResponse))
                }
            });
    }
}   

export default Yelp;
