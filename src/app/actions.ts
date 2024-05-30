'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteUser } from '../data-access/users'
import { getSession } from '../lib/auth'

export async function deleteAccountAction() {
  // delete user account
  const session = await getSession()
  if (!session) {
    throw new Error('You must be logged in to delete your account ')
  }

  await deleteUser(session.user.id)
}
