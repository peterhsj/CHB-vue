<template>
  <v-card>
    <v-card-title>待辦事項</v-card-title>
    <v-card-text>
      <v-list density="compact">
        <v-list-item
          v-for="item in tableItems"
          :key="item.id"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.count }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useTodo } from '@/composables/useTodo'
  const { tableItems } = useTodo()
</script>