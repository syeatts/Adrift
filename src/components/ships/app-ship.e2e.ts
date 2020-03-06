import { newE2EPage } from '@stencil/core/testing';

describe('app-ship', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-ship></app-ship>');

    const element = await page.find('app-ship');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-ship></app-ship>');

    const element = await page.find('app-ship >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
