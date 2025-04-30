import { newSpecPage } from '@stencil/core/testing';
import { EmptyState } from '../empty-state.component';

describe('p-empty-state', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [EmptyState],
			html: '<p-empty-state></p-empty-state>',
		});
		expect(root).toEqualHtml(`
      <p-empty-state class="p-empty-state">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-empty-state>
    `);
	});
});
