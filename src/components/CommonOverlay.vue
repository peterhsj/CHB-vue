<template>
  <v-overlay
    :model-value="props.overlay"
    location="center"
    class="d-flex align-center justify-center"
    persistent
  >
    <v-sheet
      class="py-6 px-10 rounded-lg"
      elevation="2"
      tile
    >
      <div>  
        <v-progress-circular
          v-if="props.overlay"
          class="me-4 chb__text--red"
          color=""
          indeterminate
          size="50"
          width="8"
        />
        <span class="text-h6 chb__text--red">資料處理中，請稍後...</span>
      </div>
    </v-sheet>
  </v-overlay>
</template>
<script lang="ts" setup>
  interface Props {
    overlay?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    overlay: false,
  })
</script>
