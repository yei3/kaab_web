<script>
import { Line } from 'vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { random } from '@/shared/utils'

export default {
  extends: Line,
  props: ['height'],
  mounted () {
    const assetsInitial = getStyle('--dark') || '#2f353a'
    const assetsRegistered = getStyle('--secondary') || '#c8ced3'
    
    let elements = 14
    const data1 = []
    const data2 = []

    data2.push(0, 213, 1423, 2736, 4023, 4536, 4836, 5432, 6239, 6469, 7439, 8011, 8365, 8687)
    for (let i = 0; i <= elements; i++) {
      
      data1.push(9823)
    }
    this.renderChart({
      labels: ['Inicio','S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10', 'S11', 'S12', 'S13'],
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
            stepSize: Math.ceil(12000/ 6),
            max: 12000
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
