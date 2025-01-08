import { ActionFunctionArgs } from "@remix-run/node";
import { checkAuth } from "../lib/check-auth";
import { prisma } from "../lib/prisma.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const userId = await checkAuth(request);
	const user = await prisma.user.findUnique({ where: { id: userId } });

	if (request.method !== "POST") {
		return Response.json({}, { status: 405 });
	}

	const community = await prisma.community.findFirst({
		where: { handle: params.slug },
	});

	if (!community) {
		return Response.json({}, { status: 404 });
	}

	await prisma.communityMember.create({
		data: { communityId: community.id, userId },
	});

	const count = await prisma.communityMember.count({
		where: { communityId: community.id },
	});

	await prisma.community.update({
		where: { id: community.id },
		data: { members: count },
	});

	const notification = await prisma.notification.create({
		data: {
			message: `You have a new member (@${user?.username}) in your community (${community.name}).`,
			entityId: community.id,
			entityType: "community",
			actorId: userId,
		},
	});

	await prisma.notificationSubscriber.create({
		data: {
			notificationId: notification.id,
			userId: community.createdById,
		},
	});

	return null;
};