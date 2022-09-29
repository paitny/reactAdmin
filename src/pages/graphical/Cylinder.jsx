import {useCylinder} from "../../hooks/useEcharts"
import "../../assets/scss/chart.scss"
import {Card} from "antd"
export default function Cylinder() {
    const [domRef]=useCylinder()
    return (
<Card>

    <div className="cylinder" ref={domRef}>Cylinder</div>
</Card>



    )
}
