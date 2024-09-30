import { PermissionsJs } from '@/components/permissions';
import React from 'react';
import { fetchPermissions } from '@/services/api/permissions';
import { me_permission } from '@/services/api/me';

export default async function Page() {
    let permissions;

    try {
        permissions = await fetchPermissions();
    } catch (error) {
        if (error.message === "Failed to GET") {
            permissions = await me_permission();
        } else {
            console.log("Fetch me Permissions failed:", error);
        }
    }

    return (
        <>
            <PermissionsJs permissions={permissions} />
        </>
    );
}
