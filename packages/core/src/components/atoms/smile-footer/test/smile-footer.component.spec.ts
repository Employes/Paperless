import { newSpecPage } from '@stencil/core/testing';
import { SmileFooter } from '../smile-footer.component';

describe('p-smile-footer', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [SmileFooter],
			html: '<p-smile-footer></p-smile-footer>',
		});
		expect(root).toEqualHtml(`
      <p-smile-footer class="p-smile-footer">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-smile-footer>
    `);
	});
});
