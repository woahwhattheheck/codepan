const ORDERED_PANS = ['html', 'css', 'js', 'console', 'output']

export default (pans, pan, widths = {}) => {
  const visibleOrdered = ORDERED_PANS.filter(p => pans.indexOf(p) !== -1)
  const specifiedTotal = visibleOrdered
    .filter(p => widths[p] != null)
    .reduce((sum, p) => sum + widths[p], 0)
  const unspecified = visibleOrdered.filter(p => widths[p] == null)
  const evenShare =
    unspecified.length > 0
      ? Math.max(0, (100 - specifiedTotal) / unspecified.length)
      : 0
  const widthOf = p => (widths[p] != null ? widths[p] : evenShare)

  const idx = ORDERED_PANS.indexOf(pan)
  const sumRange = list =>
    list
      .filter(p => visibleOrdered.indexOf(p) !== -1)
      .reduce((sum, p) => sum + widthOf(p), 0)

  return {
    left: `${sumRange(ORDERED_PANS.slice(0, idx))}%`,
    right: `${sumRange(ORDERED_PANS.slice(idx + 1))}%`
  }
}
