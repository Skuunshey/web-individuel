# Projet individuel - XYZ

Programmation Web - L3 MIASHS - 2026 / 2027

- Prénom : **Jean-Baptiste**
- Nom : **PAQUIN**
- Adresse mail universitaire : **[jean-baptiste.paquin@etu.univ-lorraine.fr](mailto:jean-baptiste.paquin@etu.univ-lorraine.fr)**
- Groupe de TD : **M1**
- Adresse du dépôt GitHub privé : **[https://github.com/Skuunshey/web-individuel](https://github.com/Skuunshey/web-individuel)**

## Lancer le projet

```bash
cd xyz
bun install
bun run dev
```

Vérifications demandées par les énoncés :

```bash
bun run lint
bun tsc --noEmit
bun run build
```

L'application s'ouvre en général sur [http://localhost:5173](http://localhost:5173).

## TD 01

### TD 01 - Élements réalisés

- Type `Tweet` et type `TweetImage` dans `src/types/Tweet.ts`.
- Jeu de données d'au moins dix tweets dans `src/data/tweets.ts`, avec un texte de plus de 180 caractères, deux images distantes et des tweets sans image.
- Composant `TweetPreview` : auteur, `@pseudo`, date lisible, contenu.
- Image affichée seulement si elle existe, avec `src`, `alt` et une classe qui limite la hauteur.
- Liste `TweetsList` avec `key={tweet.id}` sur chaque élément.
- Bouton « Voir plus » / « Voir moins » à partir de 180 caractères, avec l'état `isExpanded`.



### TD 01 - Bonus réalisés

- Nombre de tweets au-dessus du fil.
- Tri du plus récent au plus ancien, sans modifier le tableau d'origine.
- Composant `Avatar` à partir des initiales de l'auteur.



### TD 01 - Élements non réalisés

- Aucun.



### TD 01 - Difficultés rencontrées + Solutions appliquées

- Une variable normale ne suffit pas pour « Voir plus » : React ne réaffiche pas le composant. J'ai utilisé `useState` et la forme `setIsExpanded((previous) => !previous)`.
- L'index du tableau n'est pas une bonne clé, parce que le tri et l'ajout en tête changent les positions. La clé est `tweet.id`.
- `createdAt` reste une chaîne ISO. L'objet `Date` n'est créé qu'au moment d'afficher la date.



## TD 02



### TD 02 - Élements réalisés

- `react-router-dom` en mode déclaratif : `BrowserRouter`, `Routes`, `Route`.
- `App` est le layout commun. Le contenu de la page passe par `<Outlet />`.
- Route index : `TweetsMasterPage`. Route `tweets/:id` : `TweetDetailsPage`. Route `*` : `NotFoundPage`.
- Lien « Voir la discussion » avec `Link`, et lien autour de l'image quand elle existe.
- `parentId` optionnel. Le fil ne montre que les tweets sans `parentId`.
- La page de détail affiche le tweet, ses réponses, ou « Ce tweet n'existe pas ».
- Prop `linkToDetail` (vrai par défaut). La page de détail la passe à `false` pour ne pas créer un lien vers la page déjà ouverte.



### TD 02 - Bonus réalisés

- Route `/a-propos`.
- Liens « Accueil » et « À propos » dans le header.
- Fil d'Ariane sur la page de détail.



### TD 02 - Élements non réalisés

- Aucun.



### TD 02 - Difficultés rencontrées + Solutions appliquées

- Un lien `<a href>` rechargerait le document. `Link` change seulement l'adresse, le header reste affiché.
- Une adresse inconnue (`/nimporte-quoi`) et un identifiant de tweet inconnu ne sont pas le même cas. La première affiche `NotFoundPage`. La seconde reste sur la route `tweets/:id` et affiche « Ce tweet n'existe pas ».



## TD 03



### TD 03 - Élements réalisés

- `likes` et `likedByMe` sur chaque tweet.
- État `tweets` dans `App`, partagé avec `TweetsContext`.
- Les pages lisent le contexte avec `useContext(TweetsContext)!`.
- Formulaire contrôlé `TweetForm` : 280 caractères, compteur, bouton désactivé si le texte est vide ou trop long, `preventDefault`, prop `onSubmit`.
- `addTweet` ajoute un tweet en tête, sans muter l'ancien tableau. Auteur « Vous », pseudo « vous », `crypto.randomUUID()`, date ISO, 0 j'aime.
- `toggleLike` copie le tweet concerné, inverse `likedByMe` et ajuste `likes`. La fonction passe de `App` aux pages, puis à `TweetsList`, puis à `TweetPreview`.
- Bouton « J'aime » / « Je n'aime plus » avec le compteur.
- Total des mentions J'aime des tweets affichés dans le fil.
- Hook `useDocumentTitle` : le titre de l'onglet suit la page (`Accueil | XYZ`, `Tweet de … | XYZ`, `Tweet introuvable | XYZ`, `Page introuvable | XYZ`).
- Favicon, manifeste et logotype fournis. Palette du TD sur le fond, le texte, les liens, les boutons et les bordures.



### TD 03 - Bonus réalisés

- Message « Le tweet ne peut pas être vide » si le champ a déjà été utilisé puis laissé vide. Le bouton reste désactivé.
- Champ « Filtrer par auteur ».
- Case « Ajouter une image » : URL HTTPS et texte alternatif obligatoires tant que la case est cochée. Décocher masque et vide ces champs. `addTweet` reçoit alors un `TweetImage`.



### TD 03 - Élements non réalisés

- Aucun.



### TD 03 - Difficultés rencontrées + Solutions appliquées

- Le fil et la page de détail ne peuvent pas avoir chacun leur copie des tweets, sinon un j'aime ou une publication ne se verrait que sur une page. L'état est dans `App`, le parent commun, puis il descend par le contexte.
- `useDocumentTitle` est appelé avant tout `return`. Sur un tweet inconnu, le titre est quand même « Tweet introuvable | XYZ ».
- L'effet modifie `document.title` après le rendu. Il ne sert pas à calculer ce que React affiche.



## TD Bonus

Ce TD est facultatif. Les cinq parcours sont réalisés.

### TD Bonus - Parcours réalisés

- **A - Répondre.** `addReply` est dans le contexte. La page de détail réutilise `TweetForm` avec le bouton « Répondre ». La réponse a un `parentId`, donc elle reste sous ce tweet et n'entre pas dans le fil.
- **B - Page auteur.** Route `authors/:handle`. Le nom affiché dans `TweetPreview` est un lien vers cette page. Les réponses sont incluses : une réponse est aussi une publication de son auteur. Le fil d'accueil, lui, continue de les cacher.
- **C - Tweets aimés.** Route `/likes`, lien « J'aime » dans le header. La liste est calculée avec `.filter` pendant le rendu. Il n'y a pas d'état séparé.
- **D - Recherche et ordre.** Le champ cherche dans le nom, le pseudo et le contenu, sans tenir compte de la casse ni des espaces aux extrémités. Le menu propose le plus récent, le plus ancien, ou le plus aimé. Le tri se fait sur une copie.
- **E - Fonctions pures.** `src/utils/tweets.ts` contient le filtre, le tri, le total des j'aime et la recherche des réponses. `src/utils/tweets.test.ts` les vérifie avec `bun test`.



### TD Bonus - Élements non réalisés

- Aucun des cinq parcours.



### TD Bonus - Difficultés rencontrées + Solutions appliquées

- Sans `parentId`, une réponse serait un tweet de premier niveau et apparaîtrait dans le fil. `addReply` pose ce champ, et `selectVisibleTweets` écarte tout tweet qui l'a.
- Les pages auteur et « J'aime » n'ont pas leur propre copie des tweets. Elles dérivent une liste au moment du rendu, donc un j'aime retiré disparaît tout de suite.



## Déclaration d'usage de l'IA générative

Dans le cadre de ce projet, j’ai utilisé ponctuellement une intelligence artificielle comme outil d’assistance au développement. Elle m’a notamment aidé à identifier et à déboguer certaines erreurs difficiles à repérer, par exemple un problème lié à un comportement asynchrone bien ambêtant.

J'ai également utilisée l'IA pour effectuer une relecture du code afin de vérifier l’absence d’erreurs majeures, de mauvaises pratiques évidentes et de m’assurer que le code respectait globalement les standards et conventions de programmation.

Enfin, je l’ai utilisée pour générer une documentation plus détaillée à partir de mon code. Cette documentation est destinée uniquement à mon usage personnel, notamment pour des futurs projets personnels ou j'ai besoin de beacoup de documentation et de code liés. Elle ne fait donc pas partie du rendu final.