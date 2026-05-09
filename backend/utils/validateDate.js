import dayjs from "dayjs";
import cursomParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(cursomParseFormat);

const validateDate = (date) => {

    return dayjs(
        date,
        "YYYY-MM-DD",
        true
    ).isValid();
}

export default validateDate;