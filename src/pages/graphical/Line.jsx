import React from 'react';
import {useLine} from "../../hooks/useEcharts"
import "../../assets/scss/chart.scss"
import {Card} from "antd";

export default function Line() {
    const [domRef]=useLine()
    return (
        <Card>
            <div className="cylinder" ref={domRef}>Line</div>
        </Card>

    )
}
