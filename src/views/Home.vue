<template>
  <b-container fluid class="h-100">
    <b-row class="h-100" align-v="center">
      <b-col cols="12" class="text-center mt-4">
        <b-button
          pill
          variant="success"
          class="p-4"
          title="start the demo!"
          @click="onClickStartBtn"
        >
          let's go!
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    onClickStartBtn() {
      this.$router.push('/data-entry');
    },
  },
};
</script>
