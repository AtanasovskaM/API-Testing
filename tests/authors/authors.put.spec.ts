import { test, expect } from "@playwright/test";
import {
  alphanumAuthorId,
  authorId,
  invalidNumAuthorId,
  invalidUpdateAuthor,
  updateAuthor,
} from "../../helpers/fixtures/authors";

test.describe("PUT operation - authors", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise before updating data, before each test new book would be created, so that can be updated and deleted afterwards

  test("Update existing author with valid data", async ({ request }) => {
    const response = await request.put(`/api/v1/Authors/${authorId}`, {
      data: updateAuthor,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(updateAuthor);
  });

  test("Update non-existing author (invalid id)", async ({ request }) => {
    const response = await request.put(
      `/api/v1/Authors/${invalidNumAuthorId}`,
      {
        data: updateAuthor,
      },
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(updateAuthor);
  });

  test("Update existing author with numeric input", async ({ request }) => {
    const response = await request.put(`/api/v1/Authors/${authorId}`, {
      data: invalidUpdateAuthor,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.id"]);
    expect(responseBody.errors["$.id"][0]).toContain(
      "The JSON value could not be converted to System.Int32",
    );
  });

  test("Update existing author with string as id", async ({ request }) => {
    const response = await request.put(`/api/v1/Authors/${alphanumAuthorId}`, {
      data: updateAuthor,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty("id");
    expect(responseBody.errors.id[0]).toBe(
      `The value '${alphanumAuthorId}' is not valid.`,
    );
  });
});
