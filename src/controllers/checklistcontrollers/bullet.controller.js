import Section from '../../models/checklistmodels/section.model.js';
import Bullet from '../../models/checklistmodels/bullet.model.js';

const bullet = {}
// Create and Save a new Bullet
bullet.createBullet = async (req, res) => {
    try {

        console.log("resultado body:",req.body)
        // Validate request
        if (!req.body.section || !req.body.description || !req.body.requerido) {
            return res.status(400).send({
                message: "Section, description, and requerido cannot be empty"
            });
        }

        // Check if the section exists
        const section = await Section.findById(req.body.section);
        if (!section) {
            return res.status(404).send({
                message: "Section not found"
            });
        }

        // Create a Bullet
        const bullet = new Bullet({
            section: req.body.section,
            description: req.body.description,
            requerido: req.body.requerido
        });

        // Save Bullet in the database
        const savedBullet = await bullet.save();
        res.status(201).send(savedBullet);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Bullet."
        });
    }
};

// Retrieve all Bullets
bullet.getAllBullets = async (req, res) => {
    try {
        const bullets = await Bullet.find().populate('section', 'name');
        res.status(200).send(bullets);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving bullets."
        });
    }
};

// Get a single Bullet by ID
bullet.getBulletById = async (req, res) => {
    try {
        const bullet = await Bullet.findById(req.params.id).populate('section', 'name');
        if (!bullet) {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }
        res.status(200).send(bullet);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error retrieving bullet with id ${req.params.id}`
        });
    }
};

// Update a Bullet
bullet.updateBullet = async (req, res) => {
    try {
        if (!req.body.section || !req.body.description || !req.body.requerido) {
            return res.status(400).send({
                message: "Section, description, and requerido cannot be empty"
            });
        }

        const updatedBullet = await Bullet.findByIdAndUpdate(
            req.params.id,
            {
                section: req.body.section,
                description: req.body.description,
                requerido: req.body.requerido
            },
            { new: true }
        );

        if (!updatedBullet) {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }

        res.status(200).send(updatedBullet);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error updating bullet with id ${req.params.id}`
        });
    }
};

// Delete a Bullet
bullet.deleteBullet = async (req, res) => {
    try {
        const deletedBullet = await Bullet.findByIdAndRemove(req.params.id);

        if (!deletedBullet) {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }

        res.status(200).send({ message: "Bullet deleted successfully!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Could not delete bullet with id ${req.params.id}`
        });
    }
};

export default bullet