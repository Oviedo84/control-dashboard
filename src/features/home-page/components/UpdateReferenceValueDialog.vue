<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-pencil" title="Valor de Referencia">
      <v-card-text>
        <v-row dense>
          <v-progress-circular
            v-if="isPending"
            :size="50"
            :width="5"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-number-input
            v-else
            label="Valor de Referencia*"
            required
            :precision="2"
            v-model="computedValue"
          ></v-number-input>
        </v-row>
        <small class="text-caption text-medium-emphasis">
          *indicates required field
        </small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          @click="submit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineModel, computed, ref, watch } from "vue";

import { useReferenceValue } from "../api/get-reference-value";
import { useUpdateReferenceValue } from "../api/update-reference-value";

const dialog = defineModel<boolean>();
const value = ref(0);

const updateReferenceValueMutation = useUpdateReferenceValue();

const { data, isPending, refetch } = useReferenceValue();

const submit = () => {
  if (value.value === 0) return (dialog.value = false);

  updateReferenceValueMutation.mutate(value.value, {
    onSuccess: () => {
      value.value = 0;
      dialog.value = false;
    },
  });
};

watch(dialog, () => {
  if (dialog.value) {
    refetch();
  }
});

const computedValue = computed({
  get() {
    return data.value?.value || 0;
  },
  set(newValue) {
    value.value = newValue;
  },
});
</script>
