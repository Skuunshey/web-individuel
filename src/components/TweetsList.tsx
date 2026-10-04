import type { ReactElement } from 'react'
import type { Tweet } from '../types/Tweet.ts'
import { TweetPreview } from './TweetPreview.tsx'

export type TweetsListProps = {
  tweets: Array<Tweet>
  onToggleLike: (id: string) => void
}

export function TweetsList({ tweets, onToggleLike }: TweetsListProps): ReactElement {
  return (
    <ul className="tweet-list">
      {tweets.map((tweet) => (
        // L'id est stable. L'index du tableau changerait si on trie ou si on insère en tête.
        <li key={tweet.id}>
          <TweetPreview tweet={tweet} onToggleLike={onToggleLike} />
        </li>
      ))}
    </ul>
  )
}
