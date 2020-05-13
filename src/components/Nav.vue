<template>
  <nav>
    <g-link class="home" to="/">HOME</g-link>
    <g-link class="cv" to="/cv">CV</g-link>
    <g-link class="proj" to="/projects">PROJECTS</g-link>
    <g-link class="blog" to="/blog">BLOG</g-link>
  </nav>
</template>

<style lang="scss">
nav {
  color: black;
  font-size: 2rem;
  text-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px;

  .active--exact {
    text-decoration: underline 3px;
  }
}

// layout
nav {
  display: grid;
  grid-template-areas:
    "home blog"
    "cv proj";
  grid-gap: 15px;

  padding-left: 30px;
  padding-right: 30px;

  .home {
    grid-area: home;
    text-align: left;
  }
  .proj {
    grid-area: proj;
    text-align: right;
  }
  .cv {
    grid-area: cv;
    text-align: left;
  }
  .blog {
    grid-area: blog;
    text-align: right;
  }
}

$nav-breakpoint: 500px;

@media (min-width: $nav-breakpoint) {
  nav {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}
</style>
