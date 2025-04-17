import { newE2EPage } from '@stencil/core/testing';

describe('p-counter', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-counter>#</p-counter>');
		const element = await page.find('p-counter');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-counter>1</p-counter>');
		// const component = await page.find('p-button');
		const element = await page.find('p-counter');
		expect(element.textContent).toEqual(`1`);

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
