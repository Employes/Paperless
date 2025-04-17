import { newSpecPage } from '@stencil/core/testing';
import { Counter } from '../counter.component';

describe('p-counter', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Counter],
			html: '<p-counter>#</p-counter>',
		});
		expect(root).toEqualHtml(`
      <p-counter class="p-counter">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-counter>
    `);
	});
});
