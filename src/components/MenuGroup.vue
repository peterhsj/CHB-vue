<template>
  <v-list-group
    v-if="prop.item.subMenu"
    class="chb__menu"
    :class="[prop.open.includes(prop.item.value) ? 'chb__menu--open' : '']"
    density="compact"
    :value="prop.item.value"
  >
    <template #activator="{ props }">
      <v-list-item v-bind="props">
        {{ prop.item.text }}
      </v-list-item>
    </template>
    <v-divider />
    <MenuGroup
      v-for="sub in prop.item.subMenu"
      :key="sub.value"
      :item="sub"
      :current-item="currentItem"
      :open="prop.open"
      @select="emit('select', $event)"
    />
  </v-list-group>

  <v-list-item
    v-else
    :active="prop.currentItem === prop.item.value"
    :value="prop.item.value"
    @click="emit('select', prop.item.value)"
  >
    {{ prop.item.text }}
  </v-list-item>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/composables/useMenu'

const prop = defineProps<{
  open: string[]
  currentItem: string | null
  item: {
    value: string
    text: string
    subMenu?: MenuItem[]
  }
}>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>
<style lang="scss" scoped>
.chb {
  &__menu {
    &--open > .v-list-group__header {
      background-color: #e6e1f5; // Example style for open menu
    }
  }
}
</style>
