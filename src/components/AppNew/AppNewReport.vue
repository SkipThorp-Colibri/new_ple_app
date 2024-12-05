<script setup lang="ts">
import type { CreateNewReport } from '@/types/CreateNewForm'
import { createNewReportQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel<boolean>()

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id,
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()

const { profile } = storeToRefs(useAuthStore())

const createReport = async (formData: CreateNewReport) => {
  const report = {
    ...formData,
    collaborators: [profile.value!.id],
  }

  const { error } = await createNewReportQuery(report)

  if (error) {
    console.log(error)
  }

  sheetOpen.value = false
}

type SelectOption = { label: string; value: string | number }

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[],
})
</script>
<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new report</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        @submit="createReport"
        submit-label="Create report"
        :config="{
          validationVisibility: 'submit',
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new report"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Report description"
          validation="length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
