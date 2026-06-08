

const YearFilter = ({ availableYears, selectedYear, onYearChange }) => {

    return (
        <select
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        "
        >
            {
                availableYears.map((year) => (

                    <option key={year} value={year}>
                        {year}
                    </option>
                ))
            }
        </select>
    )
}

export default YearFilter;