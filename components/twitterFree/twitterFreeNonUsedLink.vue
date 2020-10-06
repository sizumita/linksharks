<template>
  <v-card dark color="blue-grey darken-1">
    <v-card-title>{{ $t('dashboard.free.nonUsing') }}</v-card-title>
    <v-card-subtitle>新規作成して使用を開始してください</v-card-subtitle>
    <v-card-actions>
      <v-btn
        outlined
        :to="localePath({ name: 'n-free-id', params: { id: data.documentId } })"
        style="text-transform: none"
        >{{ $t('dashboard.new') }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TwitterFreeNonUsedLink',
  props: {
    data: Object,
  },
}
</script>
