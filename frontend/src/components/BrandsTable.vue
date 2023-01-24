<template>
  <div class="m-4">
    <div class="text-center mb-4">
      <button
        type="link"
        class="btn btn-primary px-3 ml-auto text-white"
        @click="modalForm.show = true"
        aria-label="Cadastrar"
      >
        Cadastrar nova marca
      </button>
    </div>
    <div class="card p-3 table-overflow">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(brand, index) in brands" :key="`${brand.model}_${index}`">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ brand.name }}</td>
            <td>
              <button
                title="Editar marca"
                type="submit"
                class="btn btn-primary text-white custom-btn"
                @click="hadleOpenModalView(brand)"
              >
                <i class="fas fa-edit" />
              </button>
              <button
                title="Remover marca"
                type="submit"
                class="btn btn-danger text-white custom-btn"
                @click="hadleOpenModalRemove(brand)"
              >
                <i class="fas fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!brands.length" class="text-center">
        Ainda não há marcas cadastradas.
      </div>
    </div>
    <modal :show.sync="modalForm.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Cadastrar nova marca
      </h6>
      <div class="row text-left p-4">
        <div class="col-lg-12 mb-3">
          <label class="form-label">Nome*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o modelo"
            v-model="modalForm.model.name"
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
    <modal :show.sync="modalView.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Editar marca
      </h6>
      <div class="row text-left p-4">
        <div class="col-lg-12 mb-3">
          <label class="form-label">Nome*</label>
          <input
            type="text"
            class="form-control"
            placeholder="Informe o nome"
            v-model="modalView.brand.name"
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
          :disabled="!isValidEditModel"
        >
          Salvar alterações
        </button>
      </template>
    </modal>
    <modal :show.sync="modalRemove.show">
      <h6 slot="header" class="modal-title p-2" id="modal-title-notification">
        Remover marca
      </h6>
      <div class="text-left p-4">
        <h2 class="card-title text-orange mb-2 mt-7 pt-2">
          Tem certeza que deseja remover o seguinte marca?
        </h2>
        <div class="h5 font-weight-300 mb-2">
          {{ modalRemove.brand.name }}
        </div>
        <div
          class="h5 font-weight-300 mb-2"
          v-if="modalView.brand.brand && modalView.brand.brand.name"
        >
          Marca: {{ modalView.brand.brand.name }}
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

export default {
  name: "brands-table",
  data() {
    return {
      modalForm: {
        show: false,
        model: {
          name: ""
        }
      },
      modalView: {
        show: false,
        brand: {}
      },
      modalRemove: {
        show: false,
        brand: {}
      },
      brands: [],
      required: ["name"]
    };
  },
  async mounted() {
    await this.loadBrands();
  },
  methods: {
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
    async handleSubmit() {
      try {
        await api.post(`/user/brands`, this.modalForm.model);
        await this.loadBrands();
        this.handleCloseModalView();
        this.$toasted.success("Marca cadastrada com sucesso");
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao cadastrar a marca. Verifique as informações e tente novamente."
        );
      }
    },
    async handleSubmitUpdate() {
      try {
        await api.put(
          `/user/brands/${this.modalView.brand.id}`,
          this.modalView.brand
        );
        await this.loadBrands();
        this.modalView.show = false;
        this.$toasted.success("Marca salvo com sucesso");
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao salvar as alterações. Verifique as informações e tente novamente."
        );
      }
    },
    async handleRemove() {
      try {
        await api.delete(`/user/brand/${this.modalRemove.brand.id}`);
        //this.$emit('setRemoveBrand', this.modalRemove.brand)
        this.$toasted.success("Marca removido com sucesso");
      } catch (e) {
        this.$toasted.error("Ocorreu um erro ao remover o marca");
      }
    },
    handleCloseModalView(){
      this.modalForm = {
        show: false,
        model: {
          name: ""
        }
      };
    },
    hadleOpenModalView(brand) {
      this.modalView.brand = Object.assign({}, brand);
      this.modalView.show = true;
    },
    hadleOpenModalRemove(brand) {
      this.modalRemove.brand = brand;
      this.modalRemove.show = true;
    },
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
    isValidEditModel() {
      for (const requiredField of this.required) {
        if (!this.modalView.brand[requiredField]) return false;
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
