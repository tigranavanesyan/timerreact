import  {convertSecondsToTime, convertTimeToSeconds} from '../helpers/helpers'
export function reducer(state, action) {
    if (action.type === "play") {
        return {
            ...state,
            isPlaying: !state.isPlaying,
            isStarted: true
        }
    }
    if (action.type === "stop") {
        return {
            ...initialState
        }
    }
    if (action.type === "setInitialTime") {
        return {
            ...state,
            initialTime: action.payload.time
        }
    }
    if (action.type === "setCurrentTime") {
        if (!isNaN(action.payload.data)) {
            return {
                ...state,
                currentTime: convertSecondsToTime((convertTimeToSeconds(state.currentTime) - 1))
            }
        }
        return {
            ...state,
            currentTime: state.initialTime
        }
    }
}

export function play(){
    return{
        type: "play"
    }
}
export function stop(){
    return{
        type: "stop"
    }
}
export function setInitialTime(t){
    return{
        type:"setInitialTime",
        payload:{
            time:t
        }
    }

}
export function setCurrentTime(d){
    return{
        type: "setCurrentTime",
        payload: {
            data: d
        }
    }

}

export const initialState = {
    isPlaying: false,
    isStarted: false,
    initialTime: "00:11",
    currentTime: "00:11"
}