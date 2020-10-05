<template>
  <v-container fluid style="background-color: #419cff">
    <v-row v-for="link in usedLinks" :key="link.documentId">
      <v-col cols="12" md="6" lg="3">
        <twitter-free-used-link :data="link"></twitter-free-used-link>
      </v-col>
    </v-row>
    <v-row v-for="link in nonUsedLinks" :key="link.documentId">
      <v-col cols="12" md="6" lg="3">
        <twitter-free-non-used-link :data="link"></twitter-free-non-used-link>
      </v-col>
    </v-row>
    <v-row v-for="link in errorLinks" :key="link.documentId">
      <v-col cols="12" md="6" lg="3">
        {{ link.documentId }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TwitterFreeNonUsedLink from '@/components/twitterFree/twitterFreeNonUsedLink'
import TwitterFreeUsedLink from '@/components/twitterFree/twitterFreeUsedLink'
export default {
  components: { TwitterFreeUsedLink, TwitterFreeNonUsedLink },
  props: {
    nonUsedLinks: Array,
    usedLinks: Array,
    errorLinks: Array,
  },
}
</script>
