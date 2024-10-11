import Usersubmission from '../models/LastSubmission.model.js'; // Adjust path as needed

// Function to save the new submission
const saveSubmission = async (req, res) => {
  const { userId, submissionType, data } = req.body;

  try {
    // Fetch the last submission for the user
    const lastSubmission = await Usersubmission.findOne({ userId }).sort({ submissionTime: -1 });

    // Get the current time and the last submission time
    const now = new Date();
    const threeMinutesAgo = new Date(now.getTime() - 3 * 60 * 1000);

    if (lastSubmission && lastSubmission.submissionTime >= threeMinutesAgo) {
      // If last submission is within 3 minutes, do not allow new submission
      return res.status(400).json({
        message: 'You can only submit once every 3 minutes. Please wait.'
      });
    }

    // Create a new submission
    const newSubmission = new Usersubmission({
      userId,
      submissionType,
      data
    });

    // Save the submission to the database
    await newSubmission.save();

    return res.status(201).json({
      message: 'Submission saved successfully!',
      submission: newSubmission
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default saveSubmission