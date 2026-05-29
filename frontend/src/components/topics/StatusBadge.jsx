

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    revision: "bg-purple-100 text-purple-700"
}

const StatusBadge = ({ status }) => {

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}>
            {status}
        </span>
    )
}

export default StatusBadge;