import { Search } from "lucide-react";

const SubjectsHeader = ({ search, setSearch, onCreate }) => {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Left */}
            <div>

                <p className="text-gray-500 mt-1">
                    Manage your study subjects and track progress.
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">

                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search subjects..."
                        className="w-[250px] pl-10 pr-4 py-3 rounded-xl border 
                      border-gray-400 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Create button */}
                <button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700 
                text-white px-5 py-3 rounded-xl font-medium transition-all cursor-pointer"
                >
                    + Create Subject
                </button>

            </div>

        </div>
    )
}

export default SubjectsHeader;