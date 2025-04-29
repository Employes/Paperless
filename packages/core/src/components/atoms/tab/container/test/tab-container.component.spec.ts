import { newSpecPage } from '@stencil/core/testing';
import { TabContainer } from '../tab-container.component';

describe('p-tab-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TabContainer],
			html: '<p-tab-container></p-tab-container>',
		});
		expect(root).toEqualHtml(`
      <p-tab-container class="p-tab-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-tab-container>
    `);
	});
});
