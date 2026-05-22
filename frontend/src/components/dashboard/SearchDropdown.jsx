import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axios.js";


const SearchDropdown = () => {

    const [query, setQuery] = useState("");

    const [results, setResults] = useState(null);

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const timeout = setTimeout(() => {
            if (query.trim()) {
                fetchResults();
            }
            else {
                setResults(null);
            }
        }, 500);

        return () => clearTimeout(timeout);

    }, [query]);


    const fetchResults = async () => {

        try {

            setLoading(true);

            const response = await api.get(`/search?q=${query}`);

            setResults(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative w-[350px]">

            {/* Input */}
            <input
                type="text"
                placeholder="Search topics or subjects.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 outline-none"
            />

            {/* Dropdown */}
            {
                query && (

                    <div className="absolute top-full mt-3 w-full bg-white rounded-2xl 
                    shadow-lg border border-gray-100 p-3 z-50">

                        {
                            loading ? (
                                <p className="text-sm text-gray-500">

                                    Searching...

                                </p>
                            ) : (
                                <>

                                    {/* Subjects */}
                                    {
                                        results?.subjects?.length > 0 && (

                                            <div className="mb-4">

                                                <h3 className="text-xs font-semibold text-gray-400 mb-2">
                                                    SUBJECTS
                                                </h3>

                                                {
                                                    results.subjects.map(subject => (

                                                        <div
                                                            key={subject.id}
                                                            className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer"
                                                        >
                                                            📚 {subject.name}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }


                                    {/* Topics */}
                                    {
                                        results?.topics?.length > 0 && (

                                            <div>
                                                <h3 className="text-xs font-semibold text-gray-400 mb-2">
                                                    TOPICS
                                                </h3>
                                                {
                                                    results.topics.map(topic => (

                                                        <div
                                                            key={topic.id}
                                                            className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer"
                                                        >
                                                            <p className="font-medium">

                                                                {topic.title}

                                                            </p>

                                                            <p className="text-sm text-gray-500">

                                                                {topic.subject}

                                                            </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }


                                    {
                                        !results?.subjects?.length &&
                                        !results?.topics?.length && (

                                            <p className="text-sm text-gray-500">

                                                No results found

                                            </p>
                                        )
                                    }
                                </>
                            )

                        }

                    </div>
                )
            }
        </div>
    )
}

export default SearchDropdown;