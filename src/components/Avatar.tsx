import type { ReactElement } from 'react'

type AvatarProps = {
  authorName: string
}

// Première lettre des deux premiers mots : "Ada Lovelace" -> AL, "John von Neumann" -> JV.
function initialsOf(authorName: string): string {
  const words = authorName.trim().split(/\s+/)
  const first = words[0]?.charAt(0) ?? ''
  const second = words[1]?.charAt(0) ?? ''

  return (first + second).toLocaleUpperCase('fr-FR')
}

export function Avatar({ authorName }: AvatarProps): ReactElement {
  return (
    <span className="avatar" aria-hidden="true">
      {initialsOf(authorName)}
    </span>
  )
}
