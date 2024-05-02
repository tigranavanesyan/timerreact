import React from 'react';

function CountdownBlock({currentTime, milliseconds}) {
    return (
        <div className="countdown">
            {currentTime}.{milliseconds}
        </div>
    );
}

export default CountdownBlock;