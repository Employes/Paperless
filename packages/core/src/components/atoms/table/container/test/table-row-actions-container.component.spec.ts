import { newSpecPage } from '@stencil/core/testing';
import { TableRowActionsContainer } from '../table-row-actions-container.component';

describe('p-table-row-actions-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableRowActionsContainer],
			html: '<p-table-row-actions-container></p-table-row-actions-container>',
		});
		expect(root).toEqualHtml(`
      <p-table-row-actions-container class="p-table-row-actions-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-row-actions-container>
    `);
	});
});
