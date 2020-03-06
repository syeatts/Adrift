import { newE2EPage } from '@stencil/core/testing';

describe('app-dungeons', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-dungeons></app-dungeons>');

    const element = await page.find('app-dungeons');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-dungeons></app-dungeons>');

    const element = await page.find('app-dungeons >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
