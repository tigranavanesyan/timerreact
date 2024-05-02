import React from 'react';

function ProgressBar({progress}) {
    return (
        <div className="progressBar">
            <div className="fill"  style={{height:`${progress}%`}}></div>
        </div>
    );
}

export default ProgressBar;