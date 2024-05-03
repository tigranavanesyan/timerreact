export function add0(data) {
    return data < 10 ? `0${data}` : data
}

export function convertTimeToSeconds(timeString) {
    const nums = timeString.split(':')
    return +nums[0] * 60 + +nums[1]
}

export function convertSecondsToTime(sec) {
    return `${add0(Math.floor(sec / 60))}:${add0(sec % 60)}`
}
