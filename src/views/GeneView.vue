<script>
import { toRaw } from 'vue'
import * as d3 from 'd3'

export default {
  name: 'GeneView',
  data() {
    return {
      _id: null,
      gene: null,
      genes: [],
    }
  },
  props: {
    id: Number,
  },

  computed: {
    effectSizes() { return this.genes.map(gene => gene.temp37_effect_size) },
    falseDiscoveryRates() { return this.genes.map(gene => gene.temp37_fdr) },
  },
  methods: {
    fetchAll() {
      fetch('http://localhost:3000/api/genes', {
        method: 'GET',
        headers: { Accept: 'application/json', }
      })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.genes = JSON.parse(data).map(proxy => toRaw(proxy))
            this.gene = this.genes.filter(gene => gene.id == this._id)[0]
            this.renderHistogram(this.effectSizes, this.gene.temp37_effect_size, this.$refs.effectSize)
            this.renderHistogram(this.falseDiscoveryRates, this.gene.temp37_fdr, this.$refs.fdr)
          })
        } else {
          alert('Issue fetching genes!')
        }
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
    },
    renderHistogram(data, dataPoint, chartContainer) {
      // set up chart container 
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = chartContainer.clientWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
      const svg = d3.select(chartContainer)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // figure out how many bins we should have using Sturges formula
      const numBins = Math.ceil(Math.log(data.length) / Math.LN2) + 1
      const bins = d3.histogram()
        .domain(d3.extent(data))
        .thresholds(numBins)(data);

      // set up x and y scale
      const x = d3.scaleLinear()
        .domain([bins[0].x0, bins[bins.length - 1].x1])
        .range([0, width]);
      const y = d3.scaleLinear()
        .domain([0, d3.max(bins, bin => bin.length)])
        .range([height, 0]);

      // set up axes
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      // finally, draw the bars
      svg.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr('x', d => x(d.x0) + 1)
        .attr('width', d => x(d.x1) - x(d.x0) - 1)
        .attr('y', d => y(d.length))
        .attr('height', d => y(0) - y(d.length))
        .attr('fill', 'green');

      // add the axes to the chart
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
      svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

      // identify which bin the dataPoint belongs to - if any
      const pointBin = bins.find(bin => bin.x0 <= dataPoint && dataPoint < bin.x1);
  
      // add a circle for the specific data point on the corresponding bin, or to the right of the chart
      svg.append('circle')
        .attr('cx', x(dataPoint))
        .attr('cy', y(pointBin?.length ?? numBins))
        .attr('r', 5)
        .attr('fill', 'black')
    },

  },

  mounted() {
    this._id = this.id
    this._id ??= this.$route.path.replace(/gene/, '').replace(/\//g, '')
    this.fetchAll()
  }
}
</script>

<template>
  <div class="flex-col gap-2">
    <div v-if="gene">
      <h2>Gene Details:</h2>
      <ul>
        <li>Identifier: {{ this.gene.gene }}</li>
        <li>Effect Size: {{ this.gene.temp37_effect_size }}</li>
        <li>False Discovery Rate: {{ this.gene.temp37_fdr }}</li>
      </ul>
    </div>
    <div class="flex gap-1">
      <div class="flex-col">
        <h2>Effect Size</h2>
        <div class="min-w-60" ref="effectSize"></div>
      </div>
      <div class="flex-col">
        <h2>Discovery Rate</h2>
        <div class="min-w-60" ref="fdr"></div>
      </div>
    </div>
  </div>
</template>