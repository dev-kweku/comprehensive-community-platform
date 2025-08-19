    import lodashGet from "lodash.get";
    import type { Paths } from "type-fest";

    export interface Values {
    id: string;
    name: string;
    shortName: string;
    semester: Semester;
    examination: Examination;
    emailExtentions: string[]; // keep typo if that's how JSON is defined
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

    // Embedded JSON data
    const staticValues: Values = {
    id: "ttu",
    name: "Takoradi Technical University",
    shortName: "TTU",
    semester: {
        number: 2,
        start: "2025-01-11",
        end: "2025-03-24"
    },
    examination: {
        start: "2025-01-08",
        end: "2025-08-23"
    },
    emailExtentions: ["ttu.edu.gh"]
    };

    const values = {
    // Synchronous version of get()
    get(key: Paths<Values>) {
        return lodashGet(staticValues, key);
    },

    // Synchronous version of meta()
    meta() {
        return {
        id: staticValues.id,
        shortName: staticValues.shortName,
        };
    },

    // Keep async versions if needed for backward compatibility
    async load() {
        return staticValues;
    },

    async getAsync(key: Paths<Values>) {
        return lodashGet(staticValues, key);
    },

    async metaAsync() {
        return {
        id: staticValues.id,
        shortName: staticValues.shortName,
        };
    }
    };

    export { values };



    