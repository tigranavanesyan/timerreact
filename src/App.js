import './App.css';
import CountdownBlock from "./components/CountdownBlock";
import ProgressBar from "./components/ProgressBar";
import React, {useEffect, useReducer, useState} from "react";

function reducer(state, action) {
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

function add0(data) {
    return data < 10 ? `0${data}` : data
}

function convertTimeToSeconds(timeString) {
    const nums = timeString.split(':')
    return +nums[0] * 60 + +nums[1]
}

function convertSecondsToTime(sec) {
    return `${add0(Math.floor(sec / 60))}:${add0(sec % 60)}`
}

const initialState = {
    isPlaying: false,
    isStarted: false,
    initialTime: "00:59",
    currentTime: "00:59"
}

function App() {
    const [state = {}, dispatch] = useReducer(reducer, initialState)
    const [milliseconds, setMilliseconds] = useState(0)
    let {isPlaying, isStarted, currentTime, initialTime} = state


    useEffect(() => {
        dispatch({
            type: "setCurrentTime",
            payload: {
                data: "www"
            }
        })
    }, [])

    useEffect(() => {
        let intervalRef
        if (isPlaying) {
            let ms = convertTimeToSeconds(currentTime) + (milliseconds ? milliseconds / 10 : 0)
            intervalRef = setInterval(() => {
                ms -= 0.1;
                if (ms <= 0.1) {
                    dispatch({
                        type: "stop"
                    })
                }
                setMilliseconds((prev) => {
                    if (prev === 0) {
                        dispatch({
                            type: "setCurrentTime",
                            payload: {
                                data: 1
                            }
                        })
                        return 9
                    } else {
                        return prev - 1
                    }
                })

            }, 100)
        } else {
            clearInterval(intervalRef)
        }
        return () => clearInterval(intervalRef)
    }, [isPlaying]);

    let progress = 0
    if (isStarted) {
        progress = (convertTimeToSeconds(currentTime) + milliseconds / 10) / convertTimeToSeconds(initialTime) * 100
    }

    return (
        <>
            <main>
                <ProgressBar progress={progress}/>
                <div className="timer-input">
                    {/*<Input/>*/}
                    <input className="show" type="text"
                           style={{display: `${isStarted ? "none" : "flex"}`}}
                           value={initialTime}
                           onChange={(e) => {
                               initialState.initialTime = e.target.value
                               initialState.currentTime = e.target.value
                               dispatch({
                                   type: "setInitialTime",
                                   payload: {
                                       time: e.target.value
                                   }
                               })
                               dispatch({
                                   type: "setCurrentTime",
                                   payload: {
                                       data: e.target.value
                                   }
                               })
                           }}
                    />
                    <div style={{display: `${isStarted ? "block" : "none"}`, width: "100%"}}>
                        <CountdownBlock currentTime={currentTime} milliseconds={milliseconds}/>
                    </div>
                </div>
                <div className="buttons">
                    <div className="pause-play">
                        <button className="show"
                                onClick={() => {
                                    dispatch({
                                        type: "play"
                                    })
                                }}
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    </div>
                    <button className="stop"
                            onClick={() => {
                                setMilliseconds(0)
                                dispatch({
                                    type: "stop"
                                })
                            }}
                            disabled={!isStarted}
                    >
                        stop
                    </button>
                </div>
            </main>
        </>
    );
}

export default App;
