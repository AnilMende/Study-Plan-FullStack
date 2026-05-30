import { BarChart, Bar, CartesianGrid, 
    ResponsiveContainer, Tooltip, 
    XAxis, YAxis } from "recharts";

const WeeklyActivityChart = ({ data }) => {

    const formattedData = data.map((item) => ({

        date: new Date(item.date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric"
            }
        ),

        completed: item.completed
    }));


    if (!data?.length) {

        return (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

                <h3 className="font-semibold text-gray-900">
                    Weekly Activity
                </h3>

                <p className="text-gray-500 mt-4">
                    No completed topics yet.
                </p>

            </div>
        )
    }

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900">
                    Weekly Activity
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Topics completed over time
                </p>

            </div>

            {/* Chart */}
            <div className="h-[320px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={formattedData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="completed"
                            radius={[8, 8, 0, 0]}
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default WeeklyActivityChart;