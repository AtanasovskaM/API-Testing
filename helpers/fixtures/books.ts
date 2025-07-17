import { randFood, randCatchPhrase, randNoun, randNumber } from '@ngneat/falso';

export const newBook = {
  "id": 0,
  "title": randFood(),
  "description": randCatchPhrase(),
  "pageCount": 0,
  "excerpt": randNoun(),
  "publishDate": "2025-07-16T21:46:27.770Z"
}

export const bookId = randNumber({ min: 1, max: 100 })

export const invalidId = randNumber({ min: 888888, max: 999999 })

export const alphanumBookId = randNoun() + randNumber({ min: 1, max: 100 })

export const negativeBookId = randNumber({ min: -10, max: -1 })

