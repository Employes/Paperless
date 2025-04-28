import { newSpecPage } from '@stencil/core/testing';
import { CardContainer } from '../card-container.component';

describe('p-card-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [CardContainer],
			html: '<p-card-container>test</p-card-container>',
		});
		expect(root).toEqualHtml(`
      <p-card-container class="p-card-container">
        <mock:shadow-root>
          test
        </mock:shadow-root>
      </p-card-container>
    `);
	});
});
