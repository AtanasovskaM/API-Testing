import { test, expect } from "@playwright/test";
import {
  alphanumBookId,
  bookId,
  invalidNumBookId,
  negativeBookId,
} from "../../helpers/fixtures/books";

test.describe("GET operation - books", () => {
  test("Get all books and verify it returns an array", async ({ request }) => {
    const response = await request.get("/api/v1/Books");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test("Get all books and verify header content type", async ({ request }) => {
    const response = await request.get("/api/v1/Books", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("Get book by valid id", async ({ request }) => {
    const response = await request.get(`/api/v1/Books/${bookId}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).id).toBe(bookId);
  });

  test("Get book by invalid id", async ({ request }) => {
    const response = await request.get(`/api/v1/Books/${invalidNumBookId}`);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Not Found");
  });

  test("Get book by id with alphanumeric format", async ({ request }) => {
    const response = await request.get(`/api/v1/Books/${alphanumBookId}`);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty("id");
    expect(responseBody.errors.id[0]).toBe(
      `The value '${alphanumBookId}' is not valid.`,
    );
  });

  test("Get book by id with negative number", async ({ request }) => {
    const response = await request.get(`/api/v1/Books/${negativeBookId}`);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Not Found");
  });
});
