import { newSpecPage } from '@stencil/core/testing';
import { Portal } from '../portal.component';

describe('p-portal', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Portal],
			html: '<p-portal></p-divider>',
		});
		expect(root).toEqualHtml(`
      <p-portal class="p-divider">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-portal>
    `);
	});
});
