import { randFood, randCatchPhrase, randNoun, randNumber, randTextRange } from "@ngneat/falso";

export const newBook = {
  id: randNumber({ min: 1, max: 100 }),
  title: randFood(),
  description: randCatchPhrase(),
  pageCount: randNumber({ min: 1, max: 100 }),
  excerpt: randNoun(),
  publishDate: "2025-07-16T21:46:27.779Z",
};

export const newBookInvalidDate = {
  id: randNumber({ min: 1, max: 100 }),
  title: randFood(),
  description: randCatchPhrase(),
  pageCount: randNumber({ min: 1, max: 100 }),
  excerpt: randNoun(),
  publishDate: "202507-16T21:46:27.779Z",
};

export const newBookLongTitleDesc = {
  id: randNumber({ min: 1, max: 100 }),
  title: randTextRange({ min: 500, max: 700, length: 10 }).toString(),
  description: randTextRange({ min: 500, max: 700, length: 10 }).toString(),
  pageCount: randNumber({ min: 1, max: 100 }),
  excerpt: randNoun(),
  publishDate: "2025-07-16T21:46:27.779Z",
};

export const newBookStringId = {
  id: randFood(),
  title: randFood(),
  description: randCatchPhrase(),
  pageCount: randNumber({ min: 1, max: 100 }),
  excerpt: randNoun(),
  publishDate: "2025-07-16T21:46:27.779Z",
};

export const newBookTitleDescNumbers = {
  id: randNumber({ min: 1, max: 100 }),
  title: randNumber({ min: 1, max: 100 }),
  description: randNumber({ min: 1, max: 100 }),
  pageCount: randNumber({ min: 1, max: 100 }),
  excerpt: randNoun(),
  publishDate: "2025-07-16T21:46:27.779Z",
};

export const newBookEmpty = {};

export const bookId = randNumber({ min: 1, max: 100 });

export const invalidId = randNumber({ min: 888888, max: 999999 });

export const alphanumBookId = randNoun() + randNumber({ min: 1, max: 100 });

export const negativeBookId = randNumber({ min: -10, max: -1 });
