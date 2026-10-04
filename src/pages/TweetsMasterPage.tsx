import { useContext, useState, type ChangeEvent, type ReactElement } from 'react'
import { TweetForm } from '../components/TweetForm.tsx'
import { TweetsList } from '../components/TweetsList.tsx'
import { TweetsContext } from '../contexts/TweetsContext.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { selectVisibleTweets, totalLikes, type TweetSortOrder } from '../utils/tweets.ts'

export function TweetsMasterPage(): ReactElement {
  useDocumentTitle('Accueil')

  const { tweets, addTweet, toggleLike } = useContext(TweetsContext)!
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<TweetSortOrder>('newest')
  // Calculé pendant le rendu. Pas de useEffect, pas de copie dans un autre état.
  const visibleTweets = selectVisibleTweets(tweets, search, order)
  const likesCount = totalLikes(visibleTweets)

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.target.value)
  }

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value

    if (value === 'newest' || value === 'oldest' || value === 'mostLiked') {
      setOrder(value)
    }
  }

  const tweetWord = visibleTweets.length === 1 ? 'tweet' : 'tweets'
  const likeWord = likesCount === 1 ? 'mention' : 'mentions'

  return (
    <main>
      <TweetForm onSubmit={addTweet} />

      <div className="feed-tools">
        <label className="filter">
          <span className="visually-hidden">Rechercher</span>
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Rechercher (auteur, pseudo ou texte)"
          />
        </label>

        <label>
          <span className="visually-hidden">Ordre</span>
          <select value={order} onChange={handleOrderChange}>
            <option value="newest">Du plus récent au plus ancien</option>
            <option value="oldest">Du plus ancien au plus récent</option>
            <option value="mostLiked">Des plus aimés aux moins aimés</option>
          </select>
        </label>
      </div>

      <p className="feed-count">
        {visibleTweets.length} {tweetWord} - {likesCount} {likeWord} J'aime
      </p>

      {visibleTweets.length === 0 ? (
        <p>Aucun tweet ne correspond à cette recherche.</p>
      ) : (
        <TweetsList tweets={visibleTweets} onToggleLike={toggleLike} />
      )}
    </main>
  )
}
