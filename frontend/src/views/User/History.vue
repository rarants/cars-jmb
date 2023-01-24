<template>
  <div>
    <history-table v-bind:history="history" />
  </div>
</template>

<script>
import HistoryTable from "../../components/HistoryTable.vue";
import api from "@/services/api";

export default {
  name: "History",
  components: { HistoryTable },
  data() {
    return {
      history: []
    };
  },
  async mounted() {
    try {
      const { data } = await api.get(`/user/cars/history`);
      this.history = data;
    } catch (e) {
      this.$toasted.error(
        "Ocorreu um erro ao carregar as informações dos veículos. Recarregue a página e tente novamente."
      );
    }
  }
};
</script>
<style></style>
