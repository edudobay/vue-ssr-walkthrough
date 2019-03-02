<template>
  <div>
    <p>Hello to {{ name }}</p>
    <h2>Oh dear, that is not your name?</h2>
    <p>
      Please correct it here:
      <input type="text" size="40" v-model="name" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: ['query'],
  data() {
    return { name: this.query.name };
  },
}
</script>
