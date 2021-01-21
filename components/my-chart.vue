<script>
  import { Line, mixins } from 'vue-chartjs'

  export default {
    name: "my-chart",
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['randomChartData'],
    data: () => ({
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }),
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
    watch: {
      randomChartData() {
        if (this.randomChartData) {
          this.renderChart(this.chartData, this.options)
        }
      }
    }
  }
</script>

