import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Loader',
	component: 'p-loader',
	args: {
		content: 'Loader',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
		show,
		variant,
		color,
		'modal-title': modalTitle,
		'modal-description': modalDescription,
	}) => html`<p-loader
		show=${show ?? nothing}
		variant=${variant ?? nothing}
		color=${color ?? nothing}
		modal-title=${modalTitle ?? nothing}
		modal-description=${modalDescription ?? nothing}
	>
		${content}
	</p-loader>`,
};
