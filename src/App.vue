<template lang="pug">
  //- App
  #app
    //- Statusbar
    f7-statusbar
    //- Left Panel
    f7-panel(left='', reveal='', theme-dark='')
      f7-view(url='/panel-left/')
    //- Right Panel
    f7-panel(right='', cover='', theme-dark='')
      f7-view(url='/panel-right/')
    //- Main View
    f7-views
      f7-view#main-view(url='/', navbar-through='', :dynamic-navbar='true', main='')

    //- Popup
    f7-popup#popup
      f7-view
        f7-page
          f7-navbar(title='Popup')
            f7-nav-right
              f7-link(popup-close='') Close
          f7-block
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.
    
    //- Login Screen
    f7-login-screen#login-screen
      f7-view
        f7-page(login-screen='')
          f7-login-screen-title Login
          f7-list(form='')
            f7-list-item
              f7-label Username
              f7-input(name='username', placeholder='Username', type='text')
            f7-list-item
              f7-label Password
              f7-input(name='password', type='password', placeholder='Password')
          f7-list
            f7-list-button(title='Sign In', login-screen-close='')
            f7-block-footer
              p Click Sign In to close Login Screen

</template>

<script>
export default {};
</script>
