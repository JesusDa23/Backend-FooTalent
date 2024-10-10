import Checklist from '../models/Checklist.model.js'
import Response from '../models/Response.model.js'

const ChecklistController = {}

ChecklistController.create = async (req, res) => {
    const { title, description, questions } = req.body
    try {
        const checklist = await Checklist.create({
            title,
            description,
            questions,
            created_by: req.userId
        })
        res.status(201).json(checklist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
ChecklistController.update = async (req, res) => {
    const { id } = req.params
    const { title, description, questions } = req.body
    try {
        const checklist = await Checklist.findByIdAndUpdate(
            id,
            { title, description, questions },
            { new: true }
        )
        res.status(200).json(checklist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

ChecklistController.getAll = async (req, res) => {
    try {
        const checklists = await Checklist.find()
        res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

ChecklistController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const checklist = await Checklist.findById(id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

ChecklistController.getResponsesByChecklistId = async (req, res) => {
    const { id } = req.params
    try {
        const responses = await Response.find({
            checklist_id: id
        })
        res.status(200).json(responses)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

ChecklistController.getQuestionsByChecklistId = async (req, res) => {
    const { id } = req.params
    try {
        const checklist = await Checklist.findById(id)
        res.status(200).json(checklist.questions)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

ChecklistController.submitChecklist = async (req, res) => {
    const { checklist_id, vehicle_id, answers } = req.body
    try {
        const response = await Response.create({
            user_id: req.user.id,
            checklist_id,
            vehicle_id,
            answers
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export default ChecklistController
