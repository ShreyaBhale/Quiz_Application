import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export function attempts_no(result) {
    return result.filter(r => r !== undefined).length              //r(user value) != und return len of arr
}

export function earnPoints_no(result, answers, point) {
    return result.map((element, i) => answers[i] === element).filter(i=>i).map(i => point).reduce((prev, curr) => prev + curr, 0);
    //filter only true elements,    assign every true elements 10 points, sum it
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints*50 /100) < earnPoints;
}

/** check user auth */
export function CheckUserExist({children}) {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** get server data */
export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
    const data = await (await axios.get(url, result))?.data;
    return callback ? callback(data) : data;
}
