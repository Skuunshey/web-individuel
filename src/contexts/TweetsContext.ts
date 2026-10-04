import { createContext } from 'react'
import type { Tweet, TweetImage } from '../types/Tweet.ts'

export type TweetsContextValue = {
  tweets: Array<Tweet>
  addTweet: (content: string, image?: TweetImage) => void
  addReply: (parentId: string, content: string, image?: TweetImage) => void
  toggleLike: (id: string) => void
}

// undefined hors du Provider. Les pages sont toujours rendues dans App, donc on met ! à la lecture.
export const TweetsContext = createContext<TweetsContextValue | undefined>(undefined)
