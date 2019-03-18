
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app"
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
input{
  outline:none;
}
button{
  background: none;
  border: none;
  outline:none;
}

.bottom48{
  bottom:48vw !important;
}

</style>
