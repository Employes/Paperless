import { newSpecPage } from '@stencil/core/testing';

import { CardBody } from '../card-body.component';

describe('p-card-body', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [CardBody],
			html: '<p-card-body>test</p-card-body>',
		});
		expect(root).toEqualHtml(`
      <p-card-body class="p-card-body">
        <mock:shadow-root>
          test
        </mock:shadow-root>
      </p-card-body>
    `);
	});
});
