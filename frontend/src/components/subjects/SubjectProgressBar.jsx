

const SubjectProgressBar = ({ progress = 0, color = "#3B82F6" }) => {

    return (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                    width: `${progress}%`,
                    backgroundColor: color
                }}
            />
        </div>
    )
}

export default SubjectProgressBar;