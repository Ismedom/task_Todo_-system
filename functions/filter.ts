//

const filterArray = (array: any[] = [], option1: string = "", option2: string = "", option3: string = "") => {
    const newArray = [...array];

    const filteredArray = newArray.filter((item) => {
        const matchesOption1 = option1 ? item.todoCategory === option1.toLocaleLowerCase() : true;
        const matchesOption2 = option2 ? item.actions === option2.toLocaleLowerCase() : true;
        const matchesOption3 = option3 ? item.status === option3.toLocaleLowerCase() : true;

        return matchesOption1 && matchesOption2 && matchesOption3;
    });

    return filteredArray;
};

export default filterArray;
