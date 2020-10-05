<template>
  <v-card dark color="teal lighten-2">
    <v-card-title>使用中のTwitterリンク</v-card-title>
    <v-card-subtitle>
      {{ $t('dashboard.subscribing') }}{{ data.twitterUserId }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        outlined
        :to="localePath({ name: 'n-free-id', params: { id: data.documentId } })"
        >編集</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TwitterFreeUsedLink',
  props: {
    data: Object,
  },
}
</script>
