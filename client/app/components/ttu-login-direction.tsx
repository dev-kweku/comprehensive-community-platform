function TtuLoginDirection() {
	return (
		<div className="bg-red-50 dark:bg-red-700 dark:bg-opacity-10 p-2 rounded-lg mt-4">
			To log into your email, go to{" "}
			<a
				className="underline text-red-500 dark:text-red-400"
				target="_blank"
				href="https://gmail.com/login"
				rel="noreferrer"
			>
				gmail.com/login
			</a>
			, enter your school email and password to access your account.
		</div>
	);
}

export { TtuLoginDirection };