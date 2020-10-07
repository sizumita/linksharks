<template>
  <div>
    <v-card v-if="!removed" dark color="red lighten-2">
      <v-card-title>{{ $t('dashboard.free.error') }}</v-card-title>
      <v-card-subtitle>
        {{ $t('dashboard.subscribing') }}{{ data.twitterUserId }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          outlined
          :to="
            localePath({ name: 'e-free-id', params: { id: data.documentId } })
          "
          style="text-transform: none"
        >
          {{ $t('dashboard.edit') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="white"
          style="text-transform: none"
          @click="remove"
        >
          {{ $t('dashboard.remove') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <twitter-free-non-used-link
      v-else
      :data="data"
    ></twitter-free-non-used-link>
  </div>
</template>

<script>
import TwitterFreeNonUsedLink from '@/components/twitterFree/twitterFreeNonUsedLink'
export default {
  name: 'TwitterFreeErrorLink',
  components: { TwitterFreeNonUsedLink },
  props: {
    data: Object,
  },
  data() {
    return {
      removed: false,
    }
  },
  methods: {
    async remove() {
      await this.$removeFreeLink(this.data.documentId)
      this.removed = true
    },
  },
}
</script>
