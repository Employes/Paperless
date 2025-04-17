import { newSpecPage } from '@stencil/core/testing';
import { AvatarGroup } from '../avatar-group.component';

describe('p-avatar-group', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [AvatarGroup],
			html: '<p-avatar-group></p-avatar-group>',
		});
		expect(root).toEqualHtml(`
      <p-avatar-group class="p-avatar-group">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-avatar-group>
    `);
	});
});
