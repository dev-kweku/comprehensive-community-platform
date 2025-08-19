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

    const values = {
    initialized: false,
    values: {} as Values,

    async load() {
        if (!this.initialized) {
        const schoolId = process.env.SCHOOL ?? "ttu";
        const res = await fetch(`/res/${schoolId}.json`);
        this.values = await res.json();
        this.initialized = true;
        }
        return this.values;
    },

    async get(key: Paths<Values>) {
        const data = await this.load();
        return lodashGet(data, key);
    },

    async meta() {
        const data = await this.load();
        return {
        id: data.id,
        shortName: data.shortName,
        };
    },
    };

    export { values };
