<template>
  <div class="body-inner">
    <div class="layout">
      <nav>
        <g-link to="/">HOME</g-link>
        <g-link to="/cv">CV</g-link>
        <g-link to="/projects">PROJECTS</g-link>
        <g-link to="/blog">BLOG</g-link>
      </nav>
      <g-image class="picture" src="/images/me.png" width="300px" />
      <main>
        <slot />
      </main>
    </div>
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

body {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  background-image: url(/images/dark-gray.png);
}

.body-inner {
  height: 100%;
  width: 100%;
}

.scrollable {
  overflow-y: scroll;
}

nav {
  grid-area: head;

  color: white;
  font-size: 2rem;
  text-shadow: 0px 2px 5px black;
}

.picture {
  grid-area: pict;
  height: 100%;
  width: 100%;

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 5px;
}

main {
  grid-area: main;
  padding: 30px;
  background-image: url(/images/pale.png);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 5px 5px;
}

.layout {
  display: grid;
  padding-bottom: 30px;
  padding-top: 30px;
  grid-template-columns: 1fr minmax(0px, 250px) 300px minmax(0px, 250px) 1fr;
  grid-template-rows: auto auto 30px 300px;
  grid-template-areas:
    ". head head head ."
    ". main main main ."
    ". .    .    .    ."
    ". .    pict .    .";
}

nav {
  display: flex;
  padding-bottom: 30px;
  justify-content: space-around;
}

@media (min-width: 1390px) {
  // same grid used by scrollable content and non-scrollable overlay. It's a bit of a hack.
  .layout {
    display: grid;
    padding-left: 30px;
    padding-right: 30px;
    grid-template-columns: 300px 30px 1000px 1fr;
    grid-template-rows: 300px 30px auto auto;
    grid-template-areas:
      "pict .    main ."
      ".    .    main ."
      "head .    main ."
      ".    .    main .";
  }
  nav {
    flex-direction: column;
    align-items: center;
  }
}
</style>


<script>
import Sash from "../components/Sash";

export default {
  components: {
    Sash
  }
};
</script>
