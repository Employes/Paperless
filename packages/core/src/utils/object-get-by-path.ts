/* eslint-disable @typescript-eslint/no-explicit-any */
export const objectGetByPath = (obj: any, path: string, defaultValue?) => {
	const travel = regexp =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			// eslint-disable-next-line unicorn/no-array-reduce
			.reduce(
				(res, key) => (res !== null && res !== undefined ? res[key] : res),
				obj
			);
	const result = travel(/[,[\]]+?/) || travel(/[,.[\]]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};
