

const YearFilter = ({ years, selectedYear, onChange }) => {

    return(
        <select
        value={selectedYear}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-3 border rounded-lg"
        >
            {
                years.map((year) => (

                    <option key={year} value={year}>
                        {year}
                    </option>
                ))
            }
        </select>
    )
}

export default YearFilter;