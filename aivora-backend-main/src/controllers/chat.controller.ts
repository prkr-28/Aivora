import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import config from '../config/env';
import { createFastModel } from '../ai/config/model.config';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatRequestBody {
    message?: string;
    history?: ChatMessage[];
}

// @desc    Chat with Aivora support assistant (Gemini)
// @route   POST /api/chat/support
// @access  Private
export const chatWithSupport = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { message, history }: ChatRequestBody = req.body || {};

    if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
    }

    if (!config.geminiApiKey) {
        res.status(500).json({ error: 'Gemini API key is not configured on the server' });
        return;
    }

    const model = createFastModel(0.3);

    const userName = req.user?.name || 'Aivora user';

    const systemPrompt = `You are Aivora's in-app AI assistant.\n\n` +
        `Your job is to help users understand and use the Aivora platform: ` +
        `goal creation, daily progress tracking, insights, reports, and general productivity guidance. ` +
        `Be concise, friendly, and actionable. When relevant, reference features like goals, progress, insights, and reports. ` +
        `If the user asks about something unrelated to Aivora or productivity, briefly answer and gently steer back to the app.`;

    const historyText = Array.isArray(history)
        ? history
            .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n')
        : '';

    const prompt = [
        systemPrompt,
        '',
        `Current user: ${userName}.`,
        historyText ? `\nConversation so far:\n${historyText}` : '',
        '\nUser question:',
        message,
    ]
        .filter(Boolean)
        .join('\n');

    const result = await model.invoke(prompt as any);

    const replyContent: unknown = (result as any)?.content ?? (result as any)?.text ?? result;

    const reply = typeof replyContent === 'string'
        ? replyContent.trim()
        : JSON.stringify(replyContent);

    res.json({ reply });
});
