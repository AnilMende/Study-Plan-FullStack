
const StatsCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg
}) => {
    return (

        <div className="bg-white rounded-2xl border border-gray-200 p-5 
        flex items-start justify-between">

            {/* Left */}
            <div>
                <p className="text-sm text-gray-700 mb-2">
                    {title}
                </p>

                <h3 className="text-3xl font-bold text-gray-900">
                    {value}
                </h3>

                <p className="text-sm text-blue-600 mt-3 font-medium cursor-pointer">
                    {subtitle}
                </p>
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
                {icon}
            </div>
        </div>
    )
}

export default StatsCard;