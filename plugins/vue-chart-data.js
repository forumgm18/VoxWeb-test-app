export default {
  dynamicColors (alpha) {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  },

  getChartDot(maxVal) {
    return Math.floor(Math.random() * maxVal)
  },

  genSingleChartDataset(dataCount, datasetLabel){
    const chartData = []
    for (let i = 0; i < dataCount; i++) {
      chartData.push(this.getChartDot(50))
    }
    return {
          label: datasetLabel || '',
          data: chartData,
          backgroundColor: 'transparent',
          borderColor: this.dynamicColors(1),
          borderWidth: 2,
          showLine: true
        }
  },

  genChartData (n, dataCount) {
    const labels = []
    const datasets = []
    for (let i = 0; i < dataCount; i++) {
      labels.push(i)
    }
    for (let i = 0; i < n; i++) {
      datasets.push(this.genSingleChartDataset(dataCount, `Линия ${i+1}`))
    }
    return { labels: labels, datasets: datasets }
  },

  addDataToDatasets (chartData, n) {
    const elCount = chartData.labels.length
    const newData = Object.assign({}, chartData)
    for (let i = 0; i < n; i++) {
      newData.labels.push(elCount + i)
      newData.datasets.map(d => d.data.push(this.getChartDot(50)))
    }
      return newData
    },
    removeDataFromDatasets (chartData, n) {
      const newData = Object.assign({}, chartData)
      newData.labels.splice(-n, n)
      newData.datasets.map(d => d.data.splice(-n, n))
      return newData
    },
    removeDataset (chartData) {
      const newData = Object.assign({}, chartData)
      newData.datasets.splice(- 1, 1)
      return newData
    },
    addDataset(chartData, dataCount, datasetLabel) {
      const dataSet = this.genSingleChartDataset(dataCount, datasetLabel)
      const newData = Object.assign({}, chartData)
      newData.datasets.push(dataSet)
      return newData
    },
}
