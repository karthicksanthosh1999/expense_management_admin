'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getMonthlyInsights } from '../_actions/monthly-Insights';
import { generateAIInsights } from '@/lib/models/ai_insight_model';
import { Separator } from '@/components/ui/separator';
import { BotMessageSquare } from 'lucide-react';
import { motion } from "framer-motion";

const AiSuggestionCard = async () => {
    const details = await getMonthlyInsights();
    const aiInsights = await generateAIInsights(details);

    let result = {
        ...details,
        aiInsights
    }

    return (
        <>
            <Card>
                <CardContent>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <h1 className="text-fontColor text-xl font-semibold">AI Insights</h1>

                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    filter: [
                                        "drop-shadow(0 0 4px rgba(99,102,241,0.6))",
                                        "drop-shadow(0 0 12px rgba(99,102,241,1))",
                                        "drop-shadow(0 0 4px rgba(99,102,241,0.6))",
                                    ],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <BotMessageSquare size={20} className="text-highlight" />
                            </motion.div>
                        </div>
                    </CardHeader>
                    <Separator className='my-2' />
                    <div className="p-4 text-white rounded-xl">
                        <pre className="text-sm whitespace-pre-wrap">
                            {result.aiInsights}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AiSuggestionCard
