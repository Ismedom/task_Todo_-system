//

const timeConvertInGMT = (time: string): string => {
    const date = new Date(time);
    return date.toUTCString();
};

export default timeConvertInGMT;
