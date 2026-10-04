import { useContext, type ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TweetsList } from '../components/TweetsList.tsx'
import { TweetsContext } from '../contexts/TweetsContext.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { sortTweets, tweetsByHandle } from '../utils/tweets.ts'

export function AuthorPage(): ReactElement {
  const { tweets, toggleLike } = useContext(TweetsContext)!
  const { handle } = useParams<{ handle: string }>()
  // Les réponses sont incluses : une réponse est aussi une publication de cet auteur.
  const authored =
    handle === undefined ? [] : sortTweets(tweetsByHandle(tweets, handle), 'newest')
  const authorName = authored[0]?.authorName

  useDocumentTitle(authorName ?? 'Auteur introuvable')

  if (!authorName || handle === undefined) {
    return (
      <main>
        <h1>Auteur introuvable</h1>
        <p>Aucun auteur ne correspond à @{handle ?? ''}.</p>
        <Link to="/">Retour à l'accueil</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{authorName}</h1>
      <p className="author-handle">@{handle}</p>
      <TweetsList tweets={authored} onToggleLike={toggleLike} />
    </main>
  )
}
