import { Check, X } from "lucide-react";


const WeeklyStreakTracker = ({ days = [] }) => {

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    Weekly Consistency
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Your study activity over the last 7 days
                </p>

            </div>

            <div className="grid grid-cols-7 gap-4">
                {
                    days.map((day, index) => {

                        const weekday = new Date(
                            day.date
                        ).toLocaleDateString(
                            "en-Us",
                            {
                                weekday: "short"
                            }
                        );

                        return (

                            <div key={`${day.date}-${index}`} className="flex flex-col items-center gap-3">

                                <span className="text-sm font-medium text-gray-500">
                                    {weekday}
                                </span>

                                <div
                                    className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    transition-all
                                    cursor-pointer

                                    ${day.studied
                                            ? "bg-green-100 text-green-600 hover:bg-green-200 border border-green-200"
                                            : "bg-gray-100 text-gray-400 hover:bg-gray-200 border border-gray-200"
                                        }
                                `}
                                >
                                    {
                                        day.studied
                                            ? <Check size={20} />
                                            : <div className="w-3 h-3 rounded-full bg-gray-400" />
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className="mt-6 p-4 border-t border-gray-100">

                <div className="flex justify-between">

                    <span className="text-sm text-gray-500">
                        Weekly Consistency
                    </span>

                    <span className="font-semibold text-gray-900">
                        {
                            Math.round(
                                (days.filter(d => d.studied).length / days.length) * 100
                            )
                        }%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default WeeklyStreakTracker;