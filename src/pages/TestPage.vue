<template>
  <div>
    <q-dialog v-model="dialog1Visible" class="dialog1">
      f
    </q-dialog>

    <q-dialog v-model="dialog2Visible" class="dialog2">
     f
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog1Visible: true,
      dialog2Visible: true,
    };
  },
};
</script>

<style scoped>
.dialog1 {
  width: 300px; /* Adjust the width as needed */
  left: 0;
  margin: 0;
}

.dialog2 {
  width: 300px; /* Adjust the width as needed */
  right: 0;
  margin: 0;
}
</style>
