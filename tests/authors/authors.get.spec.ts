import { test, expect } from "@playwright/test";
import {
  alphanumAuthorId,
  authorId,
  invalidNumAuthorId,
  negativeAuthorId,
} from "../../helpers/fixtures/authors";

test.describe("GET operation - authors", () => {
  test("Get all authors and verify it returns an array", async ({
    request,
  }) => {
    const response = await request.get("/api/v1/Authors");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test("Get all authors and verify header content type", async ({
    request,
  }) => {
    const response = await request.get("/api/v1/Authors", {
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

  test("Get author by valid id", async ({ request }) => {
    const response = await request.get(`/api/v1/Authors/${authorId}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).id).toBe(authorId);
  });

  test("Get author by invalid id", async ({ request }) => {
    const response = await request.get(`/api/v1/Authors/${invalidNumAuthorId}`);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Not Found");
  });

  test("Get author by id with alphanumeric format", async ({ request }) => {
    const response = await request.get(`/api/v1/Author/${alphanumAuthorId}`);
    expect(response.status()).toBe(404);
  });

  test("Get author by id with negative number", async ({ request }) => {
    const response = await request.get(`/api/v1/Authors/${negativeAuthorId}`);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Not Found");
  });
});
