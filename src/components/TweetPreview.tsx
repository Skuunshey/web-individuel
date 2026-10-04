import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { Tweet } from '../types/Tweet.ts'
import { Avatar } from './Avatar.tsx'

// Au-delà, on tronque et on affiche le bouton. En dessous, pas de bouton.
const CONTENT_PREVIEW_LENGTH = 180

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  // Heure de Paris : l'affichage ne change pas si l'ordinateur est sur un autre fuseau.
  timeZone: 'Europe/Paris',
})

export type TweetPreviewProps = {
  tweet: Tweet
  // true par défaut. Sur la page du tweet, on passe false pour ne pas lier vers soi-même.
  linkToDetail?: boolean
  onToggleLike: (id: string) => void
}

export function TweetPreview({
  tweet,
  linkToDetail = true,
  onToggleLike,
}: TweetPreviewProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = tweet.content.length > CONTENT_PREVIEW_LENGTH
  const visibleContent =
    isLong && !isExpanded
      ? `${tweet.content.slice(0, CONTENT_PREVIEW_LENGTH)}...`
      : tweet.content
  const detailPath = `/tweets/${tweet.id}`

  function handleToggleExpanded(): void {
    // Forme fonctionnelle : une variable classique ne redemanderait pas un rendu.
    setIsExpanded((previous) => !previous)
  }

  function handleToggleLike(): void {
    onToggleLike(tweet.id)
  }

  return (
    <article className="tweet">
      <Avatar authorName={tweet.authorName} />
      <div className="tweet-body">
        <p className="tweet-meta">
          <Link to={`/authors/${tweet.authorHandle}`}>
            <strong>{tweet.authorName}</strong>
          </Link>{' '}
          <span>@{tweet.authorHandle}</span>{' '}
          <time dateTime={tweet.createdAt}>{dateFormatter.format(new Date(tweet.createdAt))}</time>
        </p>

        {/* Rien n'est rendu si image est absent : pas de cadre vide. */}
        {tweet.image &&
          (linkToDetail ? (
            <Link className="tweet-image-link" to={detailPath}>
              <img className="tweet-image" src={tweet.image.url} alt={tweet.image.alt} />
            </Link>
          ) : (
            <img className="tweet-image" src={tweet.image.url} alt={tweet.image.alt} />
          ))}

        <p className="tweet-content">{visibleContent}</p>

        {isLong && (
          <button type="button" className="text-button" onClick={handleToggleExpanded}>
            {isExpanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}

        <button
          type="button"
          className={tweet.likedByMe ? 'like-button liked' : 'like-button'}
          onClick={handleToggleLike}
        >
          {tweet.likedByMe ? 'Je n’aime plus' : 'J’aime'} ({tweet.likes})
        </button>

        {linkToDetail && <Link to={detailPath}>Voir la discussion</Link>}
      </div>
    </article>
  )
}
