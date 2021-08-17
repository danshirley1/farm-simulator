<template>
  <b-form autocomplete="off" @submit.stop.prevent="onSubmitForm">
    <!-- Farm size -->
    <b-form-group label="Size of farm (acres)">
      <b-form-input
        v-model="farmSize"
        type="number"
        required
        autofocus
        :disabled="isSubmissionInProgress"
      />
    </b-form-group>

    <!-- Quantity of Livestock -->
    <b-form-group label="Quantity of livestock" class="mt-4">
      <b-form-input
        v-model="livestockQuantity"
        type="number"
        required
        :disabled="isSubmissionInProgress"
      />
    </b-form-group>

    <!-- Quantity of Tractors -->
    <b-form-group label="Quantity of tractors" class="mt-4">
      <b-form-input
        v-model="tractorCount"
        type="number"
        required
        :disabled="isSubmissionInProgress"
      />
    </b-form-group>

    <!-- Quantity of Milking Machines -->
    <b-form-group label="Quantity of milking machines" class="mt-4">
      <b-form-input
        v-model="milkMachineCount"
        type="number"
        required
        :disabled="isSubmissionInProgress"
      />
    </b-form-group>

    <!-- Quantity of Milk Produced -->
    <b-form-group label="Quantity of milk produced (litres)" class="mt-4">
      <b-form-input
        v-model="milkProductionQuantity"
        type="number"
        required
        :disabled="isSubmissionInProgress"
      />
    </b-form-group>

    <div v-if="error" class="mt-4 p-1 bg-warning">
      {{ error }}
    </div>

    <b-button
      variant="success"
      class="mt-4"
      type="submit"
      :disabled="isFormPristine || !!error || isSubmissionInProgress"
    >
      <span v-if="isSubmissionInProgress">
        Loading...
      </span>
      <span v-else class="px-4">
        Submit
      </span>
    </b-button>
  </b-form>
</template>

<script>
import constants from '@/../constants';

export default {
  name: 'DataEntryForm',
  props: {
    onSubmit: {
      type: Function,
      default: null,
    },
    isSubmissionInProgress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFormPristine: true,
      error: null,
      farmSize: null,
      livestockQuantity: null,
      tractorCount: null,
      milkMachineCount: null,
      milkProductionQuantity: null,
      dataSchemaKeys: constants.SOURCE_DATA_SCHEMA,
    };
  },
  watch: {
    farmSize() { this.doFormUpdated(); },
    livestockQuantity() { this.doFormUpdated(); },
    tractorCount() { this.doFormUpdated(); },
    milkMachineCount() { this.doFormUpdated(); },
    milkProductionQuantity() { this.doFormUpdated(); },
  },
  methods: {
    onSubmitForm() {
      this.error = null;
      this.onSubmit({
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.ACRES]: this.farmSize,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.COW_COUNT]: this.livestockQuantity,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_COUNT]: this.tractorCount,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_COUNT]: this.milkMachineCount,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_PRODUCED]: this.milkProductionQuantity,
      });
    },
    doFormUpdated() {
      this.isFormPristine = false;
      this.validate();
    },
    validate() {
      let error = null;

      if (!(
        this.farmSize
        && this.livestockQuantity
        && this.tractorCount
        && this.milkMachineCount
        && this.milkProductionQuantity)
      ) {
        error = 'Please enter a value for all fields';
      }

      if (error) this.error = error;
      else this.error = null;
    },
  },
};
</script>
