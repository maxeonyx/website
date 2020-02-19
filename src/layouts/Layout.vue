<template>
  <div class="layout">
    <Nav />
    <g-image class="picture" src="/images/me.png" width="300px" height="300px" />
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

$border-radius: 2px;

:root {
  background-color: hsl(0, 0, 6);
  background-image: url(/images/noise-dark-gray.png);
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
  grid-template-rows: auto 30px 1fr 300px;
  grid-template-areas:
    ".    head head head .   "
    ".    .    .    .    .   "
    ".    main main main .   "
    ".    .    pict .    .   ";
}

$layout-breakpoint: calc(30px + 300px + 30px + 800px + 30px);

@media (min-width: $layout-breakpoint) {
  .layout {
    grid-template-columns:
      minmax(30px, 1fr) 300px minmax(30px, 1fr) minmax(0px, 250px) 300px minmax(
        0px,
        250px
      )
      4fr;
    grid-template-rows: min-content 30px 300px auto;
    grid-template-areas:
      ". .    .    head head head ."
      ". .    .    .    .    .    ."
      ". pict .    main main main ."
      ". .    .    main main main .";
  }
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
  margin-bottom: 30px;
  background-color: white;
  background-image: url(/images/noise-white.png);
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
