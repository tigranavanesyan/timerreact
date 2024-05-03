import './App.css';
import CountdownBlock from "./components/CountdownBlock";
import ProgressBar from "./components/ProgressBar";
import React, {useEffect, useReducer, useState} from "react";
import {initialState, stop, setInitialTime, reducer, setCurrentTime} from "./store/store";
import {convertTimeToSeconds} from "./helpers/helpers";
import ButtonsBlock from "./components/ButtonsBlock";


function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [milliseconds, setMilliseconds] = useState(0)
    let {isPlaying, isStarted, currentTime, initialTime} = state

    useEffect(() => {
        dispatch(stop())
    }, [])

    useEffect(() => {
        let intervalRef
        if (isPlaying) {
            let ms = convertTimeToSeconds(currentTime) + (milliseconds ? milliseconds / 10 : 0)
            intervalRef = setInterval(() => {
                ms -= 0.1;
                if (ms <= 0.1) {
                    dispatch(stop())
                }
                setMilliseconds((prev) => {
                    if (prev === 0) {
                        dispatch(setCurrentTime(1))
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
        <main>
            <ProgressBar progress={progress}/>
            <div className="timer-input">
                <input className="show" type="text"
                       style={{display: `${isStarted ? "none" : "flex"}`}}
                       value={initialTime}
                       onChange={(e) => {
                           initialState.initialTime = e.target.value
                           initialState.currentTime = e.target.value
                           dispatch(setInitialTime(e.target.value))
                           dispatch(setCurrentTime(e.target.value))
                       }}
                />
                <div style={{display: `${isStarted ? "block" : "none"}`, width: "100%"}}>
                    <CountdownBlock currentTime={currentTime} milliseconds={milliseconds}/>
                </div>
            </div>
            <ButtonsBlock dispatch={dispatch} state={state} setMilliseconds={setMilliseconds}/>
        </main>
    );
}

export default App;
