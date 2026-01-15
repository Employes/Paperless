import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Content slider',
	component: 'p-content-slider',
};

export default meta;

export const Default = {
	render: ({
		'hide-mobile-indicator': hideMobileIndicator,
		'disable-drag': disableDrag,
		'disable-auto-center': disableAutoCenter,
		'disable-indicator-click': disableIndicatorClick,
	}) => html`
		<p-content-slider
			hide-mobile-indicator=${hideMobileIndicator ?? nothing}
			disable-drag=${disableDrag ?? nothing}
			disable-auto-center=${disableAutoCenter ?? nothing}
			disable-indicator-click=${disableIndicatorClick ?? nothing}
		>
			<p-card-container class="w-full">
				<p-card-header header="card"></p-card-header>
				<p-card-body>
					Some text in the<br />
					card body <br />
					to give it some height
				</p-card-body>
			</p-card-container>
			<p-card-container class="w-full">
				<p-card-header header="card"></p-card-header>
				<p-card-body>
					Some text in the<br />
					card body <br />
					to give it some height
				</p-card-body>
			</p-card-container>
			<p-card-container class="hidden w-full desktop-xs:block">
				<p-card-header header="card"></p-card-header>
				<p-card-body>
					Some text in the<br />
					card body <br />
					to give it some height
				</p-card-body>
			</p-card-container>
		</p-content-slider>
	`,
};
