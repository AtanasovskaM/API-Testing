import {
  randFood,
  randCatchPhrase,
  randNoun,
  randNumber,
  randTextRange,
  randFirstName,
  randLastName,
} from "@ngneat/falso";

export const newAuthor = {
  id: randNumber({ min: 1, max: 100 }),
  idBook: randNumber({ min: 1, max: 100 }),
  firstName: randFirstName(),
  lastName: randLastName(),
};

export const newAuthorExtra = {
  id: randNumber({ min: 1, max: 100 }),
  idBook: randNumber({ min: 1, max: 100 }),
  firstName: randFirstName(),
  lastName: randLastName(),
  extra: randLastName(),
};

export const newAuthorLongFirstLastName = {
  id: randNumber({ min: 1, max: 100 }),
  idBook: randNumber({ min: 1, max: 100 }),
  firstName: randTextRange({ min: 500, max: 700, length: 10 }).toString(),
  lastName: randTextRange({ min: 500, max: 700, length: 10 }).toString(),
};

export const newAuthorFirstLastNameNumbers = {
  id: randNumber({ min: 1, max: 100 }),
  idBook: randNumber({ min: 1, max: 100 }),
  firstName: randNumber({ min: 1, max: 100 }),
  lastName: randNumber({ min: 1, max: 100 }),
};

export const updateAuthor = {
  id: randNumber({ min: 1, max: 100 }),
  idBook: randNumber({ min: 1, max: 100 }),
  firstName: randFirstName(),
  lastName: randLastName(),
};

export const invalidUpdateAuthor = {
  id: randFood(),
  title: randFood(),
  description: randCatchPhrase(),
  pageCount: randNumber({ min: 1, max: 100 }),
};

export const newAuthorEmpty = {};

export const authorId = randNumber({ min: 1, max: 100 });

export const invalidNumAuthorId = randNumber({ min: 888888, max: 999999 });

export const authorStringId = randFood();

export const alphanumAuthorId = randNoun() + randNumber({ min: 1, max: 100 });

export const negativeAuthorId = randNumber({ min: -10, max: -1 });
