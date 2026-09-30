export function waitForImage(image) {
  return new Promise((resolve) => {
    const finish = () => {
      if (typeof image.decode !== 'function' || image.naturalWidth === 0) {
        resolve()
        return
      }

      image.decode().catch(() => {}).finally(resolve)
    }

    if (image.complete) {
      finish()
      return
    }

    image.addEventListener('load', finish, { once: true })
    image.addEventListener('error', resolve, { once: true })
  })
}

export function waitForImages(root = document) {
  const images = Array.from(root.querySelectorAll('img'))
  return Promise.all(images.map(waitForImage))
}
