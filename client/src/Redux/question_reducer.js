import { createSlice } from "@reduxjs/toolkit"

/** create reducer */
export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0                      //to trace no. of que have user been
    },
    reducers: {
        startExamAction: (state, action) => {
            let { question, answers} = action.payload
            return{
                ...state,              //
                queue: question,
                answers : answers
            }
        },
        moveNextAction : (state) => {
            return{
                ...state,
                trace : state.trace + 1
            }
        },
        movePrevAction : (state) => {
            return {
                ...state,
                trace : state.trace - 1
            }
        },
        resetAllAction : () => {
            return {
                queue: [],
                answers: [],
                trace: 0  
            }
        }
    }
})
//reducers allow u to specify and dispatch an action
//the action allows u to chnge the value of the store
//value of store can be chnaged only usinfg action

export const {startExamAction, moveNextAction, movePrevAction, resetAllAction} = questionReducer.actions;
export default questionReducer.reducer;