//

function search(array: any[], option: string) {
    return array.filter(
        (item) =>
            item.description.toLowerCase().includes(option.toLowerCase()) ||
            item.taskName.toLowerCase().includes(option.toLowerCase())
    );
}

export default search;
