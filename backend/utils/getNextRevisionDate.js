

const getNextRevisionDate = (revisionCount) => {

    const today = new Date();

    let daysToAdd = 1;

    switch (revisionCount) {

        case 1:
            daysToAdd = 1;
            break;

        case 2:
            daysToAdd = 3;
            break;

        case 3:
            daysToAdd = 7;
            break;

        case 4:
            daysToAdd = 15;
            break;

        default:
            daysToAdd = 30
    }

    today.setDate(today.getDate() + daysToAdd);

    return today;
}

export default getNextRevisionDate;