export const childOf = (c, p) => {
    while ((c = c.parentNode) && c !== p);
    return !!c;
};

export const childOfComposed = (event: MouseEvent, p) => {
	return event?.composedPath().includes(p)
};
