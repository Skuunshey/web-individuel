import { expect, test } from 'bun:test'
import type { Tweet } from '../types/Tweet.ts'
import {
  repliesOf,
  selectVisibleTweets,
  sortTweets,
  totalLikes,
  tweetMatchesQuery,
} from './tweets.ts'

function sample(overrides: Partial<Tweet> & Pick<Tweet, 'id'>): Tweet {
  return {
    authorName: 'Ada Lovelace',
    authorHandle: 'ada',
    content: 'La machine',
    createdAt: '2026-07-01T00:00:00.000Z',
    likes: 1,
    likedByMe: false,
    ...overrides,
  }
}

test('la recherche trouve un auteur, un pseudo ou un contenu, quelle que soit la casse', () => {
  const tweets = [
    sample({ id: '1', authorName: 'Ada Lovelace', authorHandle: 'ada', content: 'machine analytique' }),
    sample({ id: '2', authorName: 'Grace Hopper', authorHandle: 'ghopper', content: 'nanoseconde' }),
  ]

  expect(selectVisibleTweets(tweets, '  ADA  ', 'newest').map((tweet) => tweet.id)).toEqual(['1'])
  expect(tweetMatchesQuery(tweets[1]!, 'GHOPPER')).toBe(true)
  expect(tweetMatchesQuery(tweets[1]!, 'NANOSECONDE')).toBe(true)
})

test('un tableau vide ne donne aucun résultat', () => {
  expect(selectVisibleTweets([], 'ada', 'newest')).toEqual([])
  expect(totalLikes([])).toBe(0)
  expect(repliesOf([], 'parent')).toEqual([])
})

test('une recherche sans résultat renvoie une liste vide', () => {
  const tweets = [sample({ id: '1', content: 'Bonjour' })]

  expect(selectVisibleTweets(tweets, 'zzzz', 'newest')).toEqual([])
  expect(tweetMatchesQuery(tweets[0]!, 'zzzz')).toBe(false)
})

test('le tri ne modifie pas le tableau reçu', () => {
  const tweets = [
    sample({ id: 'old', createdAt: '2026-07-01T00:00:00.000Z', likes: 2 }),
    sample({ id: 'new', createdAt: '2026-09-01T00:00:00.000Z', likes: 9 }),
  ]
  const before = tweets.map((tweet) => tweet.id)
  const sorted = sortTweets(tweets, 'newest')

  expect(tweets.map((tweet) => tweet.id)).toEqual(before)
  expect(sorted.map((tweet) => tweet.id)).toEqual(['new', 'old'])
  expect(sorted).not.toBe(tweets)
})

test('une reponse ne figure pas dans le fil', () => {
  const tweets = [
    sample({ id: 'root', content: 'texte ada' }),
    sample({ id: 'reply', parentId: 'root', content: 'reponse ada' }),
  ]

  expect(selectVisibleTweets(tweets, 'ada', 'newest').map((tweet) => tweet.id)).toEqual(['root'])
  expect(repliesOf(tweets, 'root').map((tweet) => tweet.id)).toEqual(['reply'])
})
