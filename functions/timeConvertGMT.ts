//

const timeConvertInGMT = (time: string): string => {
    const timeZone = new Date().getTimezoneOffset() / 60;

    const timeFormating = time.split(".").slice(0, 1) + `000${expectFormatingValue(-1 * timeZone)}:00`;

    const date = new Date(timeFormating);
    return date.toUTCString();
};

function expectFormatingValue(number: number) {
    // const number = -2;
    const formattedNumber =
        number < 0 ? "-" + Math.abs(number).toString().padStart(2, "0") : number.toString().padStart(2, "0");

    return formattedNumber;
}

export default timeConvertInGMT;
