import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Molecules/Table/Cell',
	component: 'p-table-cell',
	args: {
		content: 'TableCell',
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
		index,
		'row-index': rowIndex,
		definition,
		item,
		value,
		'table-has-actions': tableHasActions,
		checkbox,
		template,
	}) => html`<p-table-cell
		variant=${variant ?? nothing}
		index=${index ?? nothing}
		row-index=${rowIndex ?? nothing}
		definition=${definition ?? nothing}
		item=${item ?? nothing}
		value=${value ?? nothing}
		table-has-actions=${tableHasActions ?? nothing}
		checkbox=${checkbox ?? nothing}
		template=${template ?? nothing}
	>
		${content}
	</p-table-cell>`,
	tags: ['!dev'],
};