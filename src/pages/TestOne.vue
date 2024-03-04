<template>
  <q-layout>
    <q-page-container>
      <!-- Content of your page goes here -->
      <q-page>
        <!-- Your page content, including QTable or other components -->
        <q-table :rows="tableData" :columns="columns" row-key="id">
          <template v-slot:body-cell-longTextColumn="props">
            <q-td :props="props">
              <div class="q-ellipsis">
                {{ props.row.longTextColumn }}
                <q-btn
                  v-if="props.row.longTextColumn.length > 30"
                  icon="remove_red_eye"
                  size="sm"
                  @click="showFullText(props.row.longTextColumn)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // Your data goes here with the 'longTextColumn'
        { id: 1, longTextColumn: "Your long text goes hhdfghfghfgh rthrdthfghdfghdfghdfghdfghhfghfghfghfghfghfhgre..." },
        // Add more rows as needed
      ],
      columns: [
        // Other columns
        { name: "longTextColumn", label: "Long Text Column", align: "left", field: "longTextColumn" },
      ],
    };
  },
  methods: {
    showFullText(text) {
      this.$q.dialog({
        title: "Full Text",
        message: text,
        persistent: true,
      });
    },
  },
};
</script>
