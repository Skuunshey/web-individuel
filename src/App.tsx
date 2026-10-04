import { useState, type ReactElement } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { TweetsContext, type TweetsContextValue } from './contexts/TweetsContext.ts'
import { initialTweets } from './data/tweets.ts'
import type { Tweet, TweetImage } from './types/Tweet.ts'

export function App(): ReactElement {
  // L'état est ici : c'est le parent commun du fil et de la page de détail.
  const [tweets, setTweets] = useState<Array<Tweet>>(initialTweets)

  function addTweet(content: string, image?: TweetImage): void {
    const tweet: Tweet = {
      id: crypto.randomUUID(),
      authorName: 'Vous',
      authorHandle: 'vous',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      ...(image ? { image } : {}),
    }

    // On copie l'ancien tableau et on ajoute devant. On ne fait pas push sur l'état actuel.
    setTweets((previous) => [tweet, ...previous])
  }

  function addReply(parentId: string, content: string, image?: TweetImage): void {
    // Mêmes valeurs qu'une publication, plus le parentId : ce tweet est une réponse.
    const tweet: Tweet = {
      id: crypto.randomUUID(),
      authorName: 'Vous',
      authorHandle: 'vous',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      parentId,
      ...(image ? { image } : {}),
    }

    setTweets((previous) => [tweet, ...previous])
  }

  function toggleLike(id: string): void {
    setTweets((previous) =>
      previous.map((tweet) => {
        if (tweet.id !== id) {
          return tweet
        }

        return {
          ...tweet,
          likedByMe: !tweet.likedByMe,
          likes: tweet.likes + (tweet.likedByMe ? -1 : 1),
        }
      }),
    )
  }

  const context: TweetsContextValue = { tweets, addTweet, addReply, toggleLike }

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <img src="/xyz.png" alt="Mascotte de XYZ" width="48" height="48" />
          <span>XYZ</span>
        </div>
        <nav aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/likes">J'aime</Link>
          <Link to="/a-propos">À propos</Link>
        </nav>
      </header>

      <TweetsContext.Provider value={context}>
        <Outlet />
      </TweetsContext.Provider>
    </div>
  )
}
