<template>
  <div class="m-4">
    <div class="text-center mb-2">
      <button
        type="link"
        class="btn btn-primary px-3 ml-auto text-white"
        @click="modalForm.show = true"
        aria-label="Cadastrar"
      >
        Cadastrar novo veículo
      </button>
    </div>
    <div class="row">
      <div class="col-3 mb-3">
        <label class="form-label">Buscar por</label>
        <select class="form-select" v-model="model.type">
          <option selected value="">Nenhum</option>
          <option
            :value="type.type"
            v-for="(type, index) in searchTypes"
            :key="`${type.type}_${index}`"
          >
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="col-7 mb-3">
        <label class="form-label">Buscar</label>
        <input
          type="text"
          class="form-control"
          placeholder="Digite aqui a sua busca"
          v-model="model.text"
          v-if="model.type !== 'brand'"
        />
        <select class="form-select" v-model="model.text" v-else>
          <option selected value="">Selecione a marca</option>
          <option
            :value="brand.id"
            v-for="(brand, index) in brands"
            :key="`${brand.name}_${index}`"
          >
            {{ brand.name }}
          </option>
        </select>
      </div>
      <div class="col-2 mb-3 d-flex align-items-end">
        <button
          type="button"
          class="btn btn-primary px-4"
          title="Realizar busca"
          @click="loadCars()"
        >
          <i class="fas fa-search" />
        </button>
      </div>
    </div>
    <div class="card p-3 table-overflow">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col">Cor</th>
            <th scope="col">Ano</th>
            <th scope="col">Hodômetro (km)</th>
            <th scope="col">Placa</th>
            <th scope="col">Renavam</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" :key="`${car.model}_${index}`">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ car.model }}</td>
            <td>{{ car.brand.name }}</td>
            <td>{{ car.color }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.odometer }}</td>
            <td>{{ car.licence_plate }}</td>
            <td>{{ car.renavam }}</td>
            <td>
              <button
                title="Editar carro"
                type="submit"
                class="btn btn-primary text-white custom-btn"
                @click="hadleOpenModalView(car)"
              >
                <i class="fas fa-edit" />
              </button>
              <button
                title="Remover carro"
                type="submit"
                class="btn btn-danger text-white custom-btn"
                @click="hadleOpenModalRemove(car)"
              >
                <i class="fas fa-trash" />
              </button>
              <button
                title="Visualizar histórico"
                type="submit"
                class="btn btn-secondary text-white custom-btn"
                @click="hadleOpenModalHistory(car)"
              >
                <i class="fas fa-history" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!cars.length" class="text-center">
        Ainda não há veículos cadastrados.
      </div>
    </div>
    <modal :show.sync="modalForm.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Cadastrar novo veículo
      </h6>
      <div class="row text-left p-4">
        <div class="col-lg-6 mb-3">
          <label class="form-label">Modelo*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o modelo"
            v-model="modalForm.model.model"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Marca*</label>
          <select class="form-select" v-model="modalForm.model.brand_id">
            <option selected disabled value="">Selecione a opção</option>
            <option
              :value="brand.id"
              v-for="(brand, index) in brands"
              :key="`${brand.name}_${index}`"
            >
              {{ brand.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Cor*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a cor"
            v-model="modalForm.model.color"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Ano*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o ano"
            v-model="modalForm.model.year"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Hodômetro (km)*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o hodômetro"
            v-model="modalForm.model.odometer"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Placa*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a placa"
            v-model="modalForm.model.licence_plate"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Renavam*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o renavam"
            v-model="modalForm.model.renavam"
          />
        </div>
      </div>
      <template slot="footer">
        <button
          type="link"
          class="btn btn-secondary px-3 ml-auto text-white"
          @click="modalForm.show = false"
          data-bs-dismiss="modal"
          aria-label="Fechar"
        >
          Cancelar
        </button>
        <button
          type="link"
          class="btn btn-primary px-3 ml-auto text-white"
          @click="handleSubmit()"
          aria-label="Salvar"
          :disabled="!isValidModel"
        >
          Cadastrar
        </button>
      </template>
    </modal>
    <modal :show.sync="modalHistory.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Visualizar histórico do veículo
      </h6>
      <div class="text-left p-4">
        <history-table v-bind:history="modalHistory.history" />
      </div>
      <template slot="footer">
        <button
          type="link"
          class="btn btn-secondary px-3 ml-auto text-white"
          @click="modalHistory.show = false"
          data-bs-dismiss="modal"
          aria-label="Voltar"
        >
          Voltar
        </button>
      </template>
    </modal>
    <modal :show.sync="modalView.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Editar veículo
      </h6>
      <div class="row text-left p-4">
        <div class="col-lg-6 mb-3">
          <label class="form-label">Modelo*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o modelo"
            v-model="modalView.car.model"
          />
        </div>
        <div
          class="col-lg-6 mb-3"
          v-if="modalView.car.brand && modalView.car.brand.id"
        >
          <label class="form-label">Marca*</label>
          <select class="form-select" v-model="modalView.car.brand_id">
            <option selected disabled value="">Selecione a opção</option>
            <option
              :value="brand.id"
              v-for="(brand, index) in brands"
              :key="`${brand.name}_${index}`"
            >
              {{ brand.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Cor*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a cor"
            v-model="modalView.car.color"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Ano*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o ano"
            v-model="modalView.car.year"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Hodômetro (km)*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o hodômetro"
            v-model="modalView.car.odometer"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Placa*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe a placa"
            v-model="modalView.car.licence_plate"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <label class="form-label">Renavam*</label>
          <input
            type="number"
            class="form-control"
            placeholder="Informe o renavam"
            v-model="modalView.car.renavam"
          />
        </div>
      </div>
      <template slot="footer">
        <button
          type="link"
          class="btn btn-secondary px-3 ml-auto text-white"
          @click="modalView.show = false"
          data-bs-dismiss="modal"
          aria-label="Fechar"
        >
          Cancelar
        </button>
        <button
          type="link"
          class="btn btn-primary px-3 ml-auto text-white"
          @click="handleSubmitUpdate()"
          aria-label="Salvar"
          :disabled="!isValidModelEdit"
        >
          Salvar alterações
        </button>
      </template>
    </modal>
    <modal :show.sync="modalRemove.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Remover carro
      </h6>
      <div class="text-left p-4">
        <h2 class="card-title text-orange mb-2 mt-7 pt-2">
          Tem certeza que deseja remover o seguinte veículo?
        </h2>
        <div class="h5 font-weight-300 mb-2">
          Marca: {{ modalRemove.car.model }}
        </div>
        <div
          class="h5 font-weight-300 mb-2"
          v-if="modalView.car.brand && modalView.car.brand.name"
        >
          Marca: {{ modalView.car.brand.name }}
        </div>
        <div class="h5 font-weight-300 mb-2">
          Cor: {{ modalRemove.car.color }}
        </div>
        <div class="h5 font-weight-300 mb-2">
          Ano: {{ modalRemove.car.year }}
        </div>
        <div class="h5 font-weight-300 mb-2">
          Hodômetro (km) {{ modalRemove.car.odometer }}
        </div>
        <div class="h5 font-weight-300 mb-2">
          Placa: {{ modalRemove.car.licence_plate }}
        </div>
        <div class="h5 font-weight-300 mb-2">
          Renavam: {{ modalRemove.car.renavam }}
        </div>
      </div>
      <template slot="footer">
        <button
          type="link"
          class="btn btn-secondary px-3 ml-auto text-white"
          @click="modalRemove.show = false"
          data-bs-dismiss="modal"
          aria-label="Fechar"
        >
          Cancelar
        </button>
        <button
          type="link"
          class="btn btn-danger px-3 ml-auto text-white"
          @click="handleRemove()"
          aria-label="Remover"
        >
          Remover
        </button>
      </template>
    </modal>
  </div>
</template>
<script>
import api from "@/services/api";
import HistoryTable from "./HistoryTable.vue";

export default {
  name: "cars-table",
  components: {
    HistoryTable
  },
  data() {
    return {
      model: {
        text: "",
        type: ""
      },
      searchTypes: [
        {
          name: "Modelo",
          type: "model"
        },
        {
          name: "Cor",
          type: "color"
        },
        {
          name: "Marca",
          type: "brand"
        },
        {
          name: "Ano",
          type: "year"
        },
        {
          name: "Hodômetro",
          type: "odometer"
        },
        {
          name: "Placa",
          type: "licence_plate"
        },
        {
          name: "Renavam",
          type: "renavam"
        }
      ],
      modalForm: {
        show: false,
        model: {
          model: "",
          brand_id: "",
          color: "",
          year: "",
          odometer: "",
          licence_plate: "",
          renavam: ""
        }
      },
      modalView: {
        show: false,
        car: {}
      },
      modalRemove: {
        show: false,
        car: {}
      },
      modalHistory: {
        show: false,
        car: {},
        history: []
      },
      cars: [],
      brands: [],
      history: [],
      required: [
        "model",
        "brand_id",
        "color",
        "year",
        "renavam",
        "odometer",
        "licence_plate"
      ]
    };
  },
  async mounted() {
    await this.loadCars();
    await this.loadBrands();
  },
  methods: {
    async loadCars() {
      try {
        const { data } = await api.get(`/user/cars${this.getFilters()}`);
        this.cars = data;
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações dos veículos. Recarregue a página e tente novamente."
        );
      }
    },
    async loadBrands() {
      try {
        const { data } = await api.get(`/user/brands`);
        this.brands = data;
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao cadastrar as informações dos marcas. Recarregue a página e tente novamente."
        );
      }
    },
    async loadHistory() {
      try {
        const { data } = await api.get(
          `/user/car/${this.modalHistory.car.id}/history`
        );
        this.modalHistory.history = data;
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações do histórico do veículo. Recarregue a página e tente novamente."
        );
      }
    },
    async handleSubmit() {
      try {
        await api.post(`/user/cars`, this.modalForm.model);
        await this.loadCars();
        this.handleCloseModalForm();
        this.$toasted.success("Veículo cadastrado com sucesso");
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao cadastrar o veículo. Verifique as informações e tente novamente."
        );
      }
    },
    async handleSubmitUpdate() {
      try {
        await api.put(
          `/user/cars/${this.modalView.car.id}`,
          this.modalView.car
        );
        await this.loadCars();
        this.modalView.show = false;
        this.$toasted.success("Veículo salvo com sucesso");
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao salvar as alterações. Verifique as informações e tente novamente."
        );
      }
    },
    async handleRemove() {
      try {
        await api.delete(`/user/cars/${this.modalRemove.car.id}`);
        await this.loadCars();
        this.modalRemove.show = false;
        this.$toasted.success("Veículo removido com sucesso");
      } catch (e) {
        this.$toasted.error("Ocorreu um erro ao remover o veículo");
      }
    },
    async hadleOpenModalHistory(car) {
      this.modalHistory.car = car;
      await this.loadHistory();
      this.modalHistory.show = true;
    },
    hadleOpenModalView(car) {
      this.modalView.car = { ...car, brand_id: car.brand.id };
      this.modalView.show = true;
    },
    hadleOpenModalRemove(car) {
      this.modalRemove.car = car;
      this.modalRemove.show = true;
    },
    handleCloseModalForm() {
      this.modalForm = {
        show: false,
        model: {
          model: "",
          brand_id: "",
          color: "",
          year: "",
          odometer: "",
          licence_plate: "",
          renavam: ""
        }
      };
    },
    getFilters() {
      let filters = "";
      const model = this.model;
      if (model.text && model.type) {
        filters += `?text=${model.text}&type=${model.type}`;
      }
      return filters;
    }
  },
  computed: {
    isValidSearch() {
      if (this.model.text && this.model.type) return true;
      return false;
    },
    isValidModel() {
      for (const requiredField of this.required) {
        if (!this.modalForm.model[requiredField]) return false;
      }
      return true;
    },
    isValidModelEdit() {
      for (const requiredField of this.required) {
        if (!this.modalView.car[requiredField]) return false;
      }
      return true;
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
