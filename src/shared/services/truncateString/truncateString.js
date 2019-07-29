function truncateString(string, char) {
  if (string.length > char) {
    return string.replace(new RegExp(`(.{${char}})..+`), '$1...')
  }

  return string
}

export default truncateString
