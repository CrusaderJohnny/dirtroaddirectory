// Helper function to convert created at strings to dates
// Input example of article.created_at.toString() = 2025-08-01T12:07:38.657Z
// Output example formattedDate = 2025-08-01

interface ConvertDateProps {
    inputtedDate: string;
}

export default function ConvertDate( { inputtedDate } : ConvertDateProps ) {

    let formattedDate = inputtedDate;

    if (inputtedDate.includes("T")) {
        formattedDate = inputtedDate.split("T")[0];
    }

    return (
        <>
            {formattedDate}
        </>
    );
}
