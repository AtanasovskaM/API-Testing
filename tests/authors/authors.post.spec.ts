import { test, expect } from "@playwright/test";
import {
  authorStringId,
  newAuthor,
  newAuthorEmpty,
  newAuthorLongFirstLastName,
  newAuthorFirstLastNameNumbers,
  newAuthorExtra,
} from "../../helpers/fixtures/authors";

test.describe("POST operation - authors", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise after the author is created or any data, it should be deleted afterwards in afterEach/afterAll

  test("Create new author with valid data and verify the values", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Authors", { data: newAuthor });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(newAuthor);
  });

  test("Create new author with empty fields", async ({ request }) => {
    const response = await request.post("/api/v1/Authors", { data: "{}" });
    expect(response.status()).toBe(415);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Unsupported Media Type");
  });

  test("Create new author with non existing fields", async ({ request }) => {
    const response = await request.post("/api/v1/Authors", {
      data: newAuthorExtra,
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).not.toHaveProperty("extra");
  });

  test("Create new author with long first and last name", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Authors", {
      data: newAuthorLongFirstLastName,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(
      "firstName",
      newAuthorLongFirstLastName.firstName,
    );
    expect(responseBody).toHaveProperty(
      "lastName",
      newAuthorLongFirstLastName.lastName,
    );
  });

  test("Create new author with numeric first and last name", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Authors", {
      data: newAuthorFirstLastNameNumbers,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.firstName"]);
    expect(responseBody.errors["$.firstName"][0]).toContain(
      "The JSON value could not be converted to System.String",
    );
  });

  test("Create new author wrong id format", async ({ request }) => {
    const response = await request.post("/api/v1/Authors", {
      data: authorStringId,
    });
    expect(response.status()).toBe(415);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", "Unsupported Media Type");
  });

  test("Create new author with no data", async ({ request }) => {
    const response = await request.post("/api/v1/Authors", {
      data: newAuthorEmpty,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("id", 0);
    expect(responseBody).toHaveProperty("idBook", 0);
    expect(responseBody).toHaveProperty("firstName", null);
    expect(responseBody).toHaveProperty("lastName", null);
  });
});
