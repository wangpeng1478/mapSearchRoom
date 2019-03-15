
<template>
  <div id="app">
    <Map msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Map from "./components/Map.vue";

export default {
  name: "app",
  components: {
    Map
  }
};
</script>

<style>
body,
ul,
ol,
li,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
table,
td,
img,
div,
dt,
dl,
dd,
blockquote {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  word-break: break-all;
}
a {
  color: #000;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  outline: none;
}
ul li {
  list-style: none;
}
</style>
