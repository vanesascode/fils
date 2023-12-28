import { test, expect } from "@playwright/test";

//////////////////////////////////////////////////////////////////////////////

test("Log in and post", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto(
    "http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("vanesascode@gmail.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill("1a2s3d4f5g6h7j8k9l0ñ");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("link", { name: "Create Fil Create Fil" }).click();
  await page.getByPlaceholder("Write here what you want to").click();
  await page
    .getByPlaceholder("Write here what you want to")
    .fill("This is a new post");
  await page.getByRole("button", { name: "Post" }).click();
});

//////////////////////////////////////////////////////////////////////////////

test("Log in and like and unlike posts", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto(
    "http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("vanesascode@gmail.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill("1a2s3d4f5g6h7j8k9l0ñ");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("img", { name: "heart icon" }).first().click();
  await page.getByRole("img", { name: "heart icon" }).nth(1).click();
  await page.getByRole("img", { name: "heart icon" }).nth(1).click();
  await page.getByRole("img", { name: "heart icon" }).first().click();
});

// ERROR:

test("Log in and edit profile", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto(
    "http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("vanesascode@gmail.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill("1a2s3d4f5g6h7j8k9l0ñ");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("link", { name: "Profile Profile" }).click();
  await page.goto(
    "http://localhost:3000/profile/user_2aBNuxmaknp7Tu2wWqruiHaooE1"
  );
  await page.getByRole("button", { name: "logout Edit" }).click();
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).fill("Vanesa Paris");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "logout Edit" }).click();
  await page.getByPlaceholder("Add profile photo").click();
  await page.getByPlaceholder("Add profile photo").setInputFiles("Captura.JPG");
  await page.getByPlaceholder("Tell us more about yourself").click();
  await page
    .getByPlaceholder("Tell us more about yourself")
    .fill("More about me in the bio");
  await page.getByRole("button", { name: "Save" }).click();
});
