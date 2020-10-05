<template>
  <v-container fluid>
    <div class="dashboard">Dashboard</div>
    <v-tabs v-model="tab" background-color="background" dark color="white">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#free" style="text-transform: none">
        {{ $t('dashboard.free.title') }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="free">
        <free-twitter-links
          :non-used-links="freeData.nonUsedLinks"
          :used-links="freeData.usedLinks"
          :error-links="freeData.errorLinks"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import FreeTwitterLinks from '@/components/twitterFree/freeTwitterLinks'

export default {
  components: { FreeTwitterLinks },
  middleware: 'authenticated',
  data() {
    return {
      freeData: {},
      tab: '',
    }
  },
  mounted() {
    this.$fetchFreeTwitterLinks(this.$store.state.auth.uid).then((freeData) => {
      this.freeData = freeData
    })
  },
}
</script>

<style scoped>
.dashboard {
  font-family: 'Fredoka One', sans-serif;
  font-size: 60px;
}
</style>
