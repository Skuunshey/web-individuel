import { useState, type ChangeEvent, type ReactElement, type SubmitEvent } from 'react'
import type { TweetImage } from '../types/Tweet.ts'

const CONTENT_MAX_LENGTH = 280

export type TweetFormProps = {
  // image est absent quand la case n'est pas cochée.
  onSubmit: (content: string, image?: TweetImage) => void
  placeholder?: string
  submitLabel?: string
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    // startsWith("https://") laisserait passer une adresse sans nom d'hôte.
    return url.protocol === 'https:' && url.hostname.length > 0
  } catch {
    return false
  }
}

export function TweetForm({
  onSubmit,
  placeholder = 'Quoi de neuf ?',
  submitLabel = 'Publier',
}: TweetFormProps): ReactElement {
  const [content, setContent] = useState('')
  const [hasBeenEdited, setHasBeenEdited] = useState(false)
  const [addImage, setAddImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const trimmedContent = content.trim()
  const trimmedUrl = imageUrl.trim()
  const trimmedAlt = imageAlt.trim()
  const contentTooLong = trimmedContent.length > CONTENT_MAX_LENGTH
  const contentEmpty = trimmedContent.length === 0
  const imageIncomplete = addImage && (!isHttpsUrl(trimmedUrl) || trimmedAlt.length === 0)
  const canSubmit = !contentEmpty && !contentTooLong && !imageIncomplete
  const showEmptyError = hasBeenEdited && contentEmpty
  const remaining = CONTENT_MAX_LENGTH - content.length

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setHasBeenEdited(true)
    setContent(event.target.value)
  }

  function handleAddImageChange(event: ChangeEvent<HTMLInputElement>): void {
    const checked = event.target.checked
    setAddImage(checked)

    // Décocher masque les champs et les vide, sinon une ancienne URL resterait en mémoire.
    if (!checked) {
      setImageUrl('')
      setImageAlt('')
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    const image: TweetImage | undefined = addImage
      ? { url: trimmedUrl, alt: trimmedAlt }
      : undefined

    onSubmit(trimmedContent, image)
    setContent('')
    setHasBeenEdited(false)
    setAddImage(false)
    setImageUrl('')
    setImageAlt('')
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label htmlFor="tweet-content" className="visually-hidden">
        {placeholder}
      </label>
      <textarea
        id="tweet-content"
        value={content}
        onChange={handleContentChange}
        placeholder={placeholder}
        rows={3}
        aria-invalid={showEmptyError}
        aria-describedby={showEmptyError ? 'tweet-error' : undefined}
      />

      {showEmptyError && (
        <p id="tweet-error" className="form-error">
          Le tweet ne peut pas être vide.
        </p>
      )}

      <label className="checkbox">
        <input type="checkbox" checked={addImage} onChange={handleAddImageChange} />
        Ajouter une image
      </label>

      {addImage && (
        <div className="image-fields">
          <label>
            URL HTTPS
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://"
            />
          </label>
          <label>
            Texte alternatif
            <input
              type="text"
              value={imageAlt}
              onChange={(event) => setImageAlt(event.target.value)}
            />
          </label>
          {imageIncomplete && (
            <p className="hint">
              Indiquez une URL HTTPS valide et un texte alternatif non vide.
            </p>
          )}
        </div>
      )}

      <div className="composer-footer">
        <p className={remaining < 0 ? 'remaining over' : 'remaining'}>
          {remaining} caractères restants
        </p>
        <button type="submit" disabled={!canSubmit}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
