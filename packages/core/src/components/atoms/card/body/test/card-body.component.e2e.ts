import { newE2EPage } from '@stencil/core/testing';

describe('p-card-body', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-card-body>test</p-card-body>');
		const element = await page.find('p-card-body');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-card-body>test</p-card-body>');
		// const component = await page.find('p-button');
		const element = await page.find('p-card-body');
		expect(element.textContent).toEqual(`test`);

		// component.setProperty('name', 'World');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, World!`);

		// component.setProperty('name', 'Bob');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Bob!`);

		// component.setProperty('name', 'Earl');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Earl!`);
	});
});
