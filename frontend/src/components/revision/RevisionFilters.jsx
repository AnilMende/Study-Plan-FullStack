import { Search } from "lucide-react";


const filters = [
    "all",
    "never",
    "1-3",
    "4+"
];

const RevisionFilters = ({ activeFilter, setActiveFilter, searchTerm, setSearchTerm }) => {

    return (
        <div className="flex items-center justify-between gap-4">

            <div className="flex gap-2">

                {
                    filters.map((filter) => (

                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                            px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer
                            
                            ${activeFilter === filter
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                                }
                        `}
                        >
                            {filter}
                        </button>
                    ))
                }

            </div>

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search revision topics...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-5 py-2 border border-gray-400 rounded-xl outline-none 
                    focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}

export default RevisionFilters;