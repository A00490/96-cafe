
import MenuItem from '../models/MenuItem.js'; // <-- FIX: Changed 'menuitem' to 'MenuItem'

export const getMenuItems = async (req, res) => {
  try {
    console.log('--- DIAGNOSTIC START ---');
    
    // 1. Test Model Existence
    if (!MenuItem) {
        console.error('ERROR: MenuItem Model is undefined! Check model import/export.');
        return res.status(500).json({ status: 'error', message: 'Model not defined' });
    }
    
    console.log('1. MenuItem Model verified.');

    // 2. Test Mongoose Query (The crash point)
    const items = await MenuItem.find();
    console.log(`2. Mongoose Query successful. Found ${items.length} items.`);

    // 3. Send Success Response
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items 
      }
    });

    console.log('3. Response sent successfully.');

  } catch (err) {
    // 4. Report the exact crash error to the server terminal
    console.error('FINAL CRASH ERROR in getMenuItems:', err.message, err.stack);
    
    // Send a generic error to the frontend
    res.status(500).json({
      status: 'error',
      message: 'Server failed to process menu request.'
    });
  }
};