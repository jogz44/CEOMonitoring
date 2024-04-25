<template>
  <div>
    <q-card style="width: 500px; max-width: 80vw; height: auto">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-weight-bold">PROJECT EXTENSION</span>
        </q-toolbar-title>
        <q-btn flat dense icon="close" v-close-popup color="orange" />
      </q-toolbar>

      <q-separator />

      <q-card-section>
        <q-form>
          <div class="row">
            <div class="col-12">
              <q-input
                label="Reason for Extension"
                filled
                dense
                autogrow
                class="q-mb-md"
              ></q-input>
            </div>
            <div class="col-12">
              <q-input
                label="Number of Days (Extension)"
                filled
                dense
                autogrow
                type="number"
              ></q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="orange-5"
          size="md"
          outline
          v-close-popup
        />
        <q-btn label="Save" color="green-5" size="md" class="q-mr-sm" />
      </q-card-actions>
    </q-card>
  </div>
</template>
