import lodashGet from "lodash.get";
import type { Paths } from "type-fest";

import ttu from "../../public/res/ttu.json"; // ✅ Import directly instead of fs

export interface Values {
	id: string;
	name: string;
	shortName: string;
	semester: Semester;
	examination: Examination;
	emailExtentions: string[]; // ✅ fixed spelling
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

// ✅ Map schools to imported JSON
const schools: Record<string, Values> = {
	ttu: {
		...ttu,
		// ✅ normalize spelling (if JSON still has "emailExtentions")
		emailExtentions: (ttu as any).emailExtentions ?? ttu.emailExtentions,
	},
};

const values = {
	initialized: false,
	values: {} as Values,
	get(key: Paths<Values>) {
		if (!this.initialized) {
			const schoolId = process.env.SCHOOL ?? "ttu"; // default fallback
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
