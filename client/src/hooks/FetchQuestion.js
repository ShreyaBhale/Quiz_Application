import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**redux actions */
import * as Action from '../Redux/question_reducer';
import { getServerData } from "../helper/helper";

/**fetch que hook to fetch api data and set value to store */
export const useFetchQuestion = () => {                 //'use' used to inform react that we afe using hook
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({Loading: false, apiData: [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, Loading: true}));

        /**async fn to fetch dackend data */
        (async () => {
            try {
                const [{questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                console.log({questions, answers})

                if(questions.length > 0) {
                    setGetData(prev => ({...prev, Loading: false}));
                    setGetData(prev => ({...prev, apiData: questions}));

                    /** dispatch an acton */        //// dispatch fn calls an action and update the store
                     dispatch(Action.startExamAction({question : questions, answers}))
                }
                else{
                    throw new Error("No question available")
                }

            } catch (error) {
                setGetData(prev => ({...prev, Loading: false}));
                setGetData(prev => ({...prev, serverError: error}));
            }
        })();
    }, [dispatch])            // to stop continues looping of useEffect pass dispatch as dependency

    return [getData, setGetData];
}

/**moveaction dispatch fn */
export const MoveNextQuestion = () => async(dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = () => async(dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}

/** 
 * useFetchquestion its going to initialize and specify value to the store using this fn
 * so we have all the questions in queue variable  so now can access the state anywhere in the component and access all the fn easily
 * 
 * useDispatch is accesible only in hook not in fn
 */