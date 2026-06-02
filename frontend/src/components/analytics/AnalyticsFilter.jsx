
const options = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 }
]

const AnalyticsFilter = ({ range, setRange }) => {

    return (
        <div className="flex items-center gap-2">
            {
                options.map((option) => (

                    <button
                        key={option.value}
                        onClick={
                            () => setRange(option.value)
                        }
                        className={
                            `px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer
                            ${range === option.value
                                ? "bg-blue-600 text-white"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                            `
                        }
                    >
                        {option.label}
                    </button>
                ))
            }
        </div>
    )
}

export default AnalyticsFilter;