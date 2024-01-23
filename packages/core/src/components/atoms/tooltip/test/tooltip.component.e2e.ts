import { newE2EPage } from '@stencil/core/testing';

describe('p-popover', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<p-icon icon="document"></p-icon>');

		const element = await page.find('p-icon');
		expect(element).toHaveClass('hydrated');
	});

	it('size', async () => {
		const page = await newE2EPage();
		await page.setContent('<p-icon icon="document" size="5xl"></p-icon>');

		const element = await page.find('p-icon');
		expect(element).toHaveClass('text-5xl');
	});

	it('rotate 45 degrees', async () => {
		const page = await newE2EPage();
		await page.setContent('<p-icon icon="document" rotate="45"></p-icon>');

		const element = await page.find('p-icon');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('rotate-45');
	});

	it('flip vertical', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-icon icon="document" flip="vertical"></p-icon>'
		);

		const element = await page.find('p-icon');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('-scale-y-1');
	});

	it('flip horizontal', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-icon icon="document" flip="horizontal"></p-icon>'
		);

		const element = await page.find('p-icon');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('-scale-x-1');
	});
});
