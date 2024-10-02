import { ProjectsJs } from '@/components/projects'
import React from 'react'
import { fetchProjects } from '@/services/api/projects'
import { get_projects } from '@/services/api/me'

export default async function page(){
 
  const projects=await  get_projects()
  return(<><ProjectsJs projects={projects}/></>)
}

