import { test, expect } from '@playwright/test';

test.describe('Freelance Financial Calculator E2E', () => {
  test('should load the application and display correct title', async ({ page }) => {
    await page.goto('/');
    
    // Verify the main heading
    await expect(page.locator('h1')).toHaveText('Freelance Calculator');
    
    // Verify default client name placeholder
    const clientInput = page.locator('input[placeholder="Société Marocaine Alpha"]');
    await expect(clientInput).toBeVisible();
  });

  test('should toggle Arabic language and apply RTL', async ({ page }) => {
    await page.goto('/');
    // Open settings sidebar
    await page.locator('header button').click();
    
    // Find the Language selector (currently "Français")
    const langSelect = page.locator('button', { hasText: 'Français' }).first();
    await langSelect.click();
    
    // Select Arabic
    const arOption = page.locator('button', { hasText: 'العربية' }).first();
    await arOption.click();
    
    // Verify dir attribute on HTML tag is 'rtl'
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('rtl');
    
    // Verify label translated
    await expect(page.locator('h2').first()).toHaveText('الإعدادات العامة');
  });

  test('should update financial totals in real-time when changing service rate', async ({ page }) => {
    await page.goto('/');
    
    // Total HT is typically displayed in the right column
    const totalHTLabel = page.locator('span', { hasText: /^Total HT$/ }).locator('xpath=following-sibling::span').first();
    const initialTotal = await totalHTLabel.textContent();
    
    // Change the rate of the first service
    const firstRateInput = page.locator('table tbody tr').first().locator('input[type="number"]').first();
    await firstRateInput.fill('2000');
    
    // Check if the total updated
    const updatedTotal = await totalHTLabel.textContent();
    expect(updatedTotal).not.toBe(initialTotal);
  });
});
