// Image et texte alternatif restent ensemble : une image sans alt ne doit pas exister.
export type TweetImage = {
  url: string
  alt: string
}

// createdAt est une chaîne ISO 8601. Le JSON n'a pas de vrai type Date,
// on ne fabrique un objet Date qu'au moment d'afficher.
export type Tweet = {
  id: string
  authorName: string
  authorHandle: string
  content: string
  image?: TweetImage
  createdAt: string
  // Présent seulement si ce tweet répond à un autre.
  parentId?: string
  likes: number
  likedByMe: boolean
}
