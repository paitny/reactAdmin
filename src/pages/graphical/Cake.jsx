import React from 'react';
import {useCake} from "../../hooks/useEcharts"
import "../../assets/scss/chart.scss"
import {Card} from "antd"
export default function Cake() {
    const [domRef]=useCake()
    return (
        <Card>
            <div className="cylinder" ref={domRef}>Cake</div>
        </Card>

    )
}
