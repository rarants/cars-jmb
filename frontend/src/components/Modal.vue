<template>
  <div>
    <div
      class="modal"
      @click.self="closeModal"
      :class="[{ 'show d-block': show }, { 'd-none': !show }]"
      v-show="show"
      tabindex="-1"
      :aria-hidden="!show"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" v-if="$slots.header">
            <slot name="header"></slot>
            <slot name="close-button">
              <button
                type="button"
                class="btn btn-link px-3 close"
                @click="closeModal"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              >
                <span :aria-hidden="!show">X</span>
              </button>
            </slot>
          </div>
          <div class="modal-body scroll">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    show: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    }
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  }
};
</script>
<style scoped>
.btn.btn-link {
  color:rgb(31, 31, 31);
  text-decoration: none;
  font-weight: bold;
}
.btn.btn-link:hover {
  color:black;
}
.scroll {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
</style>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  --bs-modal-width: 80%
  ;
}
</style>