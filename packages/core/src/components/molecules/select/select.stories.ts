import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Select',
	component: 'p-select',
	args: {
		label: 'Label',
		items: JSON.stringify([
			{
				value: 'value',
				text: 'Option 1',
			},
			{
				value: 'value2',
				text: 'Option 2',
			},
			{
				value: 'value3',
				text: 'Option 3',
			},
		]),
		'identifier-key': 'value',
	},
};

export default meta;

export const Default = {
	render: ({
		items,
		multi,
		'use-portal': usePortal,
		strategy,
		icon,
		query,
		placeholder,
		'autocomplete-placeholder': autocompletePlaceholder,
		value,
		'display-key': displayKey,
		'dropdown-display-key': dropdownDisplayKey,
		'selection-display-key': selectionDisplayKey,
		'value-key': valueKey,
		'avatar-key': avatarKey,
		'icon-key': iconKey,
		'show-icon-in-selected-item': showIconInSelectedItem,
		'class-key': classKey,
		'apply-class-on-selected-item': applyClassOnSelectedItem,
		'avatar-letters-key': avatarLettersKey,
		'identifier-key': identifierKey,
		'query-key': queryKey,
		'auto-select-first': autoSelectFirst,
		'show-chevron': showChevron,
		'max-displayed-items': maxDisplayedItems,
		'enable-autocomplete': enableAutocomplete,
		'async-filter': asyncFilter,
		loading,
		'enable-select-all': enableSelectAll,
		'select-all-text': selectAllText,
		'select-all-icon': selectAllIcon,
		size,
		prefix,
		label,
		helper,
		required,
		error,
		disabled,
		'show-add-item': showAddItem,
		'add-item-text': addItemText,
		'empty-state-text': emptyStateText,
	}) => html`<p-select
		items=${items ?? nothing}
		multi=${multi ?? nothing}
		use-portal=${usePortal ?? nothing}
		strategy=${strategy ?? nothing}
		icon=${icon ?? nothing}
		query=${query ?? nothing}
		placeholder=${placeholder ?? nothing}
		autocomplete-placeholder=${autocompletePlaceholder ?? nothing}
		value=${value ?? nothing}
		display-key=${displayKey ?? nothing}
		dropdown-display-key=${dropdownDisplayKey ?? nothing}
		selection-display-key=${selectionDisplayKey ?? nothing}
		value-key=${valueKey ?? nothing}
		avatar-key=${avatarKey ?? nothing}
		icon-key=${iconKey ?? nothing}
		show-icon-in-selected-item=${showIconInSelectedItem ?? nothing}
		class-key=${classKey ?? nothing}
		apply-class-on-selected-item=${applyClassOnSelectedItem ?? nothing}
		avatar-letters-key=${avatarLettersKey ?? nothing}
		identifier-key=${identifierKey ?? nothing}
		query-key=${queryKey ?? nothing}
		auto-select-first=${autoSelectFirst ?? nothing}
		show-chevron=${showChevron ?? nothing}
		max-displayed-items=${maxDisplayedItems ?? nothing}
		enable-autocomplete=${enableAutocomplete ?? nothing}
		async-filter=${asyncFilter ?? nothing}
		loading=${loading ?? nothing}
		enable-select-all=${enableSelectAll ?? nothing}
		select-all-text=${selectAllText ?? nothing}
		select-all-icon=${selectAllIcon ?? nothing}
		size=${size ?? nothing}
		prefix=${prefix ?? nothing}
		label=${label ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		error=${error ?? nothing}
		disabled=${disabled ?? nothing}
		show-add-item=${showAddItem ?? nothing}
		add-item-text=${addItemText ?? nothing}
		empty-state-text=${emptyStateText ?? nothing}
		@queryChange=${action('queryChange')}
		@valueChange=${action('valueChange')}
		@selectAllChange=${action('selectAllChange')}
		@dropdownShown=${action('dropdownShown')}
		@add=${action('add')}
	/>`,
	tags: ['!dev'],
};
