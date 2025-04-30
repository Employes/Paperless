import { newE2EPage } from '@stencil/core/testing';

describe('p-illustration-deprecated', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-illustration-deprecated icon="document"></p-illustration-deprecated>'
		);

		const element = await page.find('p-illustration-deprecated');
		expect(element).toHaveClass('hydrated');
	});

	it('size', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-illustration-deprecated icon="document" size="5xl"></p-illustration-deprecated>'
		);

		const element = await page.find('p-illustration-deprecated');
		expect(element).toHaveClass('text-5xl');
	});

	it('rotate 45 degrees', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-illustration-deprecated icon="document" rotate="45"></p-illustration-deprecated>'
		);

		const element = await page.find('p-illustration-deprecated');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('rotate-45');
	});

	it('flip vertical', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-illustration-deprecated icon="document" flip="vertical"></p-illustration-deprecated>'
		);

		const element = await page.find('p-illustration-deprecated');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('-scale-y-1');
	});

	it('flip horizontal', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<p-illustration-deprecated icon="document" flip="horizontal"></p-illustration-deprecated>'
		);

		const element = await page.find('p-illustration-deprecated');
		expect(element).toHaveClass('transform');
		expect(element).toHaveClass('-scale-x-1');
	});
});
