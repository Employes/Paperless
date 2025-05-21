import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Organisms/Stepper',
	component: 'p-stepper',
	args: {
		align: 'start'
	},
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

export const Horizontal = {
	render: ({
		'active-step': activeStep,
		'enable-auto-status': enableAutoStatus,
		'content-position': contentPosition,
	}) => html`<p-stepper
		active-step=${activeStep ?? nothing}
		enable-auto-status=${enableAutoStatus ?? nothing}
		direction="horizontal"
		content-position=${contentPosition ?? nothing}
	>
		<p-stepper-item>Step 1</p-stepper-item>
		<p-stepper-item>Step 2</p-stepper-item>
		<p-stepper-item>Step 3</p-stepper-item>
	</p-stepper>`,
	tags: ['!dev'],
};

export const Vertical = {
	render: ({
		'active-step': activeStep,
		'enable-auto-status': enableAutoStatus,
		'content-position': contentPosition,
		align,
	}) => html`<p-stepper
		direction="vertical"
		active-step=${activeStep ?? nothing}
		enable-auto-status=${enableAutoStatus ?? nothing}
		align=${align ?? nothing}
		content-position=${contentPosition ?? nothing}
	>
		<p-stepper-item>
			<p-card-container>
				<p-card-body>Some content</p-card-body>
			</p-card-container>
		</p-stepper-item>
		<p-stepper-item>
			<p-card-container>
				<p-card-body>Some content but longer <br /> loooong <br /> Even longuuuuur</p-card-body>
			</p-card-container>
		</p-stepper-item>
		<p-stepper-item>
			<p-card-container>
				<p-card-body>Some content</p-card-body>
			</p-card-container>
		</p-stepper-item>
	</p-stepper>`,
	tags: ['!dev'],
};
