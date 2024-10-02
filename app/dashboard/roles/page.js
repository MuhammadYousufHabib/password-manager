import { RolesJs } from '@/components/roles';
import { me_role } from '@/services/api/me';
import { fetchRoles } from '@/services/api/roles';
import React from 'react';

export default async function Page() {
  const roles = await fetchRoles();
    return (
        <div>
            <RolesJs roles={roles} /> 
        </div>
    );
}
