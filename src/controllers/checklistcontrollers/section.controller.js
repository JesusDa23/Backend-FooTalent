import Section from '../../models/checklistmodels/section.model.js';
import Category from '../../models/checklistmodels/category.model.js';
import Bullet from '../../models/checklistmodels/bullet.model.js';
import mongoose from 'mongoose';

const section = {}

// Create and Save a new Section
section.createSection = async (req, res) => {
    try {
        // Validate request
        if (!req.body.name || !req.body.category) {
            return res.status(400).send({
                message: "Section name and category cannot be empty"
            });
        }

        // Check if the category exists
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        // Create a Section
        const section = new Section({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description || ''
        });

        // Save Section in the database
        const savedSection = await section.save();
        res.status(201).send(savedSection);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Section."
        });
    }
};

// Retrieve all Sections
section.getAllSections = async (req, res) => {
    try {
        const sections = await Section.find().populate('category', 'name');
        res.status(200).send(sections);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving sections."
        });
    }
};

// Get a single Section by ID
section.getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).populate('category', 'name');
        if (!section) {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }
        res.status(200).send(section);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error retrieving section with id ${req.params.id}`
        });
    }
};

// Update a Section
section.updateSection = async (req, res) => {
    try {
        if (!req.body.name || !req.body.category) {
            return res.status(400).send({
                message: "Section name and category cannot be empty"
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                description: req.body.description || ''
            },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }

        res.status(200).send(updatedSection);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error updating section with id ${req.params.id}`
        });
    }
};

// Delete a Section
section.deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);

        if (!deletedSection) {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }

        res.status(200).send({ message: "Section deleted successfully!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Section not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Could not delete section with id ${req.params.id}`
        });
    }
};



section.getSectionsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Query the database for sections that match the category ID
        const sections = await Section.find({ category: categoryId }).populate('category');
        
        // Check if sections exist for the given category
        if (!sections || sections.length === 0) {
            return res.status(404).json({ message: 'No sections found for this category' });
        }

        // Return the sections
        res.status(200).json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ message: 'Error fetching sections', error });
    }
};

export default section