<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" ng-app="">
      <div class="container-fluid center upper">
        <div class="col navbar-brand">
          <div class="row g-0">
            <div class="col-2 col-lg-1 col-md-2 col-sm-1">
              <span class="d-lg-none">
                <button
                  id="setShowMenu"
                  class="btn white mx-4 p-2 px-3"
                  @click="handleOpenMenu()"
                >
                  <i class="fas fa-bars fa-1x" />
                </button>
              </span>
            </div>
            <div class="col-8 col-lg-9 col-md-8 mt-2 col-sm-9">
              <h4>{{ $route.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    showModalMenu: Boolean
  },
  methods: {
    handleOpenMenu() {
      this.$emit("setShowModalMenu", true);
    }
  }
};
</script>

<style>
.center {
  text-align: center;
}
.upper {
  text-transform: uppercase;
}
.bg-primary {
  background: linear-gradient(
      180deg,
      rgba(0, 132, 255, 0) 0.48%,
      #14b9dd 99.37%
    ),
    linear-gradient(0deg, #14b9dd, #14b9dd);
}
.white {
  color: white;
}
</style>
