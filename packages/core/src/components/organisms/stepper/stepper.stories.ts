import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Organisms/Stepper',
	component: 'p-stepper',
	args: {
		steps: JSON.stringify([{ content: 'Step 1', icon: 'car' }, { content: 'Step 2', icon: 'user' }, { content: 'Step 3', icon: 'cake'}]),
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
		steps,
		variant,
	}) => html`
		<p-stepper
			active-step=${activeStep ?? nothing}
			enable-auto-status=${enableAutoStatus ?? nothing}
			direction="horizontal"
			content-position=${contentPosition ?? nothing}
			steps=${steps ?? nothing}
			variant=${variant ?? nothing}
		>
		</p-stepper>
	`,
};

export const Vertical = {
	render: ({
		'active-step': activeStep,
		'enable-auto-status': enableAutoStatus,
		'content-position': contentPosition,
		align,
		variant,
	}) => html`
		<p-stepper
			direction="vertical"
			active-step=${activeStep ?? nothing}
			enable-auto-status=${enableAutoStatus ?? nothing}
			align=${align ?? nothing}
			content-position=${contentPosition ?? nothing}
			variant=${variant ?? nothing}
		>
			<p-stepper-item>
				<p-card-container>
					<p-card-body>
						Some content but longer <br />
						loooong <br />
						Even longuuuuur
					</p-card-body>
				</p-card-container>
			</p-stepper-item>
			<p-stepper-item>
				<p-card-container>
					<p-card-body>
						Some content but longer <br />
						loooong <br />
						Even longuuuuur
					</p-card-body>
				</p-card-container>
			</p-stepper-item>
			<p-stepper-item>
				<p-card-container>
					<p-card-body>Some content</p-card-body>
				</p-card-container>
			</p-stepper-item>
		</p-stepper>
	`,
};
