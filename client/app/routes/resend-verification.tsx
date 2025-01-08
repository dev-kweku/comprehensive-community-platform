import { useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs } from "react-router";
import { TtuLoginDirection } from "../components/ttu-login-direction";
import { sendEmailVerification } from "../lib/send-email-verification";
import { values } from "../lib/values.server";

export const loader = async ({ request }: ActionFunctionArgs) => {
	const email = new URL(request.url).searchParams.get("email");

	if (!email) {
		return new Response(null, { status: 400 });
	}

	await sendEmailVerification(email);

	return { school: values.meta() };
};

export const meta = () => {
	return [{ title: "Resend Verification ✽ ttucampus" }];
};

export default function ResendVerification() {
	const { school } = useLoaderData<typeof loader>();
	return (
		<div className="container min-h-[60vh] mx-auto">
			<div>Verification link sent</div>

			{school.id === "ttu" && <TtuLoginDirection />}
		</div>
	);
}