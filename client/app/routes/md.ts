import { ActionFunctionArgs } from "@remix-run/node";
import { render } from "../lib/render.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	if (request.method !== "POST") {
		return Response.json({ message: "Method not allowed" }, { status: 405 });
	}

	const { content } = await request.json();
	const rendered = await render(content);

	return Response.json({ rendered });
};