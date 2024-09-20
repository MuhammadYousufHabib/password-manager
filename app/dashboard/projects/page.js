import { ProjectsJs } from '@/components/projects'
import React from 'react'
import { fetchProjects } from '@/services/api/projects'

export default async function page(){
  const projects=await fetchProjects()
  return(<><ProjectsJs projects={projects}/></>)
}

