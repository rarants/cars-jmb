<template>
  <div class="m-4">
    <div class="row">
      <div class="col-lg-4 col-md-3 col-sm-12 mt-3">
        <div class="card p-4">
          <div class="row">
            <div class="col h2">{{ this.stats.cars }}</div>
            <div class="col"><b>Veículos</b> no total</div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-3 col-sm-12 mt-3">
        <div class="card p-4">
          <div class="row">
            <div class="col h2">{{ this.stats.collaborators }}</div>
            <div class="col"><b>Colaboradores</b> no total</div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-3 col-sm-12 my-3">
        <div class="card p-4">
          <div class="row">
            <div class="col h2">{{ this.stats.registers }}</div>
            <div class="col"><b>Veículos</b> adicionados no último mês</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
        <div class="card scroll">
          <div class="card-head p-3 text-center">
            <h3>Veículos por ano de fabricação</h3>
          </div>
          <div class="card-body p-0">
            <apexchart
              width="500"
              type="bar"
              :options="carsByYearChart.options"
              :series="carsByYearChart.series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
        <div class="card scroll">
          <div class="card-head p-3 text-center">
            <h3>Veículos por marca</h3>
          </div>
          <div class="card-body p-0">
            <apexchart
              width="500"
              type="bar"
              :options="carsByBrandChart.options"
              :series="carsByBrandChart.series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
        <div class="card scroll">
          <div class="card-head p-3 text-center">
            <h3>Veículos por hodômetro</h3>
          </div>
          <div class="card-body p-0">
            <apexchart
              width="500"
              type="bar"
              :options="carsByOdometerChart.options"
              :series="carsByOdometerChart.series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
        <div class="card scroll">
          <div class="card-head p-3 text-center">
            <h3>Alterações por veículo no sistema</h3>
          </div>
          <div class="card-body p-0">
            <apexchart
              width="500"
              type="bar"
              :options="historyChart.options"
              :series="historyChart.series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Dashboard",
  data() {
    return {
      carsByBrandChart: {
        options: {
          chart: {
            id: "cars-by-brand-example"
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      },
      carsByYearChart: {
        options: {
          chart: {
            id: "history-stats-in-year-example"
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      },
      historyChart: {
        options: {
          chart: {
            id: "history-stats-in-year-example"
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      },
      carsByOdometerChart: {
        options: {
          chart: {
            id: "odometer-stats-example"
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      },
      stats: {
        cars: "",
        collaborators: "",
        registers: ""
      }
    };
  },
  async mounted() {
    await this.loadStats();
    await this.loadCarsByYear();
    await this.loadCarsStatsByBrand();
    await this.loadStatsByOdometer();
    await this.loadHistory();
  },
  methods: {
    async loadStats() {
      try {
        const { data } = await api.get(`/user/cars/stats`);
        this.stats.cars = data.cars[0].total;
        this.stats.collaborators = data.colaborators[0].total;
        this.stats.registers = data.cars_registered_last_year[0].total;
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as estatísticas. Recarregue a página e tente novamente."
        );
      }
    },
    async loadCarsByYear() {
      try {
        const { data } = await api.get(`/user/cars/stats/cars-by-year`);
        this.carsByYearChart.options = {
          ...this.carsByYearChart.options,
          ...{
            xaxis: {
              categories: data.map(data => {
                return data.year;
              })
            }
          }
        };
        this.carsByYearChart.series[0] = {
          ...this.carsByYearChart.series[0],
          ...{
            name: "carros",
            data: data.map(data => {
              return data.total;
            })
          }
        };
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações dos anos. Recarregue a página e tente novamente."
        );
      }
    },
    async loadCarsStatsByBrand() {
      try {
        const { data } = await api.get(`/user/cars/stats/cars-by-brand`);
        this.carsByBrandChart.options = {
          ...this.carsByBrandChart.options,
          ...{
            xaxis: {
              categories: data.map(data => {
                return data.brand.name;
              })
            }
          }
        };
        this.carsByBrandChart.series[0] = {
          ...this.carsByBrandChart.series[0],
          ...{
            name: "carros",
            data: data.map(data => {
              return data.total;
            })
          }
        };
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações das marcas. Recarregue a página e tente novamente."
        );
      }
    },  
    async loadStatsByOdometer() {
      try {
        const { data } = await api.get(`/user/cars/stats/cars-by-odometer`);
        this.carsByOdometerChart.options = {
          ...this.carsByOdometerChart.options,
          ...{
            xaxis: {
              categories: data.map(data => {
                return data.odometer;
              })
            }
          }
        };
        this.carsByOdometerChart.series[0] = {
          ...this.carsByOdometerChart.series[0],
          ...{
            name: "carros",
            data: data.map(data => {
              return data.total;
            })
          }
        };
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações dos ohodômetros. Recarregue a página e tente novamente."
        );
      }
    },
    async loadHistory() {
      try {
        const { data } = await api.get(`/user/cars/stats/history-in-year`);
        this.historyChart.options = {
          ...this.historyChart.options,
          ...{
            xaxis: {
              categories: data.map(data => {
                return data.car_id;
              })
            }
          }
        };
        this.historyChart.series[0] = {
          ...this.historyChart.series[0],
          ...{
            name: "alterações",
            data: data.map(data => {
              return data.total;
            })
          }
        };
      } catch (e) {
        this.$toasted.error(
          "Ocorreu um erro ao carregar as informações dos ohodômetros. Recarregue a página e tente novamente."
        );
      }
    },
  }
};
</script>

<style>
.scroll {
  overflow-x: auto;
}
</style>
