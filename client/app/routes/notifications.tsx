import {
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import parse from "html-react-parser";
import { postTime } from "../components/post-time";
import { checkAuth } from "../lib/check-auth";
import { prisma } from "../lib/prisma.server";
import { render } from "../lib/render.server";
import { values } from "../lib/values.server";
import { Key } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await checkAuth(request);

	const notifications = await prisma.notificationSubscriber.findMany({
		where: { userId },
		include: { notification: true },
		orderBy: { notification: { createdAt: "desc" } },
	});

	for (const notification of notifications) {
		notification.notification.message = await render(
			notification.notification.message,
		);
	}

	return Response.json({ school: values.meta(), notifications });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: `Notifications | ${data?.school.shortName} ✽ ttucampus` },
		{
			name: "notifications",
			content: "Find out about all your unread notifications",
		},
	];
};

export default function Notifications() {
	const { notifications } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto min-h-[60vh]">
			<h1 className="font-bold text-xl mb-2">Notifications</h1>

			<ul>
				{notifications.map((notification: { notification: { entityType: unknown; id: unknown; message: string; createdAt: string | Date; }; id: Key | null | undefined; read: unknown; }) => {
					const notificationType = notification.notification.entityType;
					return (
						<li key={notification.id}>
							<NavLink
								to={`/notifications/${notification.notification.id}`}
								className={clsx(
									"flex hover:bg-zinc-100 dark:hover:bg-neutral-800 px-2 py-1",
									{
										"opacity-60": notification.read,
									},
								)}
							>
								<div
									className={clsx("me-2 text-secondary mt-1", {
										"i-lucide-message-square": notificationType === "post",
										"i-lucide-users": notificationType === "community",
									})}
								/>

								<div className="flex flex-1 gap-2 max-sm:block">
									<div className="flex-1">
										{parse(notification.notification.message)}
									</div>

									<div className="text-sm text-secondary">
										{postTime(notification.notification.createdAt)}
									</div>
								</div>
							</NavLink>
						</li>
					);
				})}
			</ul>

			{notifications.length === 0 && (
				<div className="text-secondary font-medium flex gap-2">
					<div className="i-lucide-coffee" /> Fresh. You&apos;ve got nothing to worry
					about.
				</div>
			)}
		</div>
	);
}