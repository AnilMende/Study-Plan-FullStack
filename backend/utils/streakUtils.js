

export const calculateCurrentStreak = (studyDates) => {

    if (!studyDates.length) {
        return 0;
    }

    let currentStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let checkDate = new Date(today);

    const todayString =
        today.toISOString().split("T")[0];

    const yesterday = new Date(today);

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const yesterdayString =
        yesterday.toISOString().split("T")[0];

    // If user didn't study today,
    // start counting from yesterday
    if (!studyDates.includes(todayString)) {

        // If user also missed yesterday,
        // streak is broken
        if (
            !studyDates.includes(
                yesterdayString
            )
        ) {
            return 0;
        }

        checkDate = yesterday;
    }

    while (

        studyDates.includes(
            checkDate
                .toISOString()
                .split("T")[0]
        )

    ) {

        currentStreak++;

        checkDate.setDate(
            checkDate.getDate() - 1
        );
    }

    return currentStreak;
}