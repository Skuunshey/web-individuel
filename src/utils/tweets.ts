import type { Tweet } from '../types/Tweet.ts'

export type TweetSortOrder = 'newest' | 'oldest' | 'mostLiked'

// Dates ISO 8601 en UTC : l'ordre du texte est l'ordre du temps.
export function compareNewestFirst(a: Tweet, b: Tweet): number {
  if (a.createdAt === b.createdAt) {
    return 0
  }

  return a.createdAt > b.createdAt ? -1 : 1
}

export function compareOldestFirst(a: Tweet, b: Tweet): number {
  if (a.createdAt === b.createdAt) {
    return 0
  }

  return a.createdAt < b.createdAt ? -1 : 1
}

export function compareMostLiked(a: Tweet, b: Tweet): number {
  if (a.likes !== b.likes) {
    return b.likes - a.likes
  }

  // À nombre de j'aime égal, on garde le plus récent devant.
  return compareNewestFirst(a, b)
}

// slice() fait une copie. sort() modifie cette copie, pas le tableau recu.
export function sortTweets(tweets: ReadonlyArray<Tweet>, order: TweetSortOrder): Array<Tweet> {
  const compare =
    order === 'oldest' ? compareOldestFirst : order === 'mostLiked' ? compareMostLiked : compareNewestFirst

  return tweets.slice().sort(compare)
}

export function totalLikes(tweets: ReadonlyArray<Tweet>): number {
  return tweets.reduce((sum, tweet) => sum + tweet.likes, 0)
}

export function repliesOf(tweets: ReadonlyArray<Tweet>, parentId: string): Array<Tweet> {
  return tweets.filter((tweet) => tweet.parentId === parentId)
}

export function tweetsByHandle(tweets: ReadonlyArray<Tweet>, handle: string): Array<Tweet> {
  return tweets.filter((tweet) => tweet.authorHandle === handle)
}

export function likedTweets(tweets: ReadonlyArray<Tweet>): Array<Tweet> {
  return tweets.filter((tweet) => tweet.likedByMe)
}

// Insensible à la casse. Les espaces en début et en fin ne comptent pas.
export function tweetMatchesQuery(tweet: Tweet, query: string): boolean {
  const normalized = query.trim().toLocaleLowerCase('fr-FR')

  if (normalized.length === 0) {
    return true
  }

  return (
    tweet.authorName.toLocaleLowerCase('fr-FR').includes(normalized) ||
    tweet.authorHandle.toLocaleLowerCase('fr-FR').includes(normalized) ||
    tweet.content.toLocaleLowerCase('fr-FR').includes(normalized)
  )
}

// Valeur dérivée : tweets de premier niveau, filtre, puis tri d'une copie.
export function selectVisibleTweets(
  tweets: ReadonlyArray<Tweet>,
  query: string,
  order: TweetSortOrder,
): Array<Tweet> {
  const visible = tweets.filter(
    (tweet) => tweet.parentId === undefined && tweetMatchesQuery(tweet, query),
  )

  return sortTweets(visible, order)
}
