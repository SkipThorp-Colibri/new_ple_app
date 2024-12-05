import { supabase } from '@/lib/supabaseClient'
import type { CreateNewReport } from '@/types/CreateNewForm'
import type { QueryData } from '@supabase/supabase-js'

export const reportsWithProjectsQuery = supabase.from('reports').select(`
  *,
  projects (
    id,
    name,
    slug
  )
  `)
export type ReportsWithProjects = QueryData<typeof reportsWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
  *,
  reports (
    id,
    name,
    status,
    due_date
  )
`,
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return supabase.from('projects').update(updatedProject).eq('id', id)
}

export const reportQuery = (id: string) => {
  return supabase
    .from('reports')
    .select(
      `
    *,
    projects (
      id,
      name,
      slug
    )
    `,
    )
    .eq('id', id)
    .single()
}

export type Report = QueryData<ReturnType<typeof reportQuery>>

export const updateReportQuery = (updatedReport = {}, id: number) => {
  return supabase.from('reports').update(updatedReport).eq('id', id)
}

export const deleteReportQuery = (id: number) => {
  return supabase.from('reports').delete().eq('id', id)
}

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

export const profilesQuery = supabase.from('profiles').select(`id, full_name`)

export const groupedProfilesQuery = (userIds: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const createNewReportQuery = (newReport: CreateNewReport) => {
  return supabase.from('reports').insert(newReport)
}
