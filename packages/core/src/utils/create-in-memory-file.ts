export const createInMemoryFile = async (file: File) => {
	const buffer = await file.arrayBuffer();
	return new File([buffer], file.name, {
		type: file.type,
		lastModified: file.lastModified,
	});
};
