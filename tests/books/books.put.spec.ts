import { test, expect, request } from "@playwright/test";
import { bookId, invalidId, newBook, newBookEmpty, newBookInvalidDate, newBookLongTitleDesc, newBookStringId, newBookTitleDescNumbers } from "../../helpers/fixtures/books";

test.describe("PUT operation - books", () => {

    

  test("Update existing book with valid data", async ({ request }) => {
    const response = await request.put(`/api/v1/Books/${bookId}`,);
  });

  test("Update non-existing book (invalid id)", async ({
    request,
  }) => {
    const response = await request.put(`/api/v1/Books/${invalidId}`,);
  });

  test("Update existing book with wrong input", async ({ request }) => {
    const response = await request.put(`/api/v1/Books`,);
  });

  
});
