<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
    <v-card prepend-icon="mdi-account" title="Login">
      <v-card-text @submit.prevend="submit">
        <v-form>
          <v-col cols="12" md="12" sm="12">
            <v-text-field
              v-model="email"
              label="Email*"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <v-text-field
              v-model="password"
              label="Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

            <v-btn
              color="primary"
              text="Login"
              variant="tonal"
              @click="submit"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineModel, ref } from "vue";
import { loginState } from "../../../composables/login";
import { useLogin } from "../api/login";

const dialog = defineModel<boolean>();

const email = ref("");
const password = ref("");

const loginMutation = useLogin();

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const submit = () => {
  loginMutation.mutate(
    {
      email: email.value,
      password: password.value,
    },
    {
      onSuccess: (response) => {
        resetForm();
        loginState.token = response.token;
        localStorage.setItem("token", response.token);
        dialog.value = false;
      },
      onError: () => {
        alert("Login failed");
      },
    },
  );
};
</script>
