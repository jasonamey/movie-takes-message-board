import { test, expect, firefox } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const authSetup = async () => {
  const browser = await firefox.launch({
    headless: false,
    args: ["--disable-dev-shm-usage"],
    ignoreDefaultArgs: ["--disable-component-extensions-with-background-pages"],
  });
  const page = await browser.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Log In" }).click();
  await page
    .getByLabel("Email or phone")
    .fill(process.env.PLAYWRIGHT_EMAIL as string);
  await page.getByRole("button", { name: "Next" }).click();
  await page
    .getByLabel("Enter your password")
    .fill(process.env.PLAYWRIGHT_PWD as string);
  await page.getByLabel("Enter your password").press("Enter");
  return { page, browser };
};

test("test basic components are viewable", async () => {
  const { page } = await authSetup();
  await expect(
    page.getByRole("link", {
      name: 'Arrival (2016) @jason.amey\'s take: "a movie kind-of about everything" Sci-Fi',
    })
  ).toBeVisible();
});

test("authentication works", async () => {
  const { page, browser } = await authSetup();
  await expect(
    page.getByRole("heading", { name: "Movie Takes!" })
  ).toBeVisible();
  await browser.close();
});

test("can create take", async () => {
  const { page } = await authSetup();
  await page.getByRole("link", { name: "+ Add Take!" }).click();
  await page.getByPlaceholder("Search for Movie...").click();
  await page.getByPlaceholder("Search for Movie...").fill("die hard");
  await page.getByPlaceholder("Search for Movie...").press("Enter");
  await page.waitForTimeout(20000);
});
