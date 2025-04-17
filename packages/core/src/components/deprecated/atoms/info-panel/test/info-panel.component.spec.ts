import { newSpecPage } from '@stencil/core/testing';
import { InfoPanel } from '../info-panel.component';

describe('p-counter', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [InfoPanel],
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
