import firebase from '@/plugins/firebase'

async function isRegistered() {
  const uid = firebase.auth().currentUser.uid
  const data = await firebase.firestore().collection('users').doc(uid).get()
  return data.exists
}

async function setTokenSecretId(twitterToken, twitterSecret, twitterId) {
  const uid = firebase.auth().currentUser.uid
  await firebase.firestore().collection('users').doc(uid).set(
    {
      twitterToken,
      twitterSecret,
      twitterId,
    },
    { merge: true }
  )
}

async function initializeFreeLinks() {
  const uid = firebase.auth().currentUser.uid
  for (let i = 0; i < 10; i++) {
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('freeLinks')
      .add({
        type: 'twitter',
        status: 0, // 0 -> 使われていない, 1 -> 使われているが正常, 2 -> 使われているがエラー
        uid,
      })
  }
}

async function removeFreeLink(id) {
  const uid = firebase.auth().currentUser.uid
  await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('freeLinks')
    .doc(id)
    .set({
      type: 'twitter',
      status: 0,
      uid,
    })
}

async function setFreeTwitterLink(
  uid,
  documentId,
  webhook,
  userId,
  setAuthorIcon,
  content,
  retweet,
  reply
) {
  const userRef = firebase.firestore().collection('users').doc(uid)
  const userDoc = await userRef.get()
  const userData = userDoc.data()
  await userRef.collection('freeLinks').doc(documentId).set(
    {
      status: 1,
      webhook,
      userId,
      setAuthorIcon,
      content,
      retweet,
      reply,
      last: '',
      twitterToken: userData.twitterToken,
      twitterSecret: userData.twitterSecret,
    },
    { merge: true }
  )
}

async function fetchFreeTwitterLinks(uid) {
  const nonUsedLinks = []
  const usedLinks = []
  const errorLinks = []
  if (uid === null)
    return {
      nonUsedLinks,
      usedLinks,
      errorLinks,
    }
  const db = firebase.firestore()
  const documents = await db
    .collection('users')
    .doc(uid)
    .collection('freeLinks')
    .get()
  documents.forEach((document) => {
    const data = document.data()
    if (data.status === 0) {
      nonUsedLinks.push({
        status: data.status,
        documentId: document.id,
      })
    } else if (data.status === 1) {
      usedLinks.push({
        status: data.status,
        webhookUrl: data.webhook,
        twitterUserId: data.userId,
        documentId: document.id,
      })
    } else {
      errorLinks.push({
        status: data.status,
        webhookUrl: data.webhook,
        twitterUserId: data.userId,
        documentId: document.id,
      })
    }
  })
  return {
    nonUsedLinks,
    usedLinks,
    errorLinks,
  }
}

// eslint-disable-next-line no-empty-pattern
export default ({}, inject) => {
  inject('isRegistered', isRegistered)
  inject('setTokenSecretId', setTokenSecretId)
  inject('initializeFreeLinks', initializeFreeLinks)
  inject('fetchFreeTwitterLinks', fetchFreeTwitterLinks)
  inject('setFreeTwitterLink', setFreeTwitterLink)
  inject('removeFreeLink', removeFreeLink)
}
