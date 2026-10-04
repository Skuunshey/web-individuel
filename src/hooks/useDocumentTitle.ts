import { useEffect } from 'react'

// L'effet touche le titre du document après le rendu. Il ne met pas d'état React à jour.
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | XYZ`
  }, [title])
}
