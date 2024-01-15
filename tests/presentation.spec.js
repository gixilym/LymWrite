//@ts-check
import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test,
  URL = "http://localhost:1420/";

describe("🟩 Presentation:", function () {
  beforeEach(async ({ page }) => await page.goto(URL));

  test("Tiene titulo", async ({ page }) => {
    await expect(page).toHaveTitle(/LymWrite/);
  });

  test("Tiene las características", async ({ page }) => {
    const list = await page.getByRole("list", { name: "Características" });
    await expect(list).toBeVisible();
  });
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
