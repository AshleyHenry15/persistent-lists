// persistent-lists.js
// Simple implementation for persistent task lists using localStorage

// The key for storing task states in localStorage
const STORAGE_KEY = 'quarto-persistent-tasks';

// Wait for the page to fully load
window.addEventListener('load', function() {
  // Initialize after a short delay to ensure Quarto has rendered everything
  setTimeout(initializePersistentTaskLists, 200);
});

// Initialize task lists persistence
function initializePersistentTaskLists() {
  console.log("Initializing persistent task lists");

  // Find all checkboxes in task lists
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  if (checkboxes.length === 0) {
    console.log("No checkboxes found on this page");
    return;
  }

  console.log(`Found ${checkboxes.length} checkboxes`);

  // Get saved states for this page
  const savedStates = getSavedStates();

  // Current states to track changes
  const currentStates = {};

  // Process each checkbox
  checkboxes.forEach((checkbox, index) => {
    // Create a unique ID for this checkbox
    const checkboxId = `checkbox-${index}`;

    // Restore saved state if available
    if (checkboxId in savedStates) {
      checkbox.checked = savedStates[checkboxId];
    }

    // Record initial state
    currentStates[checkboxId] = checkbox.checked;

    // Add event listener for changes
    checkbox.addEventListener('change', () => {
      currentStates[checkboxId] = checkbox.checked;
      saveStates(currentStates);
    });
  });

  // Save initial states
  saveStates(currentStates);
}

// Get the saved states for the current page
function getSavedStates() {
  try {
    // Get all saved data
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return {};
    }

    const allData = JSON.parse(savedData);

    // Get data for current page
    const currentPath = window.location.pathname;
    return allData[currentPath] || {};
  } catch (err) {
    console.error("Error retrieving saved task states:", err);
    return {};
  }
}

// Save the current states
function saveStates(states) {
  try {
    // Get existing data
    const savedData = localStorage.getItem(STORAGE_KEY) || '{}';
    const allData = JSON.parse(savedData);

    // Update for current page
    const currentPath = window.location.pathname;
    allData[currentPath] = states;

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    console.log("Saved task states for", currentPath);
  } catch (err) {
    console.error("Error saving task states:", err);
  }
}