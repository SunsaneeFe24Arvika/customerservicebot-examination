import './index.css';
import { BiCycling } from "react-icons/bi";
import { FaPersonRunning } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import { GrSwim } from "react-icons/gr";
import { GrWheelchairActive } from "react-icons/gr";
import { GiJumpAcross } from "react-icons/gi";

export const Loading = () => {
    return <div className="loading">
        <i className="loading-icon">
            <BiCycling />
            <FaPersonRunning />
            <FaPersonWalking />
            <GrSwim />
            <GrWheelchairActive />
            <GiJumpAcross />
        </i>
    </div>;
}