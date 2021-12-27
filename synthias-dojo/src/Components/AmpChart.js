import { React, Component } from 'react';
import FormGroup from 'react-bootstrap/esm/FormGroup';

// Import ChartJS:
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    ArcElement
} from 'chart.js'

import { Radar } from 'react-chartjs-2';

class AmpChart extends Component {
    constructor (props) {
        super (props);
        
        ChartJS.register(
            RadialLinearScale,
            PointElement,
            LineElement,
            Filler,
            Tooltip,
            Legend,
            CategoryScale,
            LinearScale,
            ArcElement
        );

        this.colors = {
            primary: 'rgba(29, 219, 188, 0.4)',
            secondary: 'rgba(137, 72, 219, 0.7)'
        }

        this.ampValuesV2 = [
            'AmplifierEnvPanMod',
            'AmplifierKbdAmpMod',
            'AmplifierKbdPanMod',
            'AmplifierLFOAmpMod',
            'AmplifierLFOPanMod',
            'AmplifierLevel',
            'AmplifierPan',
            'AmplifierToggle'
        ];

        this.labels = [
            'Pan Mod',
            'Kbd Amp Mod',
            'Kbd Pan Mod',
            'Lfo Amp Mod',
            'Lfo Pan Mod',
            'Level',
            'Pan',
            'Toggle'
        ];

        // 7

    }

    prepareData() {
        
        let signalChain1 = [];
        let signalChain2 = [];

        this.ampValuesV2.map((x) => {
            signalChain1.push(this.props.osc1[x]);
        });

        this.ampValuesV2.map((x) => {
            signalChain2.push(this.props.osc2[x]);
        });

        return [signalChain1, signalChain2];
    }

    handleBool(arg) {
        if (arg === "true") {
            return 1;
        } 
        return 0.5;
    }


    render() {

        let myData = this.prepareData();

        let graphData = {
            labels: this.labels,
            datasets: [
                {
                    label: 'Signal Chain 01',
                    data: myData[0],
                    backgroundColor: this.colors.primary,
                    borderColor: this.colors.primary,
                    color: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Signal Chain 02',
                    data: myData[1],
                    backgroundColor: this.colors.secondary,
                    borderColor: this.colors.secondary,
                    color: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1
                }
            ]
        }

        return (
            <div className="LibraryChart">
                <h1>Amp</h1>
                <Radar 
                    data={graphData} 
                    options={{
                        scales: {
                            r: {
                                grid: {
                                    circular: true,
                                    borderWidth: 4,
                                    borderDash: [4, 4, 4, 4],
                                    color: 'rgba(255, 255, 255, 1)',

                                },
                                beginAtZero: true,
                                ticks: {
                                    color: '#000000'
                                }
                            }
                            
                        },
                        elements: {
                            line: {
                                tension: 0.5,
                                borderWidth: 3
                            }
                        }
                        
                    }}
                />
            </div>
        );
    }
}

export default AmpChart;
