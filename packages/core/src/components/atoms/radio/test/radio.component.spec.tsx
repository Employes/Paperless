import { newSpecPage } from '@stencil/core/testing';
import { Radio } from '../radio.component';

describe('p-radio', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Radio],
			html: `<p-radio></p-radio>`,
		});
		expect(page.root).toEqualHtml(`
      <p-radio>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-radio>
    `);
	});
});
