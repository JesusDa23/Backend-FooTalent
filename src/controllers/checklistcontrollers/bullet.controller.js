import Section from '../../models/checklistmodels/section.model.js';
import Bullet from '../../models/checklistmodels/bullet.model.js';

const bullet = {}
// Create and Save a new Bullet
bullet.createBullet = async (req, res) => {
    try {
        const { sectionId, description, requerido } = req.body;

        // Validate request
        if (!req.body.description) {
            return res.status(400).send({
                message: "Section, description, and requerido cannot be empty"
            });
        }
        else {
            const newBullet = new Bullet({ section: sectionId, description, requerido });
            await newBullet.save();
            res.status(201).json(newBullet);
        }

    } catch (error) {
        console.error('Error creating bullet:', error);
        res.status(500).json({ message: 'Error creating bullet', error });
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
    // console.log('Request Body:', req.body);
    // console.log('Bullet ID:', req.params.id);

    try {
        const { section, description, requerido } = req.body.description || {}; // Destructure the nested description

        // Validate incoming data
        if (!section || !description || typeof requerido === 'undefined') {
            console.log('Validation failed:', req.body);
            return res.status(400).send({
                message: "Section, description, and requerido cannot be empty"
            });
        }

        const updatedBullet = await Bullet.findByIdAndUpdate(
            req.params.id,
            {
                description: description,
                requerido: requerido, // Include 'requerido' in the update
            },
            { new: true }
        );

        if (!updatedBullet) {
            console.log(`Bullet not found with id ${req.params.id}`);
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }

        console.log('Updated Bullet:', updatedBullet);
        res.status(200).send(updatedBullet);
    } catch (error) {
        console.error('Error updating bullet:', error);
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
        const bulletId = req.params.id;
        console.log("Item to delete:", bulletId);
        // Proceed to delete
        const deletedBullet = await Bullet.findByIdAndDelete(bulletId);

        // If deletedBullet is still undefined after trying to remove
        if (!deletedBullet) {
            return res.status(404).send({
                message: `Bullet not found with id ${bulletId}`
            });
        }

        res.status(200).send({ message: "Bullet deleted successfully!" });
    } catch (error) {
        console.error("Error deleting bullet:", error);  // Log the actual error

        // Handle incorrect ObjectId errors
        if (error.kind === 'ObjectId' || error.name === 'CastError') {
            return res.status(404).send({
                message: `Bullet not found with id ${req.params.id}`
            });
        }

        res.status(500).send({
            message: `Could not delete bullet with id ${req.params.id}`
        });
    }
};

bullet.getBulletsBySection = async (req, res) => {
    try {
        const { sectionId } = req.params;

        // Find bullets where the section matches the provided sectionId
        const bullets = await Bullet.find({ section: sectionId });

        if (!bullets || bullets.length === 0) {
            return res.status(304).json({ message: 'No bullets found for this section' });
        }

        // Return the bullets
        res.status(200).json(bullets);
    } catch (error) {
        console.error('Error fetching bullets:', error);
        res.status(500).json({ message: 'Error fetching bullets', error });
    }
}

bullet.updateRequeridoStatus = async (req, res) => {
    try {
        const { bulletId } = req.params;
        const { requerido } = req.body; // Expected to receive the new "requerido" value

        const updatedBullet = await Bullet.findByIdAndUpdate(
            bulletId,
            { requerido },
            { new: true } // Return the updated document
        );

        if (!updatedBullet) {
            return res.status(404).json({ message: 'Bullet not found' });
        }

        res.status(200).json(updatedBullet);
    } catch (error) {
        console.error('Error updating bullet:', error);
        res.status(500).json({ message: 'Error updating bullet', error });
    }
};

export default bullet