<template>
  <div class="m-4">
    <div class="card p-3 table-overflow ">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Alteração</th>
            <th scope="col">Data da alteração</th>
            <th scope="col">Responsável</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col">Cor</th>
            <th scope="col">Ano</th>
            <th scope="col">Hodômetro (km)</th>
            <th scope="col">Placa</th>
            <th scope="col">Renavam</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(action, index) in formatedHistory"
            :key="`${action.model}_${index}`"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ actionTypes[action.action] }}</td>
            <td>{{ action.created_at }}</td>
            <td>{{ action.user.name }}</td>
            <td>{{ action.car.model }}</td>
            <td>{{ action.car.brand.name }}</td>
            <td>{{ action.car.color }}</td>
            <td>{{ action.car.year }}</td>
            <td>{{ action.car.odometer }}</td>
            <td>{{ action.car.licence_plate }}</td>
            <td>{{ action.car.renavam }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "history-table",
  props: {
    history: Array
  },
  data() {
    return {
      formatedHistory: "",
      actionTypes: {
        create: "Cadastro do veículo",
        update: "Alteração do veículo",
        delete: "Remoção do veículo"
      }
    };
  },
  mounted() {
    this.loadInit();
  },
  methods: {
    loadInit() {
      this.formatData();
    },
    formatData() {
      const formatedHistory = [];
      if (this.history.length) {
        this.history.forEach(history => {
          let { old_info, new_info, fields } = history;
          old_info = old_info.split(";");
          new_info = new_info.split(";");
          fields = fields.split(";");
          const created_at = new Date(history.created_at);
          formatedHistory.push({
            action: history.action,
            created_at: created_at.toLocaleString("pt-BR"),
            user: {
              name: history.user.name
            },
            fields: fields,
            car: {
              model: "-",
              brand_id: "-",
              color: "-",
              year: "-",
              odometer: "-",
              licence_plate: "-",
              renavam: "-",
              brand: {
                name: "-"
              }
            }
          });
          formatedHistory[formatedHistory.length - 1].fields.forEach(
            (field, index) => {
              formatedHistory[formatedHistory.length - 1].car[field] =
                (old_info[index] ? old_info[index] : "N/A") +
                " -> " +
                (new_info[index] ? new_info[index] : "N/A");
            }
          );
        });
      }
      this.formatedHistory = formatedHistory;
    }
  },
  watch: {
    history: function() {
      this.loadInit();
    }
  }
};
</script>
<style>
.table-overflow {
  max-height: 400px;
  overflow-x: auto;
}
</style>