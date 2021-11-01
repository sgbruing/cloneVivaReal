class housesRequest {

    async request(url) {
        try {
            const response = await fetch(url)
            return await response.json()
        } catch (error) {
            throw new Error (`Backend request fail! Error: ${error}`)
        }
    }

    async getHousesObjects(state, city) {
        try {
            const url = `https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`;
            const requestReponse = await this.request(url)
            const housesObjetcsArray = requestReponse.search.result.listings.reduce((acc, item) => {
                let obj = []
                obj.state = item.listing.address.state
                obj.address = `${item.link.data.street}, ${item.link.data.streetNumber}, ${item.listing.address.state} - ${item.listing.address.stateAcronym}`
                obj.houseName = item.link.name
                obj.mediaUrl = item.medias[0].url
                obj.price = item.listing.pricingInfos[0].price
                obj.condoFee = item.listing.pricingInfos[0].monthlyCondoFee
                obj.type = item.listing.unitTypes[0]
                obj.bedrooms = item.listing.bedrooms[0]
                obj.houseSize = item.listing.usableAreas[0]
                obj.stateAcronym = item.listing.address.stateAcronym
                obj.bathroom = item.listing.bathrooms[0]
                obj.parking = item.listing.parkingSpaces[0]
                obj.amenities = item.listing.amenities
                return [...acc, obj]
            }, [])
            housesObjetcsArray.totalCount = requestReponse.search.totalCount
            console.log('requestReponse: ', requestReponse)
            console.log('housesObjetcsArray: ', housesObjetcsArray)
            return housesObjetcsArray
        } catch (error) {
            throw new Error (`An error has occurred (backend): ${error}`)
        }
    }

}

class cityValidator {

    async request(url) {
        try{
            const response = await fetch(url)
            return await response.json();
        } catch {
            throw new Error (`IBGE request fail! Error: ${error}`)
        }
    }

    async getCityObject(city) {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`
        try {
            const response = await this.request(url)
            let cityObject = {city: city, UF: (response.microrregiao.mesorregiao.UF.sigla).toLowerCase()}
            return cityFormater(cityObject)
        } catch (err) {
            throw new Error (`An error has occurred (ibge): ${error}`)
        }
    }

    cityFormater = (city) => {
        let cityName = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "-")
        return cityName
    }

}

export default housesRequest
export default Request
