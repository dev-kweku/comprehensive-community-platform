import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { TimetableFilter } from "../components/timetable-filter";
import { userPrefs } from "../lib/cookies.server";
import { prisma } from "../lib/prisma.server";
import { values } from "../lib/values.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const cookie = (await userPrefs.parse(request.headers.get("Cookie"))) || {};

	const { programme, year, level, sem } = cookie;

	if (programme && year && level) {
		const day = dayjs().day();
		return redirect(`/timetable/${year}/${programme}/${level}/${sem}/${day}`);
	}

	const programmes = await prisma.programme.findMany({
		orderBy: { name: "asc" },
	});

	const school = values.get("shortName") as string;
	const schoolSem = values.get("semester") as unknown as number;

	return { programmes, school, schoolSem };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `Timetable | ${data?.school} ✽ ttucampus` }];
};

export default function Timetable() {
	const { programmes, schoolSem } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto min-h-[70vh] pt-4">
			<div className="grid grid-cols-1 lg:grid-cols-5">
				<div className="col-span-1 lg:col-span-3">
					<TimetableFilter currentSem={schoolSem} programmes={programmes} />
				</div>
			</div>
		</div>
	);
}