import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getTypename } from './'
import dbsites from '@/assets/dbsites.json'

interface Params {
  type: string
  pref?: string
  id?: string
}

function useSiteList() {
  const sites = ref()
  const site = ref()
  const title = ref('')
  const type = ref()
  const pref = ref()
  const typename = ref()
  const loading = ref(true)
  const route = useRoute()
  const getSites = () => {
    loading.value = true
    type.value = route.params.type
    pref.value = route.params.pref
    const data = dbsites.filter((item: Params) => {
      let flag = true
      if (type.value) flag = item.type === type.value
      if (pref.value) flag &&= item.pref === pref.value
      if (route.params.siteId) {
        flag &&= item.id === route.params.siteId
      }
      return flag
    })
    typename.value = getTypename(type.value)
    if (route.params.siteId) {
      site.value = data?.[0]
      title.value = site.value.name
    } else {
      sites.value = data
      title.value = typename.value
    }
    loading.value = false
  }

  onMounted(getSites)
  watch(() => route.params, getSites)
  return { sites, site, title, type, typename, pref, loading }
}

export default useSiteList
