import { test, expect } from "@playwright/test";
import {
  alphanumAuthorId,
  authorId,
  invalidNumAuthorId,
} from "../../helpers/fixtures/authors";

test.describe("DELETE operation - authors", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise new data should be created before deleting it

  test("Delete author by valid id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Authors/${authorId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("Delete author with invalid id", async ({ request }) => {
    const response = await request.delete(
      `/api/v1/Authors/${invalidNumAuthorId}`,
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test("Delete author with string id", async ({ request }) => {
    const response = await request.delete(
      `/api/v1/Authors/${alphanumAuthorId}`,
    );
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.errors.id[0]).toBe(
      `The value '${alphanumAuthorId}' is not valid.`,
    );
  });

  test("Delete author with no id", async ({ request }) => {
    const response = await request.delete(`/api/v1/Authors/`);
    expect(response.status()).toBe(405);
  });
});
