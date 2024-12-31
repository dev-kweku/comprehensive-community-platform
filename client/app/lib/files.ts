function ellipsizeFilename(name: string, length = 14) {
	const parts = name.split(".");
	const [filename, ...rest] = parts;
	const extension = rest.pop() || "";
	const fn = [filename, ...rest].join(".").substring(0, length);

	if ((`${fn}.${extension}`).length <= length) {
		return name;
	}

	return [fn, extension].join("…");
}

function humanizeSize(s: number) {
	const units = ["B", "KB", "MB", "GB"];
	let i = 0;
	let size = s;
	while (size >= 1024 && i < units.length) {
		size /= 1024;
		i++;
	}
	return `${size.toFixed(1)}${units[i]}`;
}

export { ellipsizeFilename, humanizeSize };