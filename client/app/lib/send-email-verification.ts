import { type EmailVerificationRequest } from "@prisma/client";
import { send } from "./mail.server";
import { prisma } from "./prisma.server";
import { randomStr } from "./random-str";

async function sendEmailVerification(email: string) {
	const existingVerification = await prisma.emailVerificationRequest.findFirst({
		where: { email },
	});

	if (!existingVerification) {
		const verification = await prisma.emailVerificationRequest.create({
			data: {
				token: randomStr(48),
				email,
			},
		});

		return await sendEmail(verification);
	}

	// [ ]: Resend email when verification is re-requested. But we should
  // make sure this is not spammed
}

async function sendEmail(verification: EmailVerificationRequest) {
	
	const { email, token } = verification;

	const link = [
		`https://ttucampus.org/verify-email/?`,
		`email=${email}`,
		`&token=${token}`,
	].join("");

	return await send({
		to: verification.email,
		from: "ttucampus.org",
		subject: "Account verification ✽ ttucampus",
		text: `Hi and welcome to ttucampus,\n\nClick the following link to verify your account: ${link}.\n\nSee you!\n\n\n(You cannot reply to this email.)`,
	});
}

export { sendEmailVerification };