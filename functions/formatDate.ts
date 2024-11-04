//

function formatDate(timestamp: string, timeDisplay: boolean = true): string {
    const date = new Date(timestamp);

    function getOrdinalDay(day: number): string {
        if (day > 3 && day < 21) return day + "th";
        switch (day % 10) {
            case 1:
                return day + "st";
            case 2:
                return day + "nd";
            case 3:
                return day + "rd";
            default:
                return day + "th";
        }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const day = getOrdinalDay(date.getDate());
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    return timeDisplay ? `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}` : `${day} ${month} ${year}`;
}

export default formatDate;
