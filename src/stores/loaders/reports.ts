import { reportQuery, reportsWithProjectsQuery, updateReportQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { deleteReportQuery, type Report, type ReportsWithProjects } from '@/utils/supaQueries'
export const useReportsStore = defineStore('reports-store', () => {
  const reports = ref<ReportsWithProjects | null>(null)
  const report = ref<Report | null>(null)
  const loadReports = useMemoize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (id: string) => await reportsWithProjectsQuery,
  )
  const loadReport = useMemoize(async (slug: string) => await reportQuery(slug))
  interface ValidateCacheParams {
    ref: typeof reports | typeof report
    query: typeof reportsWithProjectsQuery | typeof reportQuery
    key: string
    loaderFn: typeof loadReports | typeof loadReport
  }
  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getReports = async () => {
    reports.value = null
    const { data, error, status } = await loadReports('reports')
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) reports.value = data
    validateCache({
      ref: reports,
      query: reportsWithProjectsQuery,
      key: 'reports',
      loaderFn: loadReports,
    })
  }
  const getReport = async (id: string) => {
    report.value = null
    const { data, error, status } = await loadReport(id)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) report.value = data
    validateCache({
      ref: report,
      query: reportQuery,
      key: id,
      loaderFn: loadReport,
    })
  }
  const updateReport = async () => {
    if (!report.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...reportProperties } = report.value
    await updateReportQuery(reportProperties, report.value.id)
  }

  const deleteReport = async () => {
    if (!report.value) return

    await deleteReportQuery(report.value.id)
  }
  return {
    reports,
    getReports,
    getReport,
    report,
    updateReport,
    deleteReport,
  }
})
