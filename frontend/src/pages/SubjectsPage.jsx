import { useEffect, useMemo, useState } from "react";
import { getAllSubjectsProgress } from "../services/subjectService.js";
import SubjectsHeader from "../components/subjects/SubjectsHeader.jsx";
import SubjectsGrid from "../components/subjects/SubjectsGrid.jsx";
import CreateSubjectModel from "../components/subjects/CreateSubjectModel.jsx";


const SubjectsPage = () => {

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);


    // fetch subjects
    useEffect(() => {

        const fetchSubjects = async () => {

            try {

                const data = await getAllSubjectsProgress();

                setSubjects(data);

                //console.log(data);

            } catch (error) {

                console.log(error);

            } finally {
                setLoading(false);
            }
        }

        fetchSubjects();

    }, [])

    // Filter subjects
    const filteredSubjects = useMemo(() => {

        return subjects.filter((subject) =>
            subject.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [subjects, search]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <SubjectsHeader
                search={search}
                setSearch={setSearch}
                onCreate={() => setOpenModal(true)}
            />

            {/* Loading */}
            {
                loading ? (
                    <div>
                        Loading Subjects...
                    </div>
                ) : (
                    <SubjectsGrid subjects={filteredSubjects} />
                )
            }

            {/* Modal */}
            {
                openModal && (
                    <div>
                        <CreateSubjectModel
                            onClose={() => setOpenModal(false)}
                            onSubjectCreated={(newSubject) => {
                                setSubjects((prev) => [newSubject, ...prev]);
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default SubjectsPage;