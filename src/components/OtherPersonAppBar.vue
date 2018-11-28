<template>
  <mu-appbar style="width: 100%;" color="#474a4f" class="app-bar app-bar-bg" z-depth="0">
    <mu-button icon slot="left" to="/people">
      <mu-icon value="keyboard_arrow_left"></mu-icon>
    </mu-button>

    <mu-button icon slot="right">
      <mu-icon value="menu"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>

<script>
    export default {
        name: "OtherPersonAppBar"
    }
</script>

<style scoped>
</style>
