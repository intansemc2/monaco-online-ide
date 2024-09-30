const FILESIZE_UNIT = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function filesizeVisiable(filesize_in_bytes: number, accuracy: number = 2) {
	if (isNaN(filesize_in_bytes)) return '';
	if (typeof filesize_in_bytes == 'string') filesize_in_bytes = parseInt(filesize_in_bytes);

	const isNegative = filesize_in_bytes < 0;

	let count = Math.abs(filesize_in_bytes);
	let size_index = 0;
	while (count >= 1024 && size_index < FILESIZE_UNIT.length - 1) {
		count /= 1024;
		size_index += 1;
	}

	accuracy = Math.pow(10, accuracy);
	const resultSize = Math.floor(count * accuracy) / accuracy;
	const resultLabel = FILESIZE_UNIT[size_index];

	return `${isNegative ? '-' : ''}${resultSize}${resultLabel}`;
}

export { filesizeVisiable };
