import { html } from 'lit';

const meta = {
	title: 'Design System/Organisms/Listing',
	component: 'p-listing',
	parameters: {
		docs: {
			iframeHeight: 600,
			story: {
				height: '700px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: () => html`<p-listing>
		<p-listing-item icon="user">
			<p>Item number 1</p>
			<p class="text-xs text-storm-300">Sub text of item 1</p>
		</p-listing-item>
		<p-listing-item icon="calendar">
			<p>Item number 2</p>
			<p class="text-xs text-storm-300">Sub text of item 2</p>
		</p-listing-item>
		<p-listing-item icon="pay">
			<p>Item number 3</p>
			<p class="text-xs text-storm-300">Sub text of item 3</p>
		</p-listing-item>
	</p-listing>`,
};
