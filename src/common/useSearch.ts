import { ref, watch, onMounted } from 'vue'
import { Document } from 'flexsearch'

function useSearch(data: any) {
  const results = ref<Array<any>>()
  const index = ref()
  const loading = ref(false)

  const reset = () => (results.value = data.value)

  const initialize = () => {
    reset()
    index.value = null
  }
  onMounted(initialize)
  watch(data, initialize)

  const createIndex = () => {
    const _index = new Document({
      tokenize: 'full',
      document: {
        id: 'id',
        index: ['name', 'desc', 'license', 'note', 'terms'],
      },
    })
    for (const d of data.value) _index.add(d)
    index.value = _index
  }

  const search = (query: string = '') => {
    if (!data.value) return
    loading.value = true
    if (!index.value) createIndex()
    if (query.length === 0) {
      results.value = data.value
      loading.value = false
      return
    }
    const res = index.value.search(query)
    let ret = []
    for (const field of res) for (const id of field.result) ret.push(data.value.find((item: any) => item.id === id))
    results.value = ret.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
    loading.value = false
  }
  return { results, search, reset, loading }
}

export default useSearch
