import { newE2EPage } from '@stencil/core/testing';

describe('p-toggle', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<p-toggle></p-toggle>');

		const element = await page.find('p-toggle');
		expect(element).toHaveClass('hydrated');
	});
});
