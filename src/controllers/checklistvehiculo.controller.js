import ChecklistVehiculo from '../models/checkListVehiculo.model.js';

const checklist = {}
// Create a new checklist entry
checklist.createChecklist = async (req, res) => {
  try {
    const checklist = new ChecklistVehiculo(req.body);
    await checklist.save();
    res.status(201).json(checklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all checklist entries
checklist.getAllChecklists = async (req, res) => {
  try {
    const checklists = await ChecklistVehiculo.find();
    res.status(200).json(checklists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a checklist entry by ID
checklist.getChecklistById = async (req, res) => {
  try {
    const checklist = await ChecklistVehiculo.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a checklist entry by ID
checklist.updateChecklist = async (req, res) => {
  try {
    const checklist = await ChecklistVehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    res.status(200).json(checklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a checklist entry by ID
checklist.deleteChecklist = async (req, res) => {
  try {
    const checklist = await ChecklistVehiculo.findByIdAndDelete(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default checklist
