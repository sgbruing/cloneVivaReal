import {housesRequest} from "./httpRequests.js";

export const factoryCards = async (object) => {
    try {
        const cityAndUfObject = await object
        const houseRequest = new housesRequest()
        const housesObjects = await houseRequest.getHousesObjects(cityAndUfObject.UF, cityAndUfObject.city)
        displayPlacesTotalCount(cityAndUfObject.city, cityAndUfObject.UF, housesObjects.length)
        const cardsContainer = document.querySelector('.cardsContainer')

        housesObjects.map((item) => {
            console.log(item)
            const card = document.createElement('article')
            card.append(imageCardFactory(item))
            card.append(cardInfoFactory(item))
            card.append(cardPricing(item))
            card.append(cardContactButtons(item))
            cardsContainer.append(card)
        })
    } catch(error) {
        return error
    }
}

export const clearDisplayResults = (cardsContainer, totalCountContainer) => {
    document.querySelector(cardsContainer).innerHTML = ""
    document.querySelector(totalCountContainer).innerHTML = ""
}

export const displayErrorMessage = (status) => {
    clearDisplayResults('.cardsContainer', '#totalResults')
    const errorWrapElement = createErrorElement(status)
    document.querySelector('.cardsContainer').append(errorWrapElement)
}

const displayPlacesTotalCount = (city, state, totalCount) => {
    console.log(city, state, totalCount)
    const totalResults = document.createElement('h1')
    const cityNameFormated = cityNameFormater(city)
    totalResults.innerText = `${totalCount} Imóveis à venda em ${cityNameFormated} - ${state.toUpperCase()}`
    document.querySelector('#totalResults').append(totalResults)
}

const cityNameFormater = (city) => {
    const citysDictionary = {
        'sao-paulo': 'São Paulo',
        'rio-de-janeiro': 'Rio de Janeiro'
    }
    return citysDictionary[city]
}

const createErrorElement = (status) => {
    const opsElement = document.createElement('h1')
    opsElement.innerText = 'OOOOPS!' 
    const wrongSearchElement = document.createElement('h1')
    wrongSearchElement.innerText = 'ALGO DEU ERRADO NA SUA BUSCA.'
    const errorStatusElement = document.createElement('h2')
    errorStatusElement.innerText = `status ${status}`
    const tryAgainElement = document.createElement('h1')
    tryAgainElement.innerText = 'POR FAVOR, TENTE NOVAMENTE.'
    const errorWrapElement = document.createElement('div')
    errorWrapElement.id = 'errorDiv'
    errorWrapElement.append(opsElement, wrongSearchElement, errorStatusElement, tryAgainElement)
    return errorWrapElement
}

const imageCardFactory = (obj) => {
    let imgContainer = document.createElement('div')
    let imgElement = document.createElement('img')
    imgContainer.classList.add('imageWrapper')
    imgElement.src = `${obj.mediaUrl}`
    imgContainer.append(imgElement)
    return imgContainer
}

const cardInfoFactory = (obj) => {
    let divOutContainer = document.createElement('div')
    divOutContainer.append(cardHeaderElement(obj))
    divOutContainer.append(cardPerks(obj))
    divOutContainer.append(cardAmenities(obj))
    divOutContainer.classList.add('infoOutContainer')
    return divOutContainer
}

const cardHeaderElement = (obj) => {
    let adr = document.createElement('div')
    adr.classList.add('divHeader')
    adr.append(cardAdress(obj))
    adr.append(cardName(obj))
    return adr
}

const cardAdress = (obj) => {
    let adr = document.createElement('span')
    adr.innerText = obj.address
    adr.classList.add('addressContainer')
    return adr
}

const cardName = (obj) => {
    let name = document.createElement('span')
    name.innerText = obj.houseName
    name.classList.add('nameContainer')
    return name
}

const cardAmenities = (obj) => {
    let amenitiesContainer = document.createElement('ul')
    obj.amenities.forEach((item)=>{
        let amenitiesElement = document.createElement('li')
        let parsedAmenities = translateAmenites(item)
        amenitiesElement.append(parsedAmenities)
        amenitiesContainer.append(amenitiesElement)
    })
    amenitiesContainer.classList.add('amenitiesContainer')
    return amenitiesContainer
}

const cardPerks = (obj) => {
    let perksContainer = document.createElement('ul')
    perksContainer.classList.add('perksContainer')
    //único trecho onde foi muito mais prático usar innerHTML sor! :)
    perksContainer.innerHTML = `
        <li><span class="perkNumber">${obj.houseSize}</span><span> m² </span></li>    
        <li><span class="perkNumber">${obj.bedrooms}</span><span> Quartos </span></li>    
        <li><span class="perkNumber">${obj.bathroom}</span><span> Banheiros </span></li>    
        <li><span class="perkNumber">${obj.parking}</span><span> Vaga </span></li>    
    ` 
    return perksContainer
}

const formatNumber = (number) => new Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL', maximumFractionDigits: 0,}).format(number)

const cardPricing = (obj) => {
    let housePrice = document.createElement('div')
    let price = document.createElement('p')
    let formatedPrice = formatNumber(obj.price)
    price.innerText = formatedPrice
    price.classList.add('priceContainer')
    housePrice.append(price)
    housePrice.classList.add('priceBlockContainer')
    if (obj.type === "APARTMENT" || obj.type === "CONDOMINIUM") {
        let condo = document.createElement('div')
        condo.classList.add('condoContainer')
        condo.innerHTML = `<span>Condomínio: </span> <span class='perkNumber'> --- </span>`
        if (obj.condoFee) condo.innerHTML = `<span>Condomínio: </span> <span class='perkNumber'> ${formatNumber(obj.condoFee)} </span>`
        housePrice.append(condo)
    } 
    return housePrice
}

const cardContactButtons = (obj) => {
    let buttonContainer = document.createElement('div')
    let telButton = document.createElement('button')
    let msgButton = document.createElement('button')

    buttonContainer.classList.add('buttonContainer')
    telButton.innerText = 'TELEFONE'
    msgButton.innerText = 'ENVIAR MENSAGEM'
    buttonContainer.append(telButton, msgButton)
    return buttonContainer
}

const translateAmenites = (item) => {
    const amenitesDictionary = {
        PARTY_HALL: 'Salão de Festas',
        FURNISHED: 'Mobiliado',
        FIREPLACE: 'Lareira',
        POOL: 'Piscina',
        BARBECUE_GRILL: 'Churrasqueira',
        AIR_CONDITIONING: 'Ar Condicionado',
        ELEVATOR: 'Elevador',
        BICYCLES_PLACE: 'Bicicletário',
        GATED_COMMUNITY: 'Condomínio Fechado',
        PLAYGROUND: 'Playground',
        SPORTS_COURT: 'Área de Esportes',
        PETS_ALLOWED: 'Animais Permitidos',
        AMERICAN_KITCHEN: 'Cusinha Americana',
        TENNIS_COURT: 'Quadra de Tennis',
        LAUNDRY: 'Lavanderia',
        GYM: 'Academia',
        CINEMA: 'Cinema',
        SAUNA: 'Sauna',
        GARDEN: 'Jardim',
        ELECTRONIC_GATE: 'Portão Elétrico'
    } 
    return amenitesDictionary[item]
}

