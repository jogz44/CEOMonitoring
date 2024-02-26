<template>
  <div class="q-pa-md" style="max-width: 300px">
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-input
        ref="nameRef"
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="nameRules"
      />

      <q-input
        ref="ageRef"
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="ageRules"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  data() {
    return {
      $q : useQuasar(),
      name: null,
      nameRef: null,
      nameRules: [
        val => (val && val.length > 0) || 'Please type something'
      ],

      age: null,
      ageRef: null,
      ageRules: [
        val => (val !== null && val !== '') || 'Please type your age',
        val => (val > 0 && val < 100) || 'Please type a real age'
      ],

      accept: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.nameRef.validate();
      this.$refs.ageRef.validate();

      if (this.$refs.nameRef.hasError || this.$refs.ageRef.hasError) {
        // form has error
      } else if (!this.accept) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first',
        });
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        });
      }
    },
    onReset() {
      this.name = null;
      this.age = null;

      this.$refs.nameRef.resetValidation();
      this.$refs.ageRef.resetValidation();
    },
  },
};
</script>
