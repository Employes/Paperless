import { newSpecPage } from '@stencil/core/testing';
import { DrawerBody } from '../drawer-body.component';

describe('p-drawer-body', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [DrawerBody],
			html: '<p-drawer-body></p-drawer-body>',
		});
		expect(root).toEqualHtml(`
      <p-drawer-body class="p-drawer-body">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-drawer-body>
    `);
	});
});
