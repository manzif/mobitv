/* eslint-disable handle-callback-err */
/* eslint-disable no-console */
export default function({ $auth, $dialog, store }, ctx) {
  $auth.onError((error, name, endpoint) => {
    // console.error(name, error)

    if (name.method === 'login') {
      $dialog.notify.error('Unexpected error occured', {
        position: 'top-right',
        timeout: 5000
      })
      // console.log(store)
    }

    // $store.dispatch('helper/disabling')
  })
}
