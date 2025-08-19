    import lodashGet from "lodash.get";
    import type { Paths } from "type-fest";

    // ✅ Make sure the path points inside `app/` or `client/`
    import ttuJson from "../res/ttu.json";  

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

    // ✅ Normalize spelling if JSON still has "emailExtentions"
    const ttu: Values = {
    ...ttuJson,
    emailExtentions: (ttuJson as any).emailExtentions ?? ttuJson.emailExtentions,
    };

    const schools: Record<string, Values> = {
    ttu,
    };

    const values = {
    initialized: false,
    values: {} as Values,
    get(key: Paths<Values>) {
        if (!this.initialized) {
        const schoolId = process.env.SCHOOL ?? "ttu";
        this.values = schools[schoolId];
        this.initialized = true;
        }
        return lodashGet(this.values, key);
    },
    meta() {
        return {
        id: this.get("id"),
        shortName: this.get("shortName"),
        };
    },
    };

    export { values };
