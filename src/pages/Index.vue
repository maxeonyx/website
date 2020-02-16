<template>
  <Layout>
    <main v-html="$static.fileNode.content"></main>
  </Layout>
</template>

<static-query>
query {
  fileNode(path: "/content/index/") {
    content
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    titleTemplate: "Maxwell Clarke",
  },
};
</script>
