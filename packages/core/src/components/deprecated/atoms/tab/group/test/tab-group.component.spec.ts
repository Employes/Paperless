import { newSpecPage } from '@stencil/core/testing';
import { TabGroup } from '../tab-group.component';

describe('p-tab-group', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TabGroup],
			html: '<p-tab-group></p-tab-group>',
		});
		expect(root).toEqualHtml(`
      <p-tab-group class="p-tab-group">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-tab-group>
    `);
	});
});
