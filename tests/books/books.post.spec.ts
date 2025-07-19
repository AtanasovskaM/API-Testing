import { test, expect } from "@playwright/test";
import {
  newBook,
  newBookEmpty,
  newBookExtra,
  newBookInvalidDate,
  newBookLongTitleDesc,
  newBookMissingFields,
  newBookStringId,
  newBookTitleDescNumbers,
} from "../../helpers/fixtures/books";

test.describe("POST operation - books", () => {
  //Because FakerRestAPI isn't real backend and doesn't store changes the tests are adapted to it.
  //Otherwise after the book is created or any data, it should be deleted afterwards in afterEach/afterAll

  test("Create new book with valid data and verify the values", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Books", { data: newBook });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(newBook);
  });

  test("Create new book with non existing fields", async ({ request }) => {
    const response = await request.post("/api/v1/Authors", {
      data: newBookExtra,
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).not.toHaveProperty("extra");
  });

  test("Create new book with missing fields", async ({ request }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookMissingFields,
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("id", 0);
    expect(responseBody).toHaveProperty("title", null);
    expect(responseBody).toHaveProperty("description", newBookMissingFields.description);
    expect(responseBody).toHaveProperty("pageCount", newBookMissingFields.pageCount);
    expect(responseBody).toHaveProperty("excerpt", null);
    expect(responseBody).toHaveProperty("publishDate", "0001-01-01T00:00:00");
  });

  test("Create new book with invalid date", async ({ request }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookInvalidDate,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.publishDate"]);
    expect(responseBody.errors["$.publishDate"][0]).toContain(
      "The JSON value could not be converted to System.DateTime",
    );
  });

  test("Create new book with long title and description", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookLongTitleDesc,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("title", newBookLongTitleDesc.title);
    expect(responseBody).toHaveProperty(
      "description",
      newBookLongTitleDesc.description,
    );
  });

  test("Create new book wrong numeric title and description", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookTitleDescNumbers,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.title"]);
    expect(responseBody.errors["$.title"][0]).toContain(
      "The JSON value could not be converted to System.String",
    );
  });

  test("Create new book wrong id format", async ({ request }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookStringId,
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("errors");
    expect(responseBody.errors).toHaveProperty(["$.id"]);
    expect(responseBody.errors["$.id"][0]).toContain(
      "The JSON value could not be converted to System.Int32",
    );
  });

  test("Create new book with no data", async ({ request }) => {
    const response = await request.post("/api/v1/Books", {
      data: newBookEmpty,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("id", 0);
    expect(responseBody).toHaveProperty("title", null);
    expect(responseBody).toHaveProperty("description", null);
    expect(responseBody).toHaveProperty("pageCount", 0);
    expect(responseBody).toHaveProperty("excerpt", null);
    expect(responseBody).toHaveProperty("publishDate", "0001-01-01T00:00:00");
  });
});
