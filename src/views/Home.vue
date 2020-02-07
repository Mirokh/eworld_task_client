<template>
  <div>
    <header-component @drawer="toggleDrawer"></header-component>
    <sidebar-component :drawer="drawer"></sidebar-component>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
}
</script>
