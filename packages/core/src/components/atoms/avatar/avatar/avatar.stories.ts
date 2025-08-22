import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Avatar/Avatar',
	component: 'p-avatar',
};

export default meta;

export const Default = {
	render: ({
		size,
		'default-image': defaultImage,
		src,
		letters,
		variant,
	}) => html`<p-avatar
		size=${size ?? nothing}
		variant=${variant ?? nothing}
		default-image=${defaultImage ?? nothing}
		src=${src ?? nothing}
		letters=${letters ?? nothing}
	/>`,
};
