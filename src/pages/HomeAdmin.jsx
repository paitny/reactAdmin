import React from 'react';
import "../assets/scss/chartcommit.scss"
import {usePolar} from "../hooks/useEcharts";
import {Card} from "antd";
export default function HomeAdmin() {
const [domRef]=usePolar()
    return (
        <Card>
            <div className="ping" ref={domRef}>HomeAdmin</div>
        </Card>

    )
}
