<template>
  <div>The visited URL is: {{ url }}</div>
</template>

<script>
export default {
  name: 'App',
  props: {
    url: String
  }
}
</script>
