<template>
  <v-container fluid>
    <div v-if="!error">
      <div class="large-text">New Link</div>
      <v-form ref="form" :v-for="valid" lazy-validation class="mt-10">
        <div class="text-h5">{{ $t('webhook.setting.title.basic') }}</div>
        <v-text-field
          v-model="webhookUrl"
          :rules="[
            (value) =>
              !!webhookRule(value) || $t('webhook.setting.webhook_valid'),
          ]"
          label="Webhook URL"
          required
        ></v-text-field>

        <v-text-field
          v-model="twitterUserId"
          :rules="[(value) => !!value || $t('webhook.setting.valid')]"
          label="Twitter User ID"
          required
        ></v-text-field>
        <div class="text-h5 mt-10">
          {{ $t('webhook.setting.title.information') }}
        </div>
        <v-textarea
          v-model="webhookContent"
          outlined
          :rules="[(value) => !!value || $t('webhook.setting.valid')]"
          label="Webhook Content"
          required
        ></v-textarea>
        <v-card color="light-blue lighten-1">
          <v-card-title>{{ $t('webhook.content.how_0') }}</v-card-title>
          <v-card-text class="font-weight-bold text-h6">
            {{ $t('webhook.content.how_1') }}
          </v-card-text>
          <v-card-text class="font-weight-bold text-h6">
            {{ $t('webhook.content.how_2') }}
          </v-card-text>
          <v-card-text class="font-weight-bold text-h6">
            {{ $t('webhook.content.how_3') }}
          </v-card-text>
        </v-card>

        <div class="text-h5 mt-10">
          {{ $t('webhook.setting.title.setting') }}
        </div>

        <v-checkbox
          v-model="isSetAuthor"
          :label="$t('webhook.setting.isSetAuthor')"
          color="white"
          :value="true"
          hide-details
        ></v-checkbox>

        <v-btn
          :disabled="valid"
          color="green accent-4"
          class="mr-4 mt-10"
          style="text-transform: none"
          @click="validate"
        >
          Submit
        </v-btn>
      </v-form>
    </div>
    <div v-else>
      <h1>Error</h1>
      <h2>{{ $t('webhook.error') }}</h2>
    </div>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      id: this.$route.params.id,
      error: false,
      webhookUrl: '',
      twitterUserId: '',
      twitterUserIdRule: '',
      webhookContent: '{{ URL }}',
      webhookContentRule: '',
      isSetAuthor: false,
      valid: false,
    }
  },
  mounted() {
    const db = firebase.firestore()
    db.collection('users')
      .doc(this.$store.state.auth.uid)
      .collection('freeLinks')
      .doc(this.id)
      .get()
      .then((document) => {
        if (!document.exists) {
          this.error = true
        }
        if (document.data().status !== 0) this.error = true
      })
  },
  methods: {
    async validate() {
      const uid = this.$store.state.auth.uid
      if (
        this.twitterUserId !== '' &&
        this.webhookContent !== '' &&
        this.webhookRule(this.webhookUrl)
      ) {
        await this.$setNewFreeTwitterLink(
          uid,
          this.id,
          this.webhookUrl,
          this.twitterUserId,
          this.isSetAuthor
        )
        await this.$router.push(this.localePath('/dashboard'))
      }
    },
    webhookRule(value) {
      const discordRe = /^https:\/\/discordapp\.com\/api\/webhooks\/([0-9]+)\/([0-9a-zA-Z_-]+)$/
      return discordRe.test(value)
    },
  },
}
</script>

<style>
.large-text {
  font-family: 'Fredoka One', sans-serif;
  font-size: 60px;
}
</style>
