export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  return `${base}${src}`
}
