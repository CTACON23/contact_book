<template>
  <div id="app">
    <div id="nav">
      <router-link to="/contact_book/" v-show="this.$route.name!='Contacts Home'">
        <h1 class='nav_title'>All contacts</h1>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a{
  color: black;
  text-decoration: none;
}
a:hover{
  color:#2c3e50;
  text-decoration: underline;
}
</style>
