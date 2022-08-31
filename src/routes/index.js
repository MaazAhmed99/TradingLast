import { type } from "@testing-library/user-event/dist/type"

const initialState = {
    numOfCakes = 10
}

const reducer = (state = initialState, action) => {
    switch(type.action){
        case BUK_CAKES: return {
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}