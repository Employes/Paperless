import { newE2EPage } from '@stencil/core/testing';

describe('p-smile', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-smile></p-smile>');
		const element = await page.find('p-smile');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-smile></p-smile>');
		// const component = await page.find('p-button');
		const element = await page.find('p-smile');
		expect(element.textContent).toEqual(``);

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
