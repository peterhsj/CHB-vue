<template>
  <v-card>
    <v-card-title>開狀申請書</v-card-title>
    <v-card-text>
      <v-list density="compact">
        <v-list-item
          v-for="item in items"
          :key="item.id"
          :title="item.title"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const items = [
  { id: 1, title: "審核國內信用狀申請單" },
  { id: 2, title: "確認客戶授信額度" },
]
</script>