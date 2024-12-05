<script setup lang="ts">
import { columns } from '@/utils/tableColumns/reportsColumns'

usePageStore().pageData.title = 'My Reports'

const reportsLoader = useReportsStore()
const { reports } = storeToRefs(reportsLoader)
const { getReports } = reportsLoader

await getReports()
const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(reports.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
useMeta({
  title: 'Reports | Pulse',
  description: {
    name: 'description',
    content: 'Pulse is a ...',
  },
})
</script>

<template>
  <DataTable v-if="reports" :columns="columnsWithCollabs" :data="reports" />
</template>
