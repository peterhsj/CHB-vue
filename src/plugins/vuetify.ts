import "vuetify/styles"

/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import DateFnsAdapter from '@date-io/date-fns'
import { zhTW } from 'date-fns/locale'
// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { en, zhHant } from 'vuetify/locale'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.css'
import '@/styles/main.scss'

const customZh = {
  ...zhHant,
  dataFooter: {
    ...zhHant.dataFooter,
    pageText: '{0}-{1} 共 {2} 筆',
    itemsPerPageText: '每頁筆數：',
  },
  loading: '資料載入中... 請稍後',
  noDataText: '尚無資料',
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  date: {
    adapter: new DateFnsAdapter({ locale: zhTW }),
    // dateFormat: 'yyyy-MM-dd',
  },
  locale: {
    locale: 'zhHant',
    messages: {
      zhHant: customZh,
      en,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
  },
})
