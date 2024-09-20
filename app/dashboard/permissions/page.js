import { PermissionsJs } from '@/components/permissions'
import React from 'react'
import { fetchPermissions } from '@/services/api/permissions'

export default async function(){
const permissions=await fetchPermissions()
  return(<><PermissionsJs permissions={permissions}/>
  
  </>)
}