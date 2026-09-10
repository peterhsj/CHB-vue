<template>
  <v-dialog
    v-model="show"
    :close-on-back="false"
    persistent
    :width="messageWidth"
  >
    <v-card
      class="chb__dialog"
    >
      <v-card-title class="d-flex align-center px-4">
        <span class="text-title-large text-deep-orange-darken-3">{{ props.messageTitle }}</span>
        <v-spacer />
        <v-btn
          density="comfortable"
          icon="mdi-close"
          variant="flat"
          @click="onClose"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center bg-grey-lighten-4">
        <span class="mr-4">
          <v-icon
            v-if="props.messageStatus === 'alert'"
            class="my-4"
            color="deep-orange-lighten-2"
            icon="mdi-alert-circle-outline"
            size="60"
          />

          <v-icon
            v-else-if="props.messageStatus === 'success'"
            class="my-4"
            color="green-darken-1"
            icon="mdi-check-circle-outline"
            size="60"
          />
        </span>

        <div
          class="text-teal-darken-2"
          v-text="props.message"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          v-if="props.isCancelBtn"
          class="chb__btn--cancel mx-1 my-2"
          @click="onClose"
        >
          關閉
        </v-btn>

        <v-btn
          v-if="props.isConfirmBtn"
          class="chb__btn--default mx-1 my-2"
          @click="promptConfirm"
        >
          確定
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  interface Props {
    messageDialog?: boolean
    messageTitle?: string
    message?: string
    messageStatus?: string
    isCancelBtn?: boolean
    isConfirmBtn?: boolean
    messageWidth?: number | string
  }
  const props = withDefaults(defineProps<Props>(), {
    messageDialog: false,
    messageTitle: '提示',
    message: '',
    messageStatus: '',
    isCancelBtn: true,
    isConfirmBtn: false,
    messageWidth: '400px',
  })

  const show = ref<boolean>(props.messageDialog)
  watch(
    () => props.messageDialog,
    newVal => {
      show.value = newVal
    },
  )
  watch(
    () => show.value,
    newVal => {
      emit('update:messageDialog', newVal)
    },
  )

  const emit = defineEmits<{
    'update:messageDialog': [boolean]
    'prompt-confirm': []
    'on-close': []
  }>()

  function onClose (): void {
    show.value = false
    emit('on-close')
  }

  function promptConfirm (): void {
    emit('prompt-confirm')
    show.value = false
  }
</script>
