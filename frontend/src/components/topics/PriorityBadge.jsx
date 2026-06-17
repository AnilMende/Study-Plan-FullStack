
const priorityStyles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700"
}

const PriorityBadge = ({ priority }) => {

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${priorityStyles[priority]}`}>
            {priority}
        </span>
    )
}

export default PriorityBadge;