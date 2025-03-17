import { newSpecPage } from '@stencil/core/testing';
import { Toggle } from '../toggle.component';

describe('p-toggle', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Toggle],
			html: `<p-toggle></p-toggle>`,
		});
		expect(page.root).toEqualHtml(`
      <p-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-toggle>
    `);
	});
});
