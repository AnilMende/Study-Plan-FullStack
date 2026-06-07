

const MonthlyStats = ({ monthlyStats }) => {

    return (
        <div
            className="
                grid
                grid-cols-4
                gap-4
            "
        >

            {
                monthlyStats.map(
                    month => (

                        <div
                            key={month.month}
                            className="
                            bg-white
                            p-4
                            rounded-xl
                            border
                        "
                        >

                            <h4>
                                {month.month}
                            </h4>

                            <p>
                                {
                                    month.studyDays
                                } Study Days
                            </p>

                            <p>
                                {
                                    month.activities
                                } Activities
                            </p>

                        </div>

                    ))
            }

        </div>
    )
}

export default MonthlyStats;