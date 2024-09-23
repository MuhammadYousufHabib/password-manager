import { RolesJs } from '@/components/roles'
import { fetchRoles } from '@/services/api/roles'
import React from 'react'

export default async function Page() {
    // const roles = await fetchRoles(); 

    return (
        <div>
            <RolesJs roles={[]} />
        </div>
    )
}
