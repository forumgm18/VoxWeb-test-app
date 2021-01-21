<template>
  <article class="article">
    <h1>Статистика</h1>
    <div class="content">
      <my-chart v-if="showLine" :chart-data="lineData" :random-chart-data="randomChartData"/>
      <div class="filter-block">
        <button @click="randomData" class="btn btn-secondary">Случайные данные</button>
        <button @click="addDataset" class="btn btn-secondary">Добавить график</button>
        <button @click="removeDataset" :disabled="n < 1" class="btn btn-secondary">Удалить график</button>
        <button @click="addDataToDatasets" class="btn btn-secondary">Увеличить кол-во данных</button>
        <button @click="removeDataFromDatasets" :disabled="dataCount < 2" class="btn btn-secondary">Уменьшить кол-во данных</button>
      </div>
    </div>
  </article>
</template>

<script>
  import myChart from '@/components/my-chart'
  import chartData from '@/plugins/vue-chart-data'
  export default {
    name: "stat",
    middleware: ['auth'],
    components: { myChart},
    data: () => ({
      n: 1,
      dataCount: 10,
      showLine: false,
      lineData: null,
      randomChartData: false
    }),
    mounted () {
      this.lineData = chartData.genChartData(this.n, this.dataCount)
      this.showLine = true
    },
    methods: {
      randomData () {
        this.lineData = chartData.genChartData(this.n || 1, this.dataCount || 10)
        this.showLine = true
        this.randomChartData = true
      },
      addDataset() {
        this.lineData = chartData.addDataset(this.lineData, this.dataCount, `Линия ${this.n + 1}`)
        this.n = this.lineData.datasets.length
        if (this.n) { this.showLine = true }
        this.randomChartData = false
      },
      removeDataset () {
        this.lineData = chartData.removeDataset(this.lineData)
        this.n = this.lineData.datasets.length
        if (this.n < 1) { this.showLine = false }
        this.randomChartData = false
      },
      addDataToDatasets () {
        this.lineData = chartData.addDataToDatasets(this.lineData, 1)
        this.dataCount = this.lineData.labels.length
      },
      removeDataFromDatasets () {
        this.lineData = chartData.removeDataFromDatasets(this.lineData, 1)
        this.dataCount = this.lineData.labels.length
      }
    }
  }
</script>

<style scoped>
  .article {
    max-height: 100vh;
  }
  .content {max-height: 100%}
  .filter-block {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  .btn {
    width: fit-content;
    height: auto;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 1.2;
    padding: 8px 15px;
  }
  .btn:not(:last-child) { margin-right: 10px;}
  .btn:disabled {
    pointer-events: none;
    color: #bababa;
    background-color: #f1f1f1;
  }
  @media (max-width: 768px) {
    .article {
      padding-left: 15px;
      padding-right:15px;
      max-height: unset;
    }
    .content { padding: 24px 15px; }

  }
</style>
