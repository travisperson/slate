
import assert from 'assert'

export default function (state) {
  const { document, selection } = state
  const texts = document.getTexts()
  const first = texts.first()
  const second = texts.get(1)
  const last = texts.last()

  const range = selection.merge({
    anchorKey: last.key,
    anchorOffset: 3,
    focusKey: first.key,
    focusOffset: 0,
    isBackward: true
  })

  const next = state
    .transform()
    .select(range)
    .delete()
    .apply()

  assert.deepEqual(
    next.selection.toJS(),
    {
      anchorKey: second.key,
      anchorOffset: 0,
      focusKey: second.key,
      focusOffset: 0,
      isBackward: false,
      isFocused: false,
      marks: null
    }
  )

  return next
}
