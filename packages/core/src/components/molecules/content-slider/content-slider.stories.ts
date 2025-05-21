import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Content slider',
	component: 'p-content-slider',
	args: {
		content: 'ContentSlider',
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
		'hide-mobile-indicator': hideMobileIndicator,
		'disable-drag': disableDrag,
		'disable-auto-center': disableAutoCenter,
		'disable-indicator-click': disableIndicatorClick,
	}) => html`<p-content-slider
		hide-mobile-indicator=${hideMobileIndicator ?? nothing}
		disable-drag=${disableDrag ?? nothing}
		disable-auto-center=${disableAutoCenter ?? nothing}
		disable-indicator-click=${disableIndicatorClick ?? nothing}
	>
		${content}
	</p-content-slider>`,
	tags: ['!dev'],
};
