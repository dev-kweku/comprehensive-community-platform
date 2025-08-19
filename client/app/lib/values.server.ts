    import lodashGet from "lodash.get";
    import type { Paths } from "type-fest";
    import ttuJson from "~/res/ttu.json";

    export interface Values {
    id: string;
    name: string;
    shortName: string;
    semester: Semester;
    examination: Examination;
    emailExtentions: string[];
    }

    export interface Semester {
    number: number;
    start: string;
    end: string;
    }

    export interface Examination {
    start: string;
    end: string;
    }

    const schools: Record<string, Values> = {
    ttu: {
        ...ttuJson,
        emailExtentions:
        (ttuJson as any).emailExtentions ?? ttuJson.emailExtentions,
    },
    };

    const values = {
    get(key: Paths<Values>) {
        const schoolId = process.env.SCHOOL ?? "ttu";
        return lodashGet(schools[schoolId], key);
    },
    meta() {
        const schoolId = process.env.SCHOOL ?? "ttu";
        return {
        id: schools[schoolId].id,
        shortName: schools[schoolId].shortName,
        };
    },
    };

    export { values };
