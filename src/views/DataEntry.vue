<template>
  <b-card body-class="py-3">
    <b-row>
      <b-col class="pt-3">
        <h3 class="pb-2">
          Data entry
        </h3>
        <p>
          To help us provide you with the most accurate calculations, please answer some basic questions.
        </p>
      </b-col>
    </b-row>

    <b-row class="mt-3 pb-4">
      <b-col cols="6">
        <strong>
          Please fill in the fields below:
        </strong>
        <data-entry-form
          class="mt-4"
          :on-submit="onFormSubmit"
          :is-submission-in-progress="isFormSubmissionInProgress"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapState } from 'vuex';
import DataEntryForm from '@/components/forms/DataEntryForm.vue';

export default {
  components: {
    DataEntryForm,
  },
  computed: {
    ...mapState('dataEntry', [
      'isFormSubmissionInProgress',
    ]),
  },
  methods: {
    onFormSubmit(formVals) {
      this.$store.dispatch('dataEntry/doSubmitDataEntryForm', formVals);
    },
  },
};
</script>
