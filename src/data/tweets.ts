import type { Tweet } from '../types/Tweet.ts'

const ADA_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/500px-Ada_Lovelace_portrait.jpg'
const GRACE_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg'

// Au moins dix tweets, un texte > 180 caractères, deux images, et des tweets sans image.
// Les réponses ont un parentId : elles ne s'affichent pas dans le fil principal.
// Les citations viennent des sources indiquées dans les consignes.
export const initialTweets: Array<Tweet> = [
  {
    id: 'a0121e45-1e4c-4b9f-8d33-2f1a6c8e3bcc',
    authorName: 'Grace Hopper',
    authorHandle: 'ghopper',
    content:
      'Une nanoseconde mesure à peu près trente centimètres de fil. Le temps devient plus simple à voir.',
    image: {
      url: GRACE_IMAGE,
      alt: 'Portrait de Grace Hopper',
    },
    createdAt: '2026-07-02T06:00:00.000Z',
    likes: 72,
    likedByMe: false,
  },
  {
    id: 'b1232f56-2f5d-4c0a-9e44-3a2b7d9f4cdd',
    authorName: 'Grace Hopper',
    authorHandle: 'ghopper',
    content: 'Toujours aussi vrai des années plus tard, Ada !',
    createdAt: '2026-07-01T09:30:00.000Z',
    parentId: '4c1a9e20-6b3d-4f8a-9c21-1a0e5d7b2f11',
    likes: 12,
    likedByMe: false,
  },
  {
    id: '9f1e0d34-0d3b-4a8e-9c22-1e0f5b7d2abb',
    authorName: 'Katherine Johnson',
    authorHandle: 'kjohnson',
    content:
      'Je comptais tout : les trajectoires, les fenêtres de lancement, les chiffres qu’on me confiait.',
    createdAt: '2026-07-02T09:15:00.000Z',
    likes: 58,
    likedByMe: false,
  },
  {
    id: '8e0d9c23-9c2a-4f7d-8b11-0d9e4a6c1faa',
    authorName: 'Dennis Ritchie',
    authorHandle: 'dmr',
    content:
      'Le langage C a grandi avec les programmes qui l’utilisaient, plutôt qu’à partir d’un plan figé.',
    createdAt: '2026-07-02T16:40:00.000Z',
    likes: 40,
    likedByMe: false,
  },
  {
    id: '7d9c8b12-8b1f-4e6c-9a00-9c8d3f5b0e99',
    authorName: 'Margaret Hamilton',
    authorHandle: 'mhamilton',
    content:
      'Nous n’avions pas le choix, il fallait inventer la façon dont ces programmes devaient fonctionner.',
    createdAt: '2026-07-03T06:05:00.000Z',
    likes: 73,
    likedByMe: false,
  },
  {
    id: '6c8b7a01-7a0e-4d5b-8f99-8b7c2e4a9d88',
    authorName: 'Alan Turing',
    authorHandle: 'aturing',
    content: 'Je propose d’examiner la question suivante : les machines peuvent-elles penser ?',
    createdAt: '2026-07-03T14:20:00.000Z',
    likes: 61,
    likedByMe: false,
  },
  {
    id: '5b7a6f90-6f9d-4c4a-9e88-7a6b1d3f8c77',
    authorName: 'Barbara Liskov',
    authorHandle: 'bliskov',
    content:
      'J’ai eu l’idée de l’abstraction de données. C’était une idée merveilleuse. Elle est sortie de nulle part.',
    createdAt: '2026-07-04T09:50:00.000Z',
    likes: 48,
    likedByMe: false,
  },
  {
    id: '4a6f5e80-5e8c-4b3f-8d77-6f5a0c2e7b66',
    authorName: 'Donald Knuth',
    authorHandle: 'dknuth',
    content:
      'Nous devrions oublier les petits gains d’efficacité, environ 97 % du temps : l’optimisation prématurée est la racine de tous les maux. Pourtant, nous ne devons pas laisser passer les occasions qui se présentent dans ces 3 % décisifs.',
    createdAt: '2026-07-04T18:15:00.000Z',
    likes: 55,
    likedByMe: false,
  },
  {
    id: '3f5e4d70-4d7b-4a2e-9c66-5e4f9b1d6a55',
    authorName: 'Radia Perlman',
    authorHandle: 'rperlman',
    content:
      'L’algorithme de l’arbre couvrant était un bricolage que je considérais comme une mauvaise idée.',
    createdAt: '2026-07-05T07:40:00.000Z',
    likes: 64,
    likedByMe: false,
  },
  {
    id: '2e4d3c60-3c6a-4f1d-8b55-4d3e8a0c5f44',
    authorName: 'John von Neumann',
    authorHandle: 'jvonneumann',
    content:
      'Le seul fait certain est que les difficultés proviennent d’une évolution qui, bien qu’utile et constructive, est également dangereuse.',
    createdAt: '2026-07-05T13:05:00.000Z',
    likes: 70,
    likedByMe: false,
  },
  {
    id: 'c2343a67-3a6e-4d1b-8f55-4b3c8e0a5dee',
    authorName: 'Alan Turing',
    authorHandle: 'aturing',
    content: 'Une machine peut appliquer des règles. Décider si elle pense est une autre question.',
    createdAt: '2026-07-05T16:00:00.000Z',
    parentId: '2e4d3c60-3c6a-4f1d-8b55-4d3e8a0c5f44',
    likes: 9,
    likedByMe: false,
  },
  {
    id: '1d3c2b50-2b5f-4e0c-9a44-3c2d7f9b4e33',
    authorName: 'Linus Torvalds',
    authorHandle: 'torvalds',
    content: 'Je pouvais faire mieux en deux semaines, et c’est ce que j’ai fait.',
    createdAt: '2026-07-06T10:10:00.000Z',
    likes: 152,
    likedByMe: true,
  },
  {
    id: '8e2b1c40-1a4e-4d9b-8f33-2b1c6e8a3d22',
    authorName: 'Tim Berners-Lee',
    authorHandle: 'timbl',
    content:
      'La puissance d’un lien hypertexte tient à ce que tout doit pouvoir être relié à tout. Cela exige que toute chose puisse être publiée sur le Web.',
    createdAt: '2026-07-06T20:00:00.000Z',
    likes: 88,
    likedByMe: false,
  },
  {
    id: '4c1a9e20-6b3d-4f8a-9c21-1a0e5d7b2f11',
    authorName: 'Ada Lovelace',
    authorHandle: 'ada',
    content:
      'La machine analytique n’a nullement la prétention de créer quoi que ce soit. Elle peut exécuter tout ce que nous savons lui ordonner d’exécuter.',
    image: {
      url: ADA_IMAGE,
      alt: 'Portrait d’Ada Lovelace',
    },
    createdAt: '2026-09-01T09:12:00.000Z',
    likes: 42,
    likedByMe: false,
  },
]
