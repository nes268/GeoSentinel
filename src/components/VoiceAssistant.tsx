import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Bot, User, Send, Settings } from 'lucide-react';

// Add TypeScript declarations for SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioEnabled?: boolean;
}

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  audioEnabled: boolean;
  recognition: any;
  synthesis: SpeechSynthesis | null;
}

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI mining safety assistant. I can help you check safety status, get risk assessments, review alerts, and answer questions about mining operations. How can I assist you today?',
      timestamp: new Date(),
      audioEnabled: true
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    audioEnabled: true,
    recognition: null,
    synthesis: null
  });

  const [language, setLanguage] = useState('en-US');

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'Hindi (हिन्दी)' },
    { code: 'ta-IN', name: 'Tamil (தமிழ்)' },
    { code: 'bn-IN', name: 'Bengali (বাংলা)' },
    { code: 'te-IN', name: 'Telugu (తెలుగు)' }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript, true);
      };

      recognition.onend = () => {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };

      setVoiceState(prev => ({ 
        ...prev, 
        recognition,
        synthesis: window.speechSynthesis 
      }));
    }
  }, [language]);

  const toggleListening = () => {
    if (voiceState.isListening) {
      voiceState.recognition?.stop();
    } else {
      voiceState.recognition?.start();
      setVoiceState(prev => ({ ...prev, isListening: true }));
    }
  };

  const toggleAudio = () => {
    setVoiceState(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
    if (voiceState.isSpeaking) {
      voiceState.synthesis?.cancel();
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    }
  };

  const speakMessage = (text: string) => {
    if (voiceState.audioEnabled && voiceState.synthesis) {
      voiceState.synthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: true }));
      };
      
      utterance.onend = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      };
      
      voiceState.synthesis.speak(utterance);
    }
  };

  const handleUserMessage = (content: string, fromVoice: boolean = false) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      audioEnabled: fromVoice
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response based on content
    setTimeout(() => {
      const response = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        audioEnabled: voiceState.audioEnabled
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (voiceState.audioEnabled) {
        speakMessage(response);
      }
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('risk') || input.includes('danger')) {
      return 'Current risk assessment shows Zone A at 75% probability of rockfall in the next 6 hours due to excessive rainfall and increased pore pressure. Zone B and C are at medium risk. I recommend evacuating Zone A immediately and increasing monitoring frequency.';
    }
    if (input.includes('alert') || input.includes('warning')) {
      return 'There are currently 3 active alerts: Critical ground vibration in Zone A, equipment temperature warning in Zone C, and rainfall threshold exceeded in Zone B. The most urgent requires immediate personnel evacuation.';
    }
    if (input.includes('sensor') || input.includes('data')) {
      return 'All 127 sensors are reporting normally with 99.2% uptime. Ground vibration sensors show 0.8mm/s, slope tilt at 2.4°, and pore pressure at 156kPa. Three sensors in Zone A are showing critical readings.';
    }
    if (input.includes('weather')) {
      return 'Current weather conditions: 24°C, 78% humidity, rainfall at 15mm/hr, wind speed 12km/h. Weather forecast indicates continued rainfall for the next 8 hours, which may increase slope instability risks.';
    }
    return 'I\'m here to help with mining safety operations. You can ask me about current risk levels, active alerts, sensor data, weather conditions, equipment status, or safety protocols. What specific information do you need?';
  };

  const quickActions = [
    'Hello, how are you?',
    'What can you help me with?',
    'Tell me a joke',
    'What\'s the weather like?',
    'What time is it?',
    'Help me with a task'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Voice AI Assistant</h1>
          <p className="text-gray-400">Conversational AI for mining safety and operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:border-cyan-500 transition-colors duration-300"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Bot className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">AI Assistant</h3>
                    <p className="text-sm text-gray-400">Mining operations and safety</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-cyan-500/20' 
                      : 'bg-purple-500/20'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-xl max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-cyan-500/20 text-cyan-100'
                        : 'bg-gray-700/50 text-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.audioEnabled && (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputMessage.trim() && handleUserMessage(inputMessage)}
                    placeholder="Type your message or use voice input..."
                    className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:border-cyan-500 transition-colors duration-300"
                  />
                  <button
                    onClick={() => inputMessage.trim() && handleUserMessage(inputMessage)}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleListening}
                    className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                      voiceState.isListening
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {voiceState.isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                      voiceState.audioEnabled
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    {voiceState.audioEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          {/* Voice Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Voice Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Speech Recognition</span>
                <div className={`w-2 h-2 rounded-full ${
                  voiceState.recognition ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Text-to-Speech</span>
                <div className={`w-2 h-2 rounded-full ${
                  voiceState.synthesis ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Audio Output</span>
                <div className={`w-2 h-2 rounded-full ${
                  voiceState.audioEnabled ? 'bg-green-400' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Listening</span>
                <div className={`w-2 h-2 rounded-full ${
                  voiceState.isListening ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleUserMessage(action)}
                  className="w-full text-left px-3 py-2 bg-gray-700/30 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 rounded-lg text-sm transition-all duration-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}