import { newSpecPage } from '@stencil/core/testing';
import { Layout } from '../layout.component';

describe('p-layout', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Layout],
			html: '<p-layout></p-layout>',
		});
		expect(root).toEqualHtml(`
      <p-layout class="p-layout">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-layout>
    `);
	});
});
