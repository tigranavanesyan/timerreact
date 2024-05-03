import React from 'react';
import {play, stop} from "../store/store";

function ButtonsBlock({dispatch, state, setMilliseconds}) {
    return (
        <div className="buttons">
            <div className="pause-play">
                <button className="show"
                        onClick={() => {
                            dispatch(play())
                        }}
                >
                    {state.isPlaying ? "Pause" : "Play"}
                </button>
            </div>
            <button className="stop"
                    onClick={() => {
                        setMilliseconds(0)
                        dispatch(stop())
                    }}
                    disabled={!state.isStarted}
            >
                stop
            </button>
        </div>
    );
}

export default ButtonsBlock;