<template>
  <div>
    <h6>
      THIS IS THE RESULTS PAGE (TODO)
    </h6>
    <p>
      <b-link to="/">
        Home
      </b-link>
    </p>
    <pre>
    {{ completedCalculation }}
    </pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Results',
  computed: {
    ...mapState('dataEntry', [
      'completedCalculation',
    ]),
  },
};
</script>
