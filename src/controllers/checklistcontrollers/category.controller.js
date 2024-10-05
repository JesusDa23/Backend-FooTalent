import Category from '../../models/checklistmodels/category.model.js';

const category = {}

// Create and Save a new Category
category.createCategory = async (req, res) => {
    try {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Category name cannot be empty"
            });
        }

        // Create a Category
        const category = new Category({
            name: req.body.name,
            description: req.body.description || ''
        });

        // Save Category in the database
        const savedCategory = await category.save();
        res.status(201).send(savedCategory);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Category."
        });
    }
};

// Retrieve all Categories from the database
category.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving categories."
        });
    }
};

// Find a single Category with an id
category.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).send({
                message: `Category not found with id ${req.params.id}`
            });
        }

        res.status(200).send(category);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Category not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error retrieving category with id ${req.params.id}`
        });
    }
};

// Update a Category identified by the id in the request
category.updateCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Category name cannot be empty"
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description || ''
            },
            { new: true }  // return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).send({
                message: `Category not found with id ${req.params.id}`
            });
        }

        res.status(200).send(updatedCategory);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Category not found with id ${req.params.id}`
            });
        }
        res.status(500).send({
            message: `Error updating category with id ${req.params.id}`
        });
    }
};

// Delete a category by ID
category.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error });
    }
  };
  


export default category