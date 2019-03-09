<template>
  <div class="back">
    <Button type="primary" icon="md-arrow-round-back" @click="goBack">Go back</Button>
  </div>
</template>
<script>
import { Button } from "iview";
export default {
  name: "Back",
  methods: {
    goBack() {
      history.back();
    }
  }
};
</script>
<style lang="scss" scoped>
  .back{
    margin: 10px 0;
  }
</style>


