import { useContext, type ReactElement } from 'react'
import { TweetsList } from '../components/TweetsList.tsx'
import { TweetsContext } from '../contexts/TweetsContext.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { likedTweets, sortTweets } from '../utils/tweets.ts'

export function LikedTweetsPage(): ReactElement {
  useDocumentTitle("Mentions J'aime")

  const { tweets, toggleLike } = useContext(TweetsContext)!
  // Liste dérivée : pas de useState. Retirer un j'aime la fait disparaître tout de suite.
  const liked = sortTweets(likedTweets(tweets), 'newest')

  return (
    <main>
      <h1>Mentions J'aime</h1>
      {liked.length === 0 ? (
        <p>Aucun tweet aimé pour le moment.</p>
      ) : (
        <TweetsList tweets={liked} onToggleLike={toggleLike} />
      )}
    </main>
  )
}
