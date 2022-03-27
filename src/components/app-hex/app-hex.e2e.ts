import { newE2EPage } from '@stencil/core/testing';

describe('app-hex', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-hex></app-hex>');

    const element = await page.find('app-hex');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-hex></app-hex>');

    const element = await page.find('app-hex >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
