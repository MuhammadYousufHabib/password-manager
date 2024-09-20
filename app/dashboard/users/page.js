import UsersPage from '@/components/users'
import { fetchUsers } from '@/services/api/users'

export default async function Page() {
  const users = await fetchUsers()

  console.log("------>>",users)

  return <UsersPage users={users} />
}