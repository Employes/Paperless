import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Button group',
	component: 'p-button-group',
};

export default meta;

export const Default = {
	render: ({ size }) => html`<p-button-group size=${size ?? nothing}>
		<p-button>One</p-button>
		<p-button>Two</p-button>
		<p-button>Three</p-button>
	</p-button-group>`,
};
