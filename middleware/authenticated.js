export default function ({ store, redirect, app }) {
  // ユーザーが認証されていないとき
  if (store.state.auth.uid === null) {
    return redirect('/')
  }
}
