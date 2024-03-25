import { useEffect, useState } from "react";
import axios from "axios";
import { Homework } from "../types/Homework.ts";

export default function HomeworkList() {
    const [homeworks, setHomeworks] = useState<Homework | null>(null);
    const [error, setError] = useState<string | null>(null);

    const id = "65fe82f3153cb34381a24649";

    useEffect(() => {
        axios.get(`/api/homeworks/${id}`)
            .then(response => {
                setHomeworks(response.data);
            })
            .catch(error => {
                console.error("Error fetching homework details:", error);
                setError("Error fetching homework details.");
            });
    }, [id]);

    function downloadPDF() {
        if (homeworks && homeworks.file) {
            const blob = new Blob([homeworks.file], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${homeworks.title}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log(homeworks);
        } else {
            setError("No homework data found or file is missing.");
        }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            {error && <span>Error: {error}</span>}
            {homeworks && (
                <>
                    <span>{homeworks.title}</span>
                    <button onClick={downloadPDF}>Download PDF</button>
                </>
            )}
            {!homeworks && !error && <span>Loading...</span>}
        </div>
    );
}
