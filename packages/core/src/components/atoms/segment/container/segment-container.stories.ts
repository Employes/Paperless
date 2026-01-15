import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Segment/Container',
	component: 'p-segment-container',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: () => html`
		<p-segment-container>
			<p-segment-item>Item 1</p-segment-item>
			<p-segment-item>Item 2</p-segment-item>
			<p-segment-item active>Item 3</p-segment-item>
			<p-segment-item>Item 4</p-segment-item>
			<p-segment-item>Item 5</p-segment-item>
		</p-segment-container>
	`,
};

export const Block = {
	render: () => html`
		<div class="h-32 max-w-[17.5rem]">
			<p-segment-container>
				<p-segment-item
					variant="block"
					icon="company"
					active
				>
					<span slot="title">Kantoor</span>
					<span slot="description">
						Ik voeg de klant toe en doe de verloning namens de klant
					</span>
				</p-segment-item>
				<p-segment-item
					variant="block"
					icon="envelope"
				>
					<span slot="title">Klant</span>
					<span slot="description">
						Ik nodig de klant uit om de verloning via Employes te doen
					</span>
				</p-segment-item>
			</p-segment-container>
		</div>
	`,
};
