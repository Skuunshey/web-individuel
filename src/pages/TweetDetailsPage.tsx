import { useContext, type ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TweetForm } from '../components/TweetForm.tsx'
import { TweetPreview } from '../components/TweetPreview.tsx'
import { TweetsList } from '../components/TweetsList.tsx'
import { TweetsContext } from '../contexts/TweetsContext.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { repliesOf, sortTweets } from '../utils/tweets.ts'

export function TweetDetailsPage(): ReactElement {
  const { tweets, addReply, toggleLike } = useContext(TweetsContext)!
  const { id } = useParams<{ id: string }>()
  const tweet = tweets.find((item) => item.id === id)

  // Le hook est appelé avant le return : il ne doit pas être dans un if.
  useDocumentTitle(tweet ? `Tweet de ${tweet.authorName}` : 'Tweet introuvable')

  if (!tweet) {
    return (
      <main>
        <p>Ce tweet n'existe pas</p>
        <Link to="/">Retour à l'accueil</Link>
      </main>
    )
  }

  const replies = sortTweets(repliesOf(tweets, tweet.id), 'newest')

  return (
    <main>
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span> / Tweet de {tweet.authorName}</span>
      </nav>

      <TweetPreview tweet={tweet} linkToDetail={false} onToggleLike={toggleLike} />

      <div className="reply-form">
        <TweetForm
          placeholder="Votre réponse"
          submitLabel="Répondre"
          onSubmit={(content, image) => addReply(tweet.id, content, image)}
        />
      </div>

      {replies.length === 0 ? (
        <p className="empty-replies">Aucune réponse pour le moment.</p>
      ) : (
        <TweetsList tweets={replies} onToggleLike={toggleLike} />
      )}
    </main>
  )
}
