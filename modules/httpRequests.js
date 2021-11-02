import {displayErrorMessage} from "./factoryFunctions.js";

export class housesRequest {

    async request(url) {
        try {
            const response = await fetch(url)
            return await response.json()
        } catch (error) {
            console.log(error.status)
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
            displayErrorMessage('500');
        }
    }

}

export class locationFilter {

/*     async request(url) {
        try{
            const response = await fetch(url)
            return await response.json();
        } catch {
            throw new Error (`IBGE request fail! Error: ${error}`)
        }
    } */

    async getLocationFilter(city) {
        /* Sor, deixei essa linha comentada pois fiz a aplicação visando obter o estado através dessa api. Porém (creio que por ser um serviço público)
        ela demonstrou muita instabilidade no funcionamento, então criei uma função para 'simular' esse comportamento aqui no front*/
        //const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${this.locationFormater(city)}` 
        try {
            //const response = await this.request(url)
            //let cityObject = {city: this.locationFormater(city), UF: (response.microrregiao.mesorregiao.UF.sigla).toLowerCase()}
            let locationObject = {}
            let locationFormated = await this.locationFormater(city)
            if (locationFormated.length == 2) {
                locationObject = {UF: locationFormated}
                let cityByUf = await this.cityByUf(locationFormated)
                locationObject = {UF: locationFormated, city: cityByUf}
            } else {
                locationObject = {city: locationFormated, UF: this.ufByCity(locationFormated)}
            }           
            return locationObject
        } catch (error) {
            displayErrorMessage(error);
        }
    }

    locationFormater = (location) => {
        console.log('city formater: ', location)
        let locationFormated = location.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "-") //converte para string minúscula e sem acentos
        return locationFormated
    }

    cityByUf = (uf) => {
        const ufDictionary = {
            sp: 'sao-paulo',
            rj: 'rio-de-janeiro'
        }
        console.log(ufDictionary[uf])
        return ufDictionary[uf]
    }

    ufByCity = (city) => {
        console.log('UFBYCITY: ', city)
        const cityDictionary = {
            'sao-paulo': 'sp',
            'rio-de-janeiro': 'rj'
        }
        return cityDictionary[city]
    }

}