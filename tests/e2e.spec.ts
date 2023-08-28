import { test, expect, firefox, type Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

// const authSetup = async (page: Page) => {
//   const browser = await firefox.launch({
//     headless: false,
//   });
//   const context = await browser.newContext();
//   await page.goto("/");
//   await page.getByRole("button", { name: "Log In" }).click();
//   await page
//     .getByLabel("Email or phone")
//     .fill(process.env.PLAYWRIGHT_EMAIL as string);
//   await page.getByLabel("Email or phone").press("Enter");
//   await page
//     .getByLabel("Enter your password")
//     .fill(process.env.PLAYWRIGHT_PWD as string);
//   await page.getByLabel("Enter your password").press("Enter");
//   await page.getByRole("button", { name: "Sign in with Google" }).click();
//   return { browser, context };
// };

// test("auth test", async ({ page }) => {
//   const browser = await firefox.launch({
//     headless: false,
//   });
//   const context = await browser.newContext();
//   await page.goto("/");
//   await page.getByRole("button", { name: "Log In" }).click();
//   await page
//     .getByLabel("Email or phone")
//     .fill(process.env.PLAYWRIGHT_EMAIL as string);
//   await page.getByLabel("Email or phone").press("Enter");
//   await page
//     .getByLabel("Enter your password")
//     .fill(process.env.PLAYWRIGHT_PWD as string);
//   await page.getByLabel("Enter your password").press("Enter");
//   await page.getByRole("button", { name: "Sign in with Google" }).click();
//   await context.close();
//   await browser.close();
// });

test("see that app is rendering", async ({ page }) => {
  const browser = await firefox.launch({
    headless: false,
  });
  const context = await browser.newContext();
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Movie Takes!" })
  ).toBeVisible();

  await expect(
    page.getByText("Have Seen13Need to Re-Visit1Want to See1")
  ).toBeVisible();

  await expect(
    page.getByText("Have Seen13Need to Re-Visit1Want to See1")
  ).toBeVisible();
});

// test("see that takes are rendering", async ({ page }) => {
//   await page.goto("/");
//   await expect(
//     page.getByRole("link", {
//       name: 'Arrival (2016) @jason.amey\'s take: "a movie kind-of about everything" Sci-Fi',
//     })
//   ).toBeVisible();
// });

// test("see that app is rendering again", async ({ page }) => {
//   await page.goto("/");
//   await page.getByRole("button", { name: "Log In" }).click();
//   await page.getByLabel("Email or phone").click();
//   await page.getByLabel("Email or phone").fill("");
//   await page.getByLabel("Email or phone").press("Enter");
//   await page.getByLabel("Enter your password").fill("");
//   await page.getByLabel("Enter your password").press("Enter");
//   await page.getByRole("button", { name: "Sign in with Google" }).click();
// });

// test("can create a take", async ({ page }) => {
//   await authSetup(page);
//   await page.getByRole("link", { name: "+ Add Take!" }).click();
//   await page.getByPlaceholder("Search for Movie...").click();
//   await page.getByPlaceholder("Search for Movie...").fill("die hard");
//   await page.locator("li").filter({ hasText: "Die Hard - 1988" }).click();
//   await page.getByRole("button", { name: "Genre" }).click();
//   await page.getByText("Drama").click();
//   await page.getByRole("button", { name: "Status" }).click();
//   await page.getByText("Have Seen").click();
//   await page.locator("textarea").click();
//   await page.locator("textarea").fill("Still one of the action greats...");
//   await page.getByRole("button", { name: "Add Feedback" }).click();
//   await expect(
//     page.getByRole("link", {
//       name: 'Die Hard (1988) @jason.amey\'s take: "Still one of the action greats..." Drama',
//     })
//   ).toBeVisible();
// });
