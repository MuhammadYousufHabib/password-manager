import React from 'react';
import { ProjectsJs } from '@/components/projects';
import { fetchProjects } from '@/services/api/projects';

export default async function Page() {
  // Uncomment the line below to fetch projects when you're ready to implement the API call.
  // const projects = await fetchProjects();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ProjectsJs projects={[]} />
    </div>
  );
}
