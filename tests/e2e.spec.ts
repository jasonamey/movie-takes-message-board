import { test, expect, firefox, type Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const authSetup = async (page: Page) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Log In with github" }).click();
  await page
    .getByLabel("Username or email address")
    .fill(process.env.PLAYWRIGHT_USERNAME as string);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(process.env.PLAYWRIGHT_PWD as string);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("link", { name: "+ Add Take!" })).toBeVisible();
};

test("see that app is rendering", async ({ page }) => {
  const browser = await firefox.launch({
    headless: false,
  });
  const context = await browser.newContext();
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Movie Takes!" })
  ).toBeVisible();

  await expect(page.getByText("Have Seen")).toBeVisible();

  await expect(page.getByText("Need to Re-Visit")).toBeVisible();

  await expect(page.getByText("Want to See")).toBeVisible();
});

test("auth Test", async ({ page }) => {
  await authSetup(page);
  await expect(page.getByRole("link", { name: "+ Add Take!" })).toBeVisible();
});

test("can add and delete take", async ({ page }) => {
  await authSetup(page);
  await page.getByRole("link", { name: "+ Add Take!" }).click();
  await page.getByPlaceholder("Search for Movie...").click();
  await page.getByPlaceholder("Search for Movie...").fill("die hard");
  await page.getByPlaceholder("Search for Movie...").click();
  await page.getByPlaceholder("Search for Movie...").press("Enter");
  await page.getByPlaceholder("Search for Movie...").click();
  await page.getByPlaceholder("Search for Movie...").click();
  await page.getByPlaceholder("Search for Movie...").fill("die hard");
  await page.getByText("Die Hard", { exact: true }).click();
  await page.getByRole("button", { name: "Genre" }).click();
  await page.getByText("Drama").click();
  await page.getByRole("button", { name: "Status" }).click();
  await page.getByText("Have Seen").click();
  await page.locator("textarea").click();
  await page.locator("textarea").fill("all time action film");
  await page.getByRole("button", { name: "Add Feedback" }).click();
  await expect(
    page.getByRole("link", {
      name: 'Die Hard (1988) @jasonamey\'s take: "all time action film" Drama',
    })
  ).toBeVisible();
  await page
    .locator("article")
    .filter({
      hasText:
        '0Die Hard (1988)@jasonamey\'s take:"all time action film"Drama0',
    })
    .getByRole("button")
    .nth(2)
    .click();
  await expect(
    page.getByRole("link", {
      name: 'Die Hard (1988) @jasonamey\'s take: "all time action film" Drama',
    })
  ).not.toBeVisible();
});
