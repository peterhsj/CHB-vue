<template>
  <v-card>
    <v-card-title>訊息匣</v-card-title>
    <v-card-text>
      <v-list density="compact">
        <v-list-item
          v-for="msg in messages"
          :key="msg.id"
          :title="msg.title"
          :subtitle="msg.time"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const messages = [
  { id: 1, title: "系統公告：本日 20:00 例行維護", time: "2026-08-28 09:00" },
  { id: 2, title: "新流程上線通知", time: "2026-08-28 10:30" },
]
</script>