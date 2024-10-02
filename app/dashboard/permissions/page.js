import { PermissionsJs } from '@/components/permissions';
import React from 'react';
import { fetchPermissions } from '@/services/api/permissions';
import { me_permission } from '@/services/api/me';

export default async function Page() {
  
   const permissions = await fetchPermissions();

    return (
        <>
            <PermissionsJs permissions={permissions} />
        </>
    );
}
