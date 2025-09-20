'use client';

import { useState, useRef } from 'react';
import { useChat } from '@/hooks/use-chat';
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Send, 
  RotateCcw, 
  MessageSquare, 
  Image as ImageIcon,
  FileDown,
  Hospital,
  Activity
} from 'lucide-react';
import { ChatAction } from '@/lib/types/chat';

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        messages,
        isLoading,
        error,
        chatId,
        currentAnalysis,
        suggestions,
        sendMessage,
        sendMessageWithImage,
        startNewChat,
        clearChat,
        retryLastMessage,
        downloadReport,
        validateImageFile,
        createImagePreview,
        cleanupImagePreview
    } = useChat();

    const handleSendMessage = async () => {
        if (!message.trim() && !selectedImage) return;

        if (selectedImage) {
            await sendMessageWithImage(message || 'Please analyze this X-ray', selectedImage);
            handleClearImage();
        } else {
            await sendMessage(message);
        }
        
        setMessage('');
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validation = validateImageFile(file);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        setSelectedImage(file);
        const preview = createImagePreview(file);
        setImagePreview(preview);
    };

    const handleClearImage = () => {
        if (imagePreview) {
            cleanupImagePreview(imagePreview);
        }
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleActionClick = async (action: ChatAction) => {
        switch (action.type) {
            case 'generate_report':
                await sendMessage('Generate a detailed PDF report for my analysis');
                break;
            case 'find_hospitals':
                await sendMessage('Find orthopedic specialists near me');
                break;
            case 'ask_symptoms':
                await sendMessage('I would like to describe my symptoms');
                break;
            case 'second_opinion':
                await sendMessage('Can you provide a second analysis of my X-ray?');
                break;
            case 'upload_xray':
                fileInputRef.current?.click();
                break;
            case 'download_report':
                if (action.data?.report_id) {
                    await downloadReport(action.data.report_id, action.data.filename);
                } else {
                    alert('No report ID available for download');
                }
                break;
            case 'email_report':
                await sendMessage('Please email me the report');
                break;
            case 'share_report':
                if (action.data?.report_id) {
                    const shareUrl = `${window.location.origin}/api/reports/${action.data.report_id}/download`;
                    navigator.clipboard.writeText(shareUrl).then(() => {
                        alert('Report share link copied to clipboard!');
                    }).catch(() => {
                        alert(`Share link: ${shareUrl}`);
                    });
                } else {
                    await sendMessage('Get shareable link for the report');
                }
                break;
            case 'new_analysis':
                await startNewChat();
                break;
            default:
                await sendMessage(action.label);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setMessage(suggestion);
    };

    return (
        <div className="flex h-screen w-full bg-background">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="border-b p-4 bg-card">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="h-6 w-6 text-primary" />
                            <h1 className="text-xl font-semibold">OrthoAssist Chat</h1>
                            {chatId && (
                                <Badge variant="outline" className="text-xs">
                                    Session: {chatId.slice(0, 8)}
                                </Badge>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={startNewChat}
                                disabled={isLoading}
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                New Chat
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearChat}
                                disabled={isLoading}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <Alert className="m-4 border-destructive">
                        <AlertDescription>
                            {error}
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-2"
                                onClick={retryLastMessage}
                            >
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Retry
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <Card className={`max-w-[80%] ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                                <CardContent className="p-4">
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                    
                                    {/* Images */}
                                    {msg.images && msg.images.length > 0 && (
                                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {msg.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Analysis ${idx + 1}`}
                                                    className="rounded-lg max-w-full h-auto border"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Attachments */}
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.attachments.map((attachment, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 p-2 border rounded-lg bg-background/50"
                                                >
                                                    <FileDown className="h-4 w-4" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium">{attachment.name}</div>
                                                        {attachment.size && (
                                                            <div className="text-xs text-muted-foreground">
                                                                {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            // Extract report ID from URL
                                                            const reportIdMatch = attachment.url.match(/\/reports\/([^\/]+)\/download/);
                                                            if (reportIdMatch) {
                                                                downloadReport(reportIdMatch[1], attachment.name);
                                                            } else {
                                                                // Fallback: direct download
                                                                window.open(attachment.url, '_blank');
                                                            }
                                                        }}
                                                        disabled={isLoading}
                                                    >
                                                        <FileDown className="h-3 w-3 mr-1" />
                                                        Download
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Actions */}
                                    {msg.actions && msg.actions.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {msg.actions.map((action, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleActionClick(action)}
                                                    disabled={isLoading}
                                                    className="text-xs"
                                                >
                                                    {action.type === 'generate_report' && <FileDown className="h-3 w-3 mr-1" />}
                                                    {action.type === 'find_hospitals' && <Hospital className="h-3 w-3 mr-1" />}
                                                    {action.type === 'upload_xray' && <ImageIcon className="h-3 w-3 mr-1" />}
                                                    {action.label}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Loading indicator */}
                                    {msg.isLoading && (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                            Processing...
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-card">
                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4 relative inline-block">
                            <img
                                src={imagePreview}
                                alt="Selected X-ray"
                                className="max-w-32 max-h-32 rounded-lg border"
                            />
                            <Button
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                onClick={handleClearImage}
                            >
                                ×
                            </Button>
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={selectedImage ? "Describe your symptoms or ask questions about the X-ray..." : "Type your message or upload an X-ray image..."}
                                className="min-h-[60px] resize-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                                title="Upload X-ray image"
                            >
                                <Upload className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={handleSendMessage}
                                disabled={isLoading || (!message.trim() && !selectedImage)}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Suggestions */}
                    {suggestions.length > 0 && !isLoading && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {suggestions.map((suggestion, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs h-auto p-2"
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Analysis Sidebar */}
            {currentAnalysis && (
                <div className="w-80 border-l bg-card p-4 overflow-y-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Analysis Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {currentAnalysis.diagnosis && (
                                <div>
                                    <h4 className="font-medium mb-2">Diagnosis</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {currentAnalysis.diagnosis.primary_finding || 'No specific findings'}
                                    </p>
                                </div>
                            )}
                            
                            {currentAnalysis.triage && (
                                <div>
                                    <h4 className="font-medium mb-2">Triage Assessment</h4>
                                    <Badge 
                                        variant={
                                            currentAnalysis.triage.level === 'RED' ? 'destructive' :
                                            currentAnalysis.triage.level === 'AMBER' ? 'default' : 'secondary'
                                        }
                                        className="mb-2"
                                    >
                                        {currentAnalysis.triage.level} - {(currentAnalysis.triage.confidence * 100).toFixed(0)}%
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">
                                        {currentAnalysis.triage.recommendation}
                                    </p>
                                </div>
                            )}
                            
                            {currentAnalysis.body_part && (
                                <div>
                                    <h4 className="font-medium mb-2">Body Part</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {currentAnalysis.body_part}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}