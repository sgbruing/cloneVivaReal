import {factoryCards, clearDisplayResults} from "./factoryFunctions.js";
import {housesRequest, locationFilter} from "./httpRequests.js"


const locationFilterMethods = new locationFilter()

window.onload = function() {
    document.getElementById('navMenuSideContainer').style.display = 'none';
};

document.getElementById('menuButton').onclick = function() {
    document.getElementById('navMenuSideContainer').style.cssText = 'display:flex; -webkit-transition: .4s; transition: .4s;'
}

document.getElementById('closeMenuButton').onclick = function() {
    document.getElementById('navMenuSideContainer').style.cssText = 'display: none;'
}

export const inputFIlterListener = async (input) => {
    input.addEventListener('focusout' ,async (evt) => {
        if (evt.target.value != "") {
            clearDisplayResults(".cardsContainer", "#totalResults")
            let cityObj = await locationFilterMethods.getLocationFilter(evt.target.value)
            console.log('cityObj: ', cityObj)
            factoryCards(cityObj)
        } else {
            clearDisplayResults(".cardsContainer", "#totalResults")
        }
    })
}

export const radioButtonsListener = () => {
    const buttonsGroup = document.querySelectorAll('.buttonsFilterContainer')
    buttonsGroup.forEach((groupElement) => {
        groupElement.addEventListener('click', (evt) => {
            if (evt.target.tagName === "BUTTON") {
                groupElement.childNodes.forEach((child) => {
                    if (child.tagName === "BUTTON" && child !== evt.target) child.classList.remove('buttonChecked')
                })
                evt.target.classList.toggle('buttonChecked')
            }
        })
    })
}

