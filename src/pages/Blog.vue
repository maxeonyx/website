<template>
  <Layout>
    <main v-html="$static.fileNode.content"></main>
  </Layout>
</template>

<static-query>
query {
  fileNode (path: "/content/lorem-ipsum/") {
    content
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: "Blog",
  },
};
</script>
