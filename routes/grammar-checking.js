import { Router } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import winston from "winston";

const router = Router();
const LANGUAGE_TOOL_URL = 'https://languagetool.org/api/v2/check';

router.use(bodyParser.json());

router.post('/check-grammar', async (req, res) => {
    const { text, language } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Checking grammar for:', text);
    try {
        // Use form data for the request
        const params = new URLSearchParams();
        params.append('text', text);
        params.append('language', language || 'en-US');

        const response = await axios.post(LANGUAGE_TOOL_URL, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(`Response: ${JSON.stringify(response.data)}`);
        res.status(200).json({
            originalText: text,
            grammarErrors: response.data.matches, // Errors found by the API
        });
    } catch (error) {
        winston.error(error);
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error checking grammar' });
    }
});

export default router;
