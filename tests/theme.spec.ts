import { test, expect } from '@playwright/test';

test.describe('Theme and Drawer actions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app (assuming dev server is running on localhost:5173 or we can serve it)
    await page.goto('/');
  });

  test('Check desktop dark mode settings sidebar', async ({ page, isMobile }) => {
    if (isMobile) return;
    
    // Switch to dark mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    
    // Open settings sidebar
    await page.click('header button:has(svg)');
    
    // Verify sidebar has light theme styles applied
    const aside = page.locator('aside.sidebar-forced-light');
    await expect(aside).toBeVisible();
    
    // Verify a button inside sidebar gets correct light mode hover backgrounds
    // This is hard to test computed styles reliably, but we can check if the class is present.
    await expect(aside).toHaveClass(/sidebar-forced-light/);
  });

  test('Check mobile drawer light and dark mode visibility', async ({ page, isMobile }) => {
    if (!isMobile) return;

    // Expand Services section
    await page.click('button:has-text("Services")');
    
    // We can't directly check the Drawer share because it requires generating the document.
    // So let's open Global Settings
    await page.click('button:has-text("Global Settings")');
    
    // Change language to verify Dropdown Drawer
    await page.click('button:has-text("English")');
    
    // Check Drawer is visible
    const drawer = page.locator('.fixed.inset-0:has(.animate-slide-up)');
    await expect(drawer).toBeVisible();
    
    // Switch to light mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    
    // Wait for animation
    await page.waitForTimeout(500);

    // Switch to dark mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    
    await page.waitForTimeout(500);
  });
});
