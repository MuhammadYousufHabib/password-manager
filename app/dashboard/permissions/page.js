import { PermissionsJs } from '@/components/permissions';
import React from 'react';
import { fetchPermissions } from '@/services/api/permissions';

export default async function Page() {
  const permissions = await fetchPermissions();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PermissionsJs permissions={permissions} />
    </div>
  );
}
