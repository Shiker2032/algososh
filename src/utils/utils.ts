export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function generateRandomArray(min: number, max: number) {
  const length = getRandomNumber(3, 19)
  const array = Array.from({ length }, () => getRandomNumber(min, max))
  return array
}
