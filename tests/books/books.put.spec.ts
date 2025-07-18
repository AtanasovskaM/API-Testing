import { test, expect } from "@playwright/test";
import {
  alphanumBookId,
  bookId,
  invalidNumBookId,
  invalidUpdateBook,
  updateBook,
} from "../../helpers/fixtures/books";

test.describe("PUT operation - books", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise before updating data, before each test new book would be created, so that can be updated and deleted afterwards
  test("Update existing book with valid data", async ({ request }) => {
    const response = await request.put(`/api/v1/Books/${bookId}`, {
      data: updateBook,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(updateBook);
  });

  test("Update non-existing book (invalid id)", async ({ request }) => {
    const response = await request.put(`/api/v1/Books/${invalidNumBookId}`, {
      data: updateBook,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(updateBook);
  });

  test("Update existing book with numeric input", async ({ request }) => {
    const response = await request.put(`/api/v1/Books/${bookId}`, {
      data: invalidUpdateBook,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.id"]);
    expect(responseBody.errors["$.id"][0]).toContain(
      "The JSON value could not be converted to System.Int32",
    );
  });

  test("Update existing book with string as id", async ({ request }) => {
    const response = await request.put(`/api/v1/Books/${alphanumBookId}`, {
      data: updateBook,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty("id");
    expect(responseBody.errors.id[0]).toBe(
      `The value '${alphanumBookId}' is not valid.`,
    );
  });
});
