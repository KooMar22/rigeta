'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ADMIN_COOKIE, adminToken, isAdmin } from '@/lib/admin'
import { getSupabase } from '@/lib/supabase'

export async function prijava(formData) {
  const lozinka = String(formData.get('lozinka') ?? '')
  if (!process.env.ADMIN_PASSWORD || lozinka !== process.env.ADMIN_PASSWORD) redirect('/admin?greska=1')
  ;(await cookies()).set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 8,
  })
  redirect('/admin')
}

export async function odjava() {
  ;(await cookies()).delete({ name: ADMIN_COOKIE, path: '/admin' })
  redirect('/admin')
}

export async function spremiCijenu(formData) {
  if (!(await isAdmin())) redirect('/admin')
  const supabase = getSupabase()
  const id = String(formData.get('id'))
  const mpc = Math.round(Number(String(formData.get('mpc')).replace(',', '.')) * 100) / 100
  if (!supabase || !id || !Number.isFinite(mpc) || mpc <= 0) return

  const { error } = await supabase
    .from('cjenik_stavke')
    .update({ mpc, azurirano: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(`Spremanje cijene nije uspjelo: ${error.message}`)

  // povijest cijena služi za izračun najniže cijene u zadnjih 30 dana
  const povijest = await supabase.from('cjenik_povijest').insert({ stavka_id: id, mpc })
  if (povijest.error) throw new Error(`Spremanje povijesti cijene nije uspjelo: ${povijest.error.message}`)

  revalidatePath('/admin')
}
