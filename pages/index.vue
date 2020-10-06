<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-img src="../logo.png" max-width="250" max-height="250"></v-img>
      <v-spacer />
    </v-row>
    <v-row class="mt-3">
      <v-spacer />
      <h1 class="linksharks">LinkSharks</h1>
      <v-spacer />
    </v-row>
    <div class="text-h2 text-center mt-10">
      {{ $t('index.title') }}
    </div>
    <div style="height: 100px" />
    <div class="text-h5 text-center mt-10">
      {{ $t('index.subtitle') }}
    </div>
    <div class="text-h3 text-center mt-10">
      {{ $t('index.ad_title') }}
    </div>
    <div class="text-h5 text-center mt-5">
      {{ $t('index.ad1') }}
    </div>
    <div class="text-center">
      <v-btn
        v-if="$store.state.auth.uid === null"
        outlined
        style="text-transform: none"
        class="mt-5"
        @click="login()"
      >
        {{ $t('signin') }}
      </v-btn>
      <v-btn
        v-else
        outlined
        style="text-transform: none"
        class="mt-10"
        width="200px"
        height="50px"
        :to="localePath('dashboard')"
      >
        {{ $t('index.dashboard_button') }}
      </v-btn>
    </div>
    <div style="height: 100px" />
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  methods: {
    async login() {
      const result = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      const token = result.credential.accessToken
      const secret = result.credential.secret
      const uid = result.user.uid
      const displayName = result.user.displayName
      if (!(await this.$isRegistered())) {
        await this.$setTokenSecretId(token, secret, displayName)
        await this.$initializeFreeLinks()
      }
      this.$store.commit('setAuth', { uid, displayName })
      await this.$router.push(this.localePath('/dashboard'))
    },
  },
}
</script>

<style scoped>
.linksharks {
  font-family: 'Fredoka One', sans-serif;
  font-size: 60px;
}
</style>
