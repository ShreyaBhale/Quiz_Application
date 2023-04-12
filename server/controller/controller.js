import Questions from "../models/questionsSchema.js";
import Results from "../models/resultSchema.js";
import questions, {answers} from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res) {
    try {
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({error})
    }
}

/** insert all questions */
export async function insertQuestions(req, res){
    try {
        Questions.insertMany({ questions, answers }).then(function () {
            res.json({ msg: "Data Saved Successfully...!"})
        })
        
    } catch (error) {
        res.json({ error })
    }
}

/** delete all que */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();       
        res.json({msg: "Questions DEleted successfully!!"})
        
    } catch (error) {
        res.json({ error })
    }
}

/** get all result */
export async function getREsult(req, res) {
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}


export async function storeResult(req, res) {
    try {
        const {username, result, attempts, points, achieved} = req.body;
        if(!username && !result) throw new Error ('Data Not Provided');

        Results.create({username, result, attempts, points, achieved}).then(function() {
            res.json({msg: "REsult saved"})
        })             // to insert only one doc
    } catch (error) {
        res.json({error})
    }
}

export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({msg: "DEleted successfully"})
    } catch (error) {
       res.json({error}) 
    }
}


