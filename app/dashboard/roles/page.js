import { RolesJs } from '@/components/roles';
import { me_role } from '@/services/api/me';
import { fetchRoles } from '@/services/api/roles';
import React from 'react';

export default async function Page() {
    let roles;

    try {
        roles = await fetchRoles();
    } catch (error) {
        if (error.message === "Failed to GET") {
            roles = await me_role()
        } else {
            console.log("me FetchRoles failed:", error);
        }
    }

    return (
        <div>
            <RolesJs roles={roles} /> 
        </div>
    );
}
