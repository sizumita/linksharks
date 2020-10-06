<template>
  <v-card dark color="teal lighten-2">
    <v-card-title>{{ $t('dashboard.free.using') }}</v-card-title>
    <v-card-subtitle>
      {{ $t('dashboard.subscribing') }}{{ data.twitterUserId }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        outlined
        :to="localePath({ name: 'e-free-id', params: { id: data.documentId } })"
        style="text-transform: none"
        >{{ $t('dashboard.edit') }}</v-btn
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
