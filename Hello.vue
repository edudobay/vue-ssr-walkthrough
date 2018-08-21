<template>
  <div>Hello to {{ query.name }}</div>
</template>

<script>
export default {
  name: 'Hello',
  props: ['query'],
}
</script>
