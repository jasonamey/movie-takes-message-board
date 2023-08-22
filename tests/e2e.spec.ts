import { test, expect, firefox } from "@playwright/test";

const authSetup = async () => {
  const browser = await firefox.launch({
    headless: false,
    args: ["--disable-dev-shm-usage"],
    ignoreDefaultArgs: ["--disable-component-extensions-with-background-pages"],
  });
  const page = await browser.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByLabel("Email or phone").fill("");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Enter your password").fill("");
  await page.getByLabel("Enter your password").press("Enter");
  // await page.waitForURL("/");
  return { page, browser };
};

test("test basic components are viewable", async ({ page }) => {
  await expect(
    page.getByText(
      '1Arrival (2016)@jason.amey:"a movie kind-of about everything"Sci-Fi5'
    )
  ).toBeVisible();
});

test("authentication works", async () => {
  const { page, browser } = await authSetup();
  await expect(
    page.getByRole("heading", { name: "Movie Takes!" })
  ).toBeVisible();
  await browser.close();
});

test("create takes page renders", async () => {
  const { page, browser } = await authSetup();
  // await page.getByRole("")
  // await expect(
  //   page.getByRole("heading", { name: "Movie Takes!" })
  // ).toBeVisible();

  // await browser.close();
});
