<template>
  <div class="d-flex align-center justify-center ga-1 my-3 text-grey-darken-4">
    <v-pagination
      active-color="teal-darken-2"
      color="teal-darken-2"
      density="compact"
      :length="props.totalPages"
      :model-value="props.page"
      show-first-last-page
      :total-visible="5"
      @update:model-value="$emit('update:page', $event)"
    />

    <div class="d-flex align-center ga-1">
      <span class="mx-2 text-body-2">每頁筆數：</span>

      <v-select
        bg-color="white"
        color="teal-darken-2"
        density="compact"
        hide-details
        :items="props.itemsPerPageOptions"
        :model-value="props.itemsPerPage"
        variant="outlined"
        @update:model-value="$emit('update:itemsPerPage', $event)"
      />
    </div>

    <v-spacer />

    <span class="mx-2 text-body-2 text-right">
      <span class="text-red-darken-3">總筆數：</span>
      {{ props.totalItems }}

      <span v-if="props.isShowTotalPages">
        <span class="text-red-darken-3"> / 總頁數：</span>
        {{ props.totalPages }}
      </span>

      <span v-if="props.isShowCurrentPageTotalAmount">
        <span class="text-red-darken-3"> / 本頁總金額：</span>
        NT$ {{ thousandsFormatting(props.totalPageAmount ?? 0) }}
        <br />
      </span>

      <span v-if="props.isShowTotalPagePositiveBalanceAmount">
        <span class="text-red-darken-3"> / 可用餘額大於零總筆數：</span>
        {{ props.totalPagePositiveBalanceItems ?? 0 }}
      </span>

      <span v-if="props.isShowTotalPagePositiveBalanceAmount">
        <span class="text-red-darken-3"> / 可用餘額大於零總金額：</span>
        NT$ {{ thousandsFormatting(props.totalPagePositiveBalanceAmount ?? 0) }}
      </span>

      <span v-if="props.isShowTotalAmount">
        <span class="text-red-darken-3"> / 總金額：</span>
        NT$ {{ thousandsFormatting(props.totalAmount ?? 0) }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { thousandsFormatting } from '@/utils/format'

  const props = withDefaults(defineProps<{
    page: number
    itemsPerPage: number
    // 總筆數
    totalItems: number
    // 總頁數
    isShowTotalPages?: boolean
    totalPages: number
    // 總金額
    isShowTotalAmount?: boolean
    totalAmount?: number
    // 本頁總金額
    isShowCurrentPageTotalAmount?: boolean
    totalPageAmount?: number
    // 可用餘額大於零總筆數
    isShowTotalPagePositiveBalanceAmount?: boolean
    totalPagePositiveBalanceItems?: number
    // 可用餘額大於零總金額
    totalPagePositiveBalanceAmount?: number
    itemsPerPageOptions?: number[]
  }>(), {
    itemsPerPageOptions: () => [10, 20, 50, 100],
    isShowTotalPagePositiveBalanceAmount: false,
    isShowTotalAmount: false,
  })

  defineEmits<{
    'update:page': [page: number]
    'update:itemsPerPage': [size: number]
  }>()
</script>
