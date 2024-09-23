import UsersPage from '@/components/users'
import { fetchUsers } from '@/services/api/users'

export default async function Page() {
  // const users = await fetchUsers()

  return <UsersPage users={[]} />
}