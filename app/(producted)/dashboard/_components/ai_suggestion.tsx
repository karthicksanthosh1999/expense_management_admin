'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BotMessageSquare } from 'lucide-react';
import { motion } from "framer-motion";
import { useWeeklyAnalysisHook } from '../_hooks/ai-hook';
import AiSuggestionCardSkeleton from '@/components/loaders/AiCardSkalitonLoader';

const AiSuggestionCard = () => {
    const { data, isLoading } = useWeeklyAnalysisHook();

    return (
        <>
            <Card className="w-full h-80 overflow-y-auto ">
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
                <div className="p-4 text-white rounded-xl h-auto overflow-auto">
                    {isLoading ? (
                       <AiSuggestionCardSkeleton />
                    ) : (
                        <div className="space-y-3">
                        {data?.data
                            ?.split("\n")
                            ?.filter((line) => line.trim() !== "")
                            ?.map((line, index) => (
                            <div key={index} className="flex items-start gap-2"                            >
                                <span className="mt-1 text-green-400">
                                •
                                </span>

                                <p className="text-sm leading-6">
                                {line.replace(/\*/g, "")}
                                </p>
                            </div>
                            ))}
                        </div>
                    )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AiSuggestionCard
