<script>
import { Line } from 'vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { random } from '@/shared/utils'
import gets from '../../services/Gets'

export default {
  extends: Line,
  props: ['height'],
  async mounted () {
    const assetsInitial = getStyle('--dark') || '#2f353a'
    const assetsRegistered = getStyle('--secondary') || '#c8ced3'
    const chartData = await gets.getDashboardDataChart(this.$session.get('projectID'));
    console.info(chartData);
    let elements = chartData.data.dashboardChart.chartData.length;
    const data1 = []
    const data2 = chartData.data.dashboardChart.chartData
    var labels = ['Inicio'];
    for (let i = 0; i < elements; i++) {
      if (i > 0)
        labels.push('S' + i);
      data1.push(chartData.data.dashboardChart.initCount)
    }
    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Activos de base inicial',
          backgroundColor: 'transparent',
          borderColor: assetsInitial,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data1
        },
        {
          label: 'Activos inventariados',
          backgroundColor: hexToRgba(assetsRegistered, 35),
          borderColor: assetsRegistered,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: data2
        }
      ]
    }, {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 100,
            stepSize: Math.ceil(((Math.max(...data2) > chartData.data.dashboardChart.initCount) ? Math.max(...data2) : chartData.data.dashboardChart.initCount)/ 6),
            max: (Math.max(...data2) > chartData.data.dashboardChart.initCount) ? Math.max(...data2) : chartData.data.dashboardChart.initCount
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    })
  }
}
</script>
