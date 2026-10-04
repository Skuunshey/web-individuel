import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'

export function NotFoundPage(): ReactElement {
  useDocumentTitle('Page introuvable')

  return (
    <main>
      <h1>Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page de XYZ.</p>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  )
}
