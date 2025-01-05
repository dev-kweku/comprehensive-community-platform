import {
	useFetcher,
	useLoaderData,
	useParams,
	useRouteLoaderData,
} from "@remix-run/react";
import dayjs from "dayjs";
import type { loader as rootLoader } from "~/root";
import type { loader } from "../routes/communities_.$slug";
import { Anchor } from "./anchor";
import { Avatar } from "./avatar";
import { Button } from "./button";

function CommunityInfo() {
	const { user } = useRouteLoaderData<typeof rootLoader>("root") || {};
	const { community, membership, members } = useLoaderData<typeof loader>();
	const { slug } = useParams();
	const fetcher = useFetcher();

	async function join() {
		fetcher.submit("", {
			action: `/communities/${slug}/members`,
			method: "POST",
		});
	}

	return (
		<>
			<h1 className="font-bold text-lg leading-none">{community.name}</h1>
			<div className="bg-rose-100 dark:bg-rose-900 dark:bg-opacity-20 rounded-lg inline-block text-rose-500 font-medium px-1 text-sm">
				+{community.handle}
			</div>

			{/* <div className="rounded-lg aspect-[5/2] bg-zinc-100 dark:bg-neutral-800 mt-2" /> */}

			<p className="">{community.description}</p>

			{!membership && (
				<div className="border dark:border-neutral-800 rounded-lg p-2 mt-2">
					<header className="font-mono text-xs text-secondary">
						Join to interact
					</header>
					<p className="text-sm">
						To be able to start and participate in conversations in this
						community, you need to join first.
					</p>

					<div className="mt-2">
						{!user ? (
							<Anchor to="/login">Login & join</Anchor>
						) : (
							<Button
								variant="secondary"
								disabled={fetcher.state === "submitting"}
								onClick={join}
							>
								{fetcher.state === "submitting" ? (
									<>Joining</>
								) : (
									<>Join community</>
								)}
							</Button>
						)}
					</div>
				</div>
			)}

			{user && membership && (
				<div className="flex gap-2">
					<div className="text-xs text-secondary">
						Member since {dayjs(membership.createdAt).format("DD MMM YYYY")}
					</div>
					{/** [ ] Add "leave community" */}
				</div>
			)}

			{/* <div className="border rounded-lg p-2 mt-2">
						<header className="font-mono text-xs text-secondary">
							Upcoming event
						</header>
						<p className="text-sm">Lecture 7: Developing a pixel art editor</p>
						<p className="text-secondary text-sm font-medium">Sat, 17 Apr.</p>
					</div> */}

			<div className="max-lg:hidden">
				<div className="flex gap-2 items-center mt-2 font-medium text-secondary text-sm">
					<div className="i-lucide-users-2 inline-block" />
					{community.members} members
				</div>

				<ul>
					{members.map((member) => (
						<li key={member.userId}>
							<div className="flex gap-2 py-1 px-2 rounded-lg hover:bg-zinc-100 items-center hover-bg-light">
								<Avatar size={22} name={member.user.username} />

								<div>
									{member.user.username}{" "}
									{member.role === "moderator" && (
										<span className="bg-zinc-200 dark:bg-neutral-800 rounded-full px-2 text-sm text-secondary font-medium">
											MOD
										</span>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export { CommunityInfo };