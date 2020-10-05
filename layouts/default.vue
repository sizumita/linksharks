<template>
  <v-app>
    <div>
      <v-app-bar color="light-blue lighten-1" dark>
        <v-app-bar-nav-icon class="ml-5">
          <nuxt-link :to="localePath('index')">
            <v-img src="/logo.png" max-width="50" max-height="50"></v-img>
          </nuxt-link>
        </v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-light linksharks">
          <nuxt-link
            :to="localePath('index')"
            style="text-decoration: none; color: white"
          >
            LinkSharks
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
          v-if="$store.state.auth.uid === null"
          outlined
          style="text-transform: none"
          class="mr-5"
          @click="login()"
        >
          {{ $t('signin') }}
        </v-btn>
        <v-menu v-else left bottom offset-y open-on-hover class="mr-5">
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined v-bind="attrs" class="mr-5" v-on="on">
              {{ $store.state.auth.displayName }}
            </v-btn>
          </template>

          <v-list color="light-blue lighten-1" min-width="200">
            <v-list-item :to="localePath('dashboard')">
              <v-list-item-title>{{ $t('go_to_dashboard') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>{{ $t('signout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu left bottom offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              v-bind="attrs"
              style="text-transform: none"
              v-on="on"
            >
              {{ $t('lang') }}
            </v-btn>
          </template>

          <v-list color="light-blue lighten-1" min-width="200">
            <v-list-item :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
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
      const id = result.additionalUserInfo.providerId
      const displayName = result.user.displayName
      if (!(await this.$isRegistered())) {
        await this.$setTokenSecretId(token, secret, id)
        await this.$initializeFreeLinks()
      }
      this.$store.commit('setAuth', { uid, displayName })
      await this.$router.push(this.localePath('/dashboard'))
    },
    async logout() {
      await firebase.auth().signOut()
      await this.$store.commit('clearAuth', {})
      console.log(this.$store.state.auth.uid)
      await this.$router.push(this.localePath('/'))
    },
  },
}
</script>

<style scoped>
.theme--dark.v-application {
  background-color: var(--v-background-base, white) !important;
}

.linksharks {
  font-family: 'Fredoka One', sans-serif;
}
</style>
