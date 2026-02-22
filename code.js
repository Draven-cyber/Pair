// api/code.js
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get number from query parameters
    const { number } = req.query;
    
    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    // Clean the number (remove non-digits)
    const cleanNumber = number.replace(/[^0-9]/g, '');
    
    if (cleanNumber.length < 10) {
        return res.status(400).json({ 
            error: 'Invalid number format. Must be at least 10 digits.' 
        });
    }

    // Simulate processing delay (like connecting to WhatsApp)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a random 8-character pairing code (like WhatsApp Web)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Format as WhatsApp pairing code (e.g., "ABCD-EFGH")
    const formattedCode = `${code.slice(0, 4)}-${code.slice(4, 8)}`;

    // In a real implementation, you would:
    // 1. Connect to WhatsApp Web API
    // 2. Send pairing request to the number
    // 3. Get actual code from WhatsApp

    return res.status(200).json({ 
        success: true,
        code: formattedCode,
        number: cleanNumber,
        message: 'Use this code in WhatsApp to pair your device',
        timestamp: new Date().toISOString()
    });
      }
