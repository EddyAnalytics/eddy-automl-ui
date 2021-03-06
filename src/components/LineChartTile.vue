<template>
    <article>
        <line-chart class="line__chart" :chart-data="chartData" :options="options" />
    </article>
</template>

<style lang="scss">
.line__chart {
    max-height: 280px;
}
</style>
<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import SAMPLE_SUBSCRIPTION from '@/graphql/subscriptions/sample.gql';
import TOPICS_ACTIVITY from '@/graphql/subscriptions/kafkaTopicsActivity.gql';
import LineChart from '@/components/LineChart.js';

@Component({
    components: {
        LineChart
    }
})
export default class LineChartTile extends Vue {
    @Prop() topic;

    DEFAULT_COLORS = ['#11c2e9', '#00ccc3', '#48cd7d', '#a9c32d', '#ffa600'];

    dataPoints = {};
    labels = [];
    data = [];

    get chartData() {
        return {
            labels: this.labels,
            datasets: [
                {
                    backgroundColor: this.DEFAULT_COLORS[0],
                    data: this.data
                }
            ]
        };
    }

    get options() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            title: {
                display: true,
                text: 'Predictive accuracy'
            },
            legend: {
                display: false
            }
        };
    }

    i = 0;
    created() {
        this.i = 0;
        this.subscribeToData();
        this.subscribeToSampleData();
    }

    subscribeToData() {
        this.$apollo.addSmartSubscription('chartData', {
            query: TOPICS_ACTIVITY,
            variables: {
                topics: [this.topic],
                from: new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000
            },
            result({ data }) {
                this.i += 1;
                if (this.i % 1000 != 0) return;
                const label = this.i;
                const point = parseFloat(data.topicsActivity).toFixed(2);
                this.$emit('value', point);

                // Only keep 1k datapoints in memory
                if (this.data.length > 1000) {
                    this.dataPoints = {};
                }

                this.dataPoints[label] = point;
                this.labels = [];
                this.data = [];

                for (let [key, value] of Object.entries(this.dataPoints)) {
                    if (key) {
                        this.labels.push(key);
                        this.data.push(value);
                    }
                }
            }
        });
    }

    subscribeToSampleData() {
        this.$apollo.addSmartSubscription('chartDataSample', {
            query: SAMPLE_SUBSCRIPTION,
            variables() {
                return {
                    topic: this.topic,
                    rate: 1
                };
            },
            result({ data: { sample } }) {
                this.i += 1;
                if (this.i < 10 && this.i % 1000 != 0) return;
                const label = this.i;
                const point = parseFloat(sample).toFixed(2);

                this.$emit('value', point);

                // Only keep 1k datapoints in memory
                if (this.data.length > 1000) {
                    this.dataPoints = {};
                }

                this.dataPoints[label] = point;
                this.labels = [];
                this.data = [];

                for (let [key, value] of Object.entries(this.dataPoints)) {
                    if (key) {
                        this.labels.push(key);
                        this.data.push(value);
                    }
                }
            }
        });
    }
}
</script>
