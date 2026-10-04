import type { ReactElement } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'

export function AboutPage(): ReactElement {
  useDocumentTitle('À propos')

  return (
    <main className="about">
      <h1>À propos</h1>
      <p>
        XYZ est un fil de messages court. On y lit des tweets, on ouvre une discussion, on publie
        un message et on peut indiquer qu'on aime un tweet.
      </p>
      <p>
        Les textes du jeu de données s'inspirent de citations de personnes de l'histoire de
        l'informatique. Les portraits viennent de Wikimedia Commons.
      </p>
    </main>
  )
}
