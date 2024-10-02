import { ModesJs } from '@/components/modes'
import React from 'react'
import { fetchModes } from '@/services/api/modes'

export default async function Page(){
  const modes=await fetchModes()
  return (
    <div className="bg-background text-foreground min-h-screen">
      <ModesJs modes={modes}/>
    </div>
  )
}