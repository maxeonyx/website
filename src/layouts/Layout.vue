<template>
  <div class="layout">
    <Nav />
    <g-image class="picture" src="/images/me.png" width="300px" />
    <slot />
    <Sash />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
@import "./reset.scss";
@import "./vars.scss";

:root {
  background-color: hsl(0, 0, 14);
  background-image: url(/images/dark-gray.png);
}

body {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  overflow-y: scroll;
}

.layout {
  position: relative;
  min-height: 100%;
  display: grid;
  padding-bottom: 30px;
  padding-top: 30px;
  grid-template-columns: 1fr minmax(0px, 250px) 300px minmax(0px, 250px) 1fr;
  grid-template-rows: auto 1fr 300px;
  grid-template-areas:
    ".    head head head .   "
    ".    main main main .   "
    ".    .    pict .    .   ";
}

.picture {
  grid-area: pict;
  height: 100%;
  width: 100%;

  border-radius: $border-radius;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 5px;
}

main {
  grid-area: main;
  padding: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: white;
  // background-image: url(/images/pale.png);
  border-radius: $border-radius;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 5px;
}

nav {
  grid-area: head;
}
</style>


<script>
import Sash from "../components/Sash";
import Nav from "../components/Nav";

export default {
  components: {
    Sash,
    Nav,
  },
};
</script>
