import { newE2EPage } from '@stencil/core/testing';

describe('app-characters', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-characters></app-characters>');

    const element = await page.find('app-characters');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-characters></app-characters>');

    const element = await page.find('app-characters >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
