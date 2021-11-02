import {inputFIlterListener, radioButtonsListener} from "./modules/listeners.js"

const locationFilterInput = document.getElementById('inputFilterLocation')
inputFIlterListener(locationFilterInput)

radioButtonsListener()