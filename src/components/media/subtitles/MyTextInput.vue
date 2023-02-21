<template>
    <div>
      <label>My Custom Input</label>
      <input type="text" placeholder="Custom input!" @input="handleChange" />
    </div>
  </template>


<script>
  export default {
      methods: {
          handleChange (event) {
              this.$emit("customChange", event.target.value.toUpperCase())
          }
      }
  }
</script>
