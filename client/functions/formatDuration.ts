export const formatDuration = (duration: number) => {
  const date = new Date(duration * 1000).toISOString()
  if (duration >= 3600) {
    return date.substring(11, 19)
  }
  return date.substring(14, 19)
}
