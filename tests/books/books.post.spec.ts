import { test, expect, request } from "@playwright/test";
import { newBook } from "../../helpers/fixtures/books";

test.describe("POST operation - books", () => {
  test("Create new book with valid data", async ({ request }) => {
    const response = await request.post("/api/v1/Books", { data: newBook });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("Create new book with missing required fields", async ({
    request,
  }) => {});

  test("Create new book with invalid date", async ({ request }) => {});

  test("Create new book with long title", async ({ request }) => {});
});
