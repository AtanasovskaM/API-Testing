import { test, expect } from "@playwright/test";
import {
  alphanumBookId,
  bookId,
  invalidNumBookId,
} from "../../helpers/fixtures/books";

test.describe("DELETE operation - books", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise new data should be created before deleting it

  test("Delete book by valid id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Books/${bookId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("Delete book with invalid id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Books/${invalidNumBookId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("Delete book with string id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Books/${alphanumBookId}`);
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.errors.id[0]).toBe(
      `The value '${alphanumBookId}' is not valid.`,
    );
  });

  test("Delete book with no id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Books/`);
    expect(response.status()).toBe(405);
  });
});
