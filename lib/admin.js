import { cookies } from 'next/headers'
import { createHash, timingSafeEqual } from 'crypto'

export const ADMIN_COOKIE = 'rigeta_admin'

export const adminToken = () =>
  createHash('sha256').update(`rigeta-admin:${process.env.ADMIN_PASSWORD}`).digest('hex')

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false
  const vrijednost = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!vrijednost) return false
  const a = Buffer.from(vrijednost)
  const b = Buffer.from(adminToken())
  return a.length === b.length && timingSafeEqual(a, b)
}
