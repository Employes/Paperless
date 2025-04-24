import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Modal/Body',
	component: 'p-modal-body',
	args: {
		content: 'ModalBody',
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
		variant,
		'rounded-bottom': roundedBottom,
		'rounded-top': roundedTop,
		padding,
	}) => html`<p-modal-body
		variant=${variant ?? nothing}
		rounded-bottom=${roundedBottom ?? nothing}
		rounded-top=${roundedTop ?? nothing}
		padding=${padding ?? nothing}
	>
		${content}
	</p-modal-body>`,
	tags: ['!dev'],
};