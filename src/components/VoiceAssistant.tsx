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

interface LanguageContent {
  greeting: string;
  quickActions: string[];
  responses: {
    risk: string;
    alert: string;
    sensor: string;
    weather: string;
    default: string;
    hello: string;
    help: string;
    joke: string;
    time: string;
    task: string;
  };
}

export default function VoiceAssistant() {
  const [language, setLanguage] = useState('en-US');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    audioEnabled: true,
    recognition: null,
    synthesis: null
  });

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'Hindi (हिन्दी)' },
    { code: 'ta-IN', name: 'Tamil (தமிழ்)' },
    { code: 'bn-IN', name: 'Bengali (বাংলা)' },
    { code: 'te-IN', name: 'Telugu (తెలుగు)' }
  ];

  const languageContent: Record<string, LanguageContent> = {
    'en-US': {
      greeting: 'Hello! I\'m your AI mining safety assistant. I can help you check safety status, get risk assessments, review alerts, and answer questions about mining operations. How can I assist you today?',
      quickActions: [
        'Hello, how are you?',
        'What can you help me with?',
        'Tell me a joke',
        'What\'s the weather like?',
        'What time is it?',
        'Help me with a task'
      ],
      responses: {
        risk: 'Current risk assessment shows Zone A at 75% probability of rockfall in the next 6 hours due to excessive rainfall and increased pore pressure. Zone B and C are at medium risk. I recommend evacuating Zone A immediately and increasing monitoring frequency.',
        alert: 'There are currently 3 active alerts: Critical ground vibration in Zone A, equipment temperature warning in Zone C, and rainfall threshold exceeded in Zone B. The most urgent requires immediate personnel evacuation.',
        sensor: 'All 127 sensors are reporting normally with 99.2% uptime. Ground vibration sensors show 0.8mm/s, slope tilt at 2.4°, and pore pressure at 156kPa. Three sensors in Zone A are showing critical readings.',
        weather: 'Current weather conditions: 24°C, 78% humidity, rainfall at 15mm/hr, wind speed 12km/h. Weather forecast indicates continued rainfall for the next 8 hours, which may increase slope instability risks.',
        default: 'I\'m here to help with mining safety operations. You can ask me about current risk levels, active alerts, sensor data, weather conditions, equipment status, or safety protocols. What specific information do you need?',
        hello: 'Hello! I\'m doing great and ready to assist you with mining safety operations. How are you today?',
        help: 'I can help you with: 1) Risk assessments and safety monitoring, 2) Real-time alert management, 3) Sensor data analysis, 4) Weather condition updates, 5) Equipment status checks, 6) Safety protocol guidance. What would you like to know?',
        joke: 'Why don\'t miners ever get lost? Because they always know which way is down! But seriously, safety always comes first in mining operations.',
        time: `The current time is ${new Date().toLocaleTimeString('en-US')}. Remember to check shift schedules and safety briefing times regularly.`,
        task: 'I\'d be happy to help you with any mining safety task. Could you please specify what you need assistance with? I can help with safety checks, risk analysis, or operational guidance.'
      }
    },
    'hi-IN': {
      greeting: 'नमस्ते! मैं आपका AI खनन सुरक्षा सहायक हूँ। मैं सुरक्षा स्थिति जांचने, जोखिम मूल्यांकन प्राप्त करने, अलर्ट की समीक्षा करने और खनन संचालन के बारे में प्रश्नों का उत्तर देने में आपकी सहायता कर सकता हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?',
      quickActions: [
        'नमस्ते, आप कैसे हैं?',
        'आप मेरी किस प्रकार सहायता कर सकते हैं?',
        'मुझे एक चुटकुला सुनाइए',
        'मौसम कैसा है?',
        'अभी कितना समय हुआ है?',
        'किसी कार्य में मेरी सहायता करें'
      ],
      responses: {
        risk: 'वर्तमान जोखिम मूल्यांकन दिखाता है कि अत्यधिक बारिश और बढ़े हुए पोर दबाव के कारण अगले 6 घंटों में ज़ोन A में भूस्खलन की 75% संभावना है। ज़ोन B और C मध्यम जोखिम में हैं। मैं तुरंत ज़ोन A को खाली करने और निगरानी की आवृत्ति बढ़ाने की सिफारिश करता हूँ।',
        alert: 'वर्तमान में 3 सक्रिय अलर्ट हैं: ज़ोन A में गंभीर भूकंपन, ज़ोन C में उपकरण तापमान चेतावनी, और ज़ोन B में वर्षा सीमा पार। सबसे तत्काल कर्मचारियों को तुरंत निकालने की आवश्यकता है।',
        sensor: 'सभी 127 सेंसर 99.2% अपटाइम के साथ सामान्य रूप से रिपोर्ट कर रहे हैं। भूकंपन सेंसर 0.8mm/s दिखा रहे हैं, ढलान झुकाव 2.4°, और पोर दबाव 156kPa है। ज़ोन A के तीन सेंसर गंभीर रीडिंग दिखा रहे हैं।',
        weather: 'वर्तमान मौसम की स्थिति: 24°C, 78% आर्द्रता, 15mm/hr वर्षा, हवा की गति 12km/h। मौसम पूर्वानुमान अगले 8 घंटों तक निरंतर बारिश का संकेत देता है, जो ढलान अस्थिरता जोखिम बढ़ा सकता है।',
        default: 'मैं खनन सुरक्षा संचालन में सहायता के लिए यहाँ हूँ। आप मुझसे वर्तमान जोखिम स्तर, सक्रिय अलर्ट, सेंसर डेटा, मौसम की स्थिति, उपकरण स्थिति, या सुरक्षा प्रोटोकॉल के बारे में पूछ सकते हैं। आपको कौन सी विशिष्ट जानकारी चाहिए?',
        hello: 'नमस्ते! मैं बहुत अच्छा हूँ और खनन सुरक्षा संचालन में आपकी सहायता के लिए तैयार हूँ। आज आप कैसे हैं?',
        help: 'मैं आपकी इन कामों में सहायता कर सकता हूँ: 1) जोखिम मूल्यांकन और सुरक्षा निगरानी, 2) वास्तविक समय अलर्ट प्रबंधन, 3) सेंसर डेटा विश्लेषण, 4) मौसम स्थिति अपडेट, 5) उपकरण स्थिति जांच, 6) सुरक्षा प्रोटोकॉल मार्गदर्शन। आप क्या जानना चाहेंगे?',
        joke: 'खनिक कभी भटकते क्यों नहीं हैं? क्योंकि वे हमेशा जानते हैं कि नीचे कौन सा रास्ता है! लेकिन गंभीरता से, खनन संचालन में सुरक्षा हमेशा पहले आती है।',
        time: `वर्तमान समय ${new Date().toLocaleTimeString('hi-IN')} है। नियमित रूप से शिफ्ट शेड्यूल और सुरक्षा ब्रीफिंग समय की जांच करना याद रखें।`,
        task: 'मुझे किसी भी खनन सुरक्षा कार्य में आपकी सहायता करने में खुशी होगी। कृपया बताएं कि आपको किस चीज़ में सहायता चाहिए? मैं सुरक्षा जांच, जोखिम विश्लेषण, या परिचालन मार्गदर्शन में मदद कर सकता हूँ।'
      }
    },
    'ta-IN': {
      greeting: 'வணக்கம்! நான் உங்கள் AI சுரங்க பாதுகாப்பு உதவியாளர். நான் பாதுகாப்பு நிலையை சரிபார்க்க, ஆபத்து மதிப்பீடுகளைப் பெற, எச்சரிக்கைகளை மதிப்பாய்வு செய்ய மற்றும் சுரங்க நடவடிக்கைகள் பற்றிய கேள்விகளுக்கு பதிலளிக்க உதவ முடியும். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
      quickActions: [
        'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?',
        'நீங்கள் எனக்கு எவ்வாறு உதவ முடியும்?',
        'எனக்கு ஒரு நகைச்சுவை சொல்லுங்கள்',
        'வானிலை எப்படி இருக்கிறது?',
        'இப்போது என்ன நேரம்?',
        'ஒரு பணியில் எனக்கு உதவுங்கள்'
      ],
      responses: {
        risk: 'தற்போதைய ஆபத்து மதிப்பீடு அதிகப்படியான மழை மற்றும் அதிகரித்த துளை அழுத்தம் காரணமாக அடுத்த 6 மணி நேரத்தில் மண்டலம் A இல் பாறை விழுவதற்கான 75% வாய்ப்பை காட்டுகிறது. மண்டலம் B மற்றும் C நடுத்தர ஆபத்தில் உள்ளன. நான் உடனடியாக மண்டலம் A ஐ வெளியேற்றி கண்காணிப்பு அதிர்வெண்ணை அதிகரிக்க பரிந்துரைக்கிறேன்.',
        alert: 'தற்போது 3 செயலில் உள்ள எச்சரிக்கைகள் உள்ளன: மண்டலம் A இல் கடுமையான நில அதிர்வு, மண்டலம் C இல் உபகரண வெப்பநிலை எச்சரிக்கை, மற்றும் மண்டலம் B இல் மழைப்பொழிவு வரம்பு மீறப்பட்டது. மிகவும் அவசரமானது உடனடி பணியாளர் வெளியேற்றம் தேவைப்படுகிறது.',
        sensor: 'அனைத்து 127 சென்சார்களும் 99.2% அப்டைம் உடன் சாதாரணமாக அறிக்கை செய்கின்றன. நில அதிர்வு சென்சார்கள் 0.8mm/s, சாய்வு சாய்வு 2.4°, மற்றும் துளை அழுத்தம் 156kPa ஐ காட்டுகின்றன. மண்டலம் A இல் மூன்று சென்சார்கள் முக்கியமான அளவீடுகளை காட்டுகின்றன.',
        weather: 'தற்போதைய வானிலை நிலைமைகள்: 24°C, 78% ஈரப்பதம், 15mm/hr மழைப்பொழிவு, காற்றின் வேகம் 12km/h. வானிலை முன்னறிவிப்பு அடுத்த 8 மணி நேரத்திற்கு தொடர்ந்து மழையைக் குறிக்கிறது, இது சாய்வு நிலையற்ற தன்மை ஆபத்தை அதிகரிக்கலாம்.',
        default: 'நான் சுரங்க பாதுகாப்பு நடவடிக்கைகளில் உதவ இங்கே இருக்கிறேன். நீங்கள் தற்போதைய ஆபத்து நிலைகள், செயலில் உள்ள எச்சரிக்கைகள், சென்சார் தரவு, வானிலை நிலைமைகள், உபகரண நிலை, அல்லது பாதுகாப்பு நெறிமுறைகள் பற்றி என்னிடம் கேட்கலாம். உங்களுக்கு என்ன குறிப்பிட்ட தகவல் தேவை?',
        hello: 'வணக்கம்! நான் நன்றாக இருக்கிறேன் மற்றும் சுரங்க பாதுகாப்பு நடவடிக்கைகளில் உங்களுக்கு உதவ தயாராக இருக்கிறேன். இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?',
        help: 'நான் உங்களுக்கு இவற்றில் உதவ முடியும்: 1) ஆபத்து மதிப்பீடுகள் மற்றும் பாதுகாப்பு கண்காணிப்பு, 2) நிகழ்நேர எச்சரிக்கை மேலாண்மை, 3) சென்சார் தரவு பகுப்பாய்வு, 4) வானிலை நிலைமை புதுப்பிப்புகள், 5) உபகரண நிலை சரிபார்ப்புகள், 6) பாதுகாப்பு நெறிமுறை வழிகாட்டுதல். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?',
        joke: 'சுரங்கத் தொழிலாளர்கள் ஏன் தொலைந்து போவதில்லை? ஏனென்றால் கீழே போகும் வழி எது என்று அவர்களுக்கு எப்போதும் தெரியும்! ஆனால் தீவிரமாக, சுரங்க நடவடிக்கைகளில் பாதுகாப்பு எப்போதும் முதலில் வருகிறது.',
        time: `தற்போதைய நேரம் ${new Date().toLocaleTimeString('ta-IN')} ஆகும். மாற்று அட்டவணைகள் மற்றும் பாதுகாப்பு விளக்க நேரங்களை தவறாமல் சரிபார்க்க நினைவில் கொள்ளுங்கள்.`,
        task: 'எந்த சுரங்க பாதுகாப்பு பணியிலும் உங்களுக்கு உதவ நான் மகிழ்ச்சியடைவேன். உங்களுக்கு என்ன உதவி தேவை என்று குறிப்பிடுங்கள்? நான் பாதுகாப்பு சரிபார்ப்புகள், ஆபத்து பகுப்பாய்வு, அல்லது செயல்பாட்டு வழிகாட்டுதலில் உதவ முடியும்.'
      }
    },
    'bn-IN': {
      greeting: 'নমস্কার! আমি আপনার AI খনন নিরাপত্তা সহায়ক। আমি নিরাপত্তার অবস্থা পরীক্ষা করতে, ঝুঁকি মূল্যায়ন পেতে, সতর্কতা পর্যালোচনা করতে এবং খনন কার্যক্রম সম্পর্কে প্রশ্নের উত্তর দিতে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
      quickActions: [
        'নমস্কার, আপনি কেমন আছেন?',
        'আপনি আমাকে কীভাবে সাহায্য করতে পারেন?',
        'আমাকে একটি রসিকতা বলুন',
        'আবহাওয়া কেমন?',
        'এখন কয়টা বাজে?',
        'একটি কাজে আমাকে সাহায্য করুন'
      ],
      responses: {
        risk: 'বর্তমান ঝুঁকি মূল্যায়ন দেখাচ্ছে যে অতিরিক্ত বৃষ্টিপাত এবং বৃদ্ধি পাওয়া ছিদ্র চাপের কারণে পরবর্তী ৬ ঘন্টায় অঞ্চল A তে পাথর পড়ার ৭৫% সম্ভাবনা রয়েছে। অঞ্চল B এবং C মাঝারি ঝুঁকিতে রয়েছে। আমি অবিলম্বে অঞ্চল A খালি করার এবং পর্যবেক্ষণের ফ্রিকোয়েন্সি বৃদ্ধির সুপারিশ করি।',
        alert: 'বর্তমানে ৩টি সক্রিয় সতর্কতা রয়েছে: অঞ্চল A তে গুরুতর ভূমিকম্পন, অঞ্চল C তে সরঞ্জাম তাপমাত্রা সতর্কতা, এবং অঞ্চল B তে বৃষ্টিপাতের সীমা অতিক্রম। সবচেয়ে জরুরি অবিলম্বে কর্মীদের সরিয়ে নেওয়া প্রয়োজন।',
        sensor: 'সমস্ত ১২৭টি সেন্সর ৯৯.২% আপটাইম সহ স্বাভাবিকভাবে রিপোর্ট করছে। ভূমিকম্পন সেন্সরগুলি ০.৮mm/s দেখাচ্ছে, ঢাল কাত ২.৪°, এবং ছিদ্র চাপ ১৫৬kPa। অঞ্চল A এর তিনটি সেন্সর সংকটজনক রিডিং দেখাচ্ছে।',
        weather: 'বর্তমান আবহাওয়ার অবস্থা: ২৪°C, ৭৮% আর্দ্রতা, ১৫mm/hr বৃষ্টিপাত, বাতাসের গতি ১২km/h। আবহাওয়ার পূর্বাভাস পরবর্তী ৮ ঘন্টা অব্যাহত বৃষ্টিপাতের ইঙ্গিত দেয়, যা ঢাল অস্থিরতার ঝুঁকি বৃদ্ধি করতে পারে।',
        default: 'আমি খনন নিরাপত্তা কার্যক্রমে সাহায্য করার জন্য এখানে আছি। আপনি বর্তমান ঝুঁকির স্তর, সক্রিয় সতর্কতা, সেন্সর ডেটা, আবহাওয়ার অবস্থা, সরঞ্জামের অবস্থা, বা নিরাপত্তা প্রোটোকল সম্পর্কে আমাকে জিজ্ঞাসা করতে পারেন। আপনার কোন নির্দিষ্ট তথ্যের প্রয়োজন?',
        hello: 'নমস্কার! আমি খুব ভাল আছি এবং খনন নিরাপত্তা কার্যক্রমে আপনাকে সহায়তা করার জন্য প্রস্তুত। আজ আপনি কেমন আছেন?',
        help: 'আমি আপনাকে এইসব বিষয়ে সাহায্য করতে পারি: ১) ঝুঁকি মূল্যায়ন এবং নিরাপত্তা পর্যবেক্ষণ, ২) রিয়েল-টাইম সতর্কতা ব্যবস্থাপনা, ৩) সেন্সর ডেটা বিশ্লেষণ, ৪) আবহাওয়ার অবস্থা আপডেট, ৫) সরঞ্জামের অবস্থা পরীক্ষা, ৬) নিরাপত্তা প্রোটোকল গাইডেন্স। আপনি কী জানতে চান?',
        joke: 'খনিশ্রমিকরা কেন কখনো হারিয়ে যায় না? কারণ তারা সর্বদা জানে নিচের দিকে কোন পথ! কিন্তু গুরুত্ব সহকারে, খনন কার্যক্রমে নিরাপত্তা সর্বদা প্রথমে আসে।',
        time: `বর্তমান সময় ${new Date().toLocaleTimeString('bn-IN')}। নিয়মিত শিফট সূচি এবং নিরাপত্তা ব্রিফিং সময় পরীক্ষা করতে মনে রাখবেন।`,
        task: 'যেকোনো খনন নিরাপত্তা কাজে আপনাকে সাহায্য করতে আমি খুশি হব। আপনার কী সাহায্য প্রয়োজন তা দয়া করে নির্দিষ্ট করুন? আমি নিরাপত্তা পরীক্ষা, ঝুঁকি বিশ্লেষণ, বা অপারেশনাল গাইডেন্সে সাহায্য করতে পারি।'
      }
    },
    'te-IN': {
      greeting: 'నమస్కారం! నేను మీ AI మైనింగ్ సేఫ్టీ అసిస్టెంట్. నేను భద్రతా స్థితిని తనిఖీ చేయడం, రిస్క్ అసెస్మెంట్లు పొందడం, అలర్ట్లను సమీక్షించడం మరియు మైనింగ్ ఆపరేషన్ల గురించి ప్రశ్నలకు సమాధానాలు ఇవ్వడంలో మీకు సహాయపడగలను. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?',
      quickActions: [
        'నమస్కారం, మీరు ఎలా ఉన్నారు?',
        'మీరు నాకు ఎలా సహాయపడగలరు?',
        'నాకు ఒక జోక్ చెప్పండి',
        'వాతావరణం ఎలా ఉంది?',
        'ఇప్పుడు ఎంత సమయం?',
        'ఒక పనిలో నాకు సహాయపడండి'
      ],
      responses: {
        risk: 'ప్రస్తుత రిస్క్ అసెస్మెంట్ అధిక వర్షపాతం మరియు పెరిగిన పోర్ ప్రెషర్ కారణంగా తదుపరి 6 గంటల్లో జోన్ A లో రాక్‌ఫాల్ 75% సంభావ్యతను చూపిస్తోంది. జోన్ B మరియు C మధ్యస్థ ప్రమాదంలో ఉన్నాయి. జోన్ A ను వెంటనే ఖాళీ చేయాలని మరియు మానిటరింగ్ ఫ్రీక్వెన్సీని పెంచాలని నేను సిఫార్సు చేస్తున్నాను.',
        alert: 'ప్రస్తుతం 3 యాక్టివ్ అలర్ట్లు ఉన్నాయి: జోన్ A లో క్రిటికల్ గ్రౌండ్ వైబ్రేషన్, జోన్ C లో ఈక్విప్మెంట్ టెంపరేచర్ వార్నింగ్, మరియు జోన్ B లో రెయిన్‌ఫాల్ థ్రెషోల్డ్ మించిపోయింది. అత్యంత అత్యవసరమైనది వెంటనే సిబ్బందిని ఎవాక్యుయేషన్ చేయాల్సిన అవసరం.',
        sensor: 'మొత్తం 127 సెన్సర్లు 99.2% అప్‌టైమ్‌తో సాధారణంగా రిపోర్ట్ చేస్తున్నాయి. గ్రౌండ్ వైబ్రేషన్ సెన్సర్లు 0.8mm/s చూపిస్తున్నాయి, స్లోప్ టిల్ట్ 2.4°, మరియు పోర్ ప్రెషర్ 156kPa. జోన్ A లో మూడు సెన్సర్లు క్రిటికల్ రీడింగ్లు చూపిస్తున్నాయి.',
        weather: 'ప్రస్తుత వాతావరణ పరిస్థితులు: 24°C, 78% హ్యూమిడిటీ, 15mm/hr వర్షపాతం, గాలి వేగం 12km/h. వాతావరణ అంచనా తదుపరి 8 గంటలపాటు నిరంతర వర్షపాతాన్ని సూచిస్తోంది, ఇది స్లోప్ అస్థిరత ప్రమాదాలను పెంచవచ్చు.',
        default: 'నేను మైనింగ్ సేఫ్టీ ఆపరేషన్లలో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు ప్రస్తుత రిస్క్ లెవెల్స్, యాక్టివ్ అలర్ట్లు, సెన్సర్ డేటా, వాతావరణ పరిస్థితులు, ఈక్విప్మెంట్ స్టేటస్, లేదా సేఫ్టీ ప్రోటోకాల్స్ గురించి నన్ను అడగవచ్చు. మీకు ఏ నిర్దిష్ట సమాచారం కావాలి?',
        hello: 'నమస్కారం! నేను చాలా బాగున్నాను మరియు మైనింగ్ సేఫ్టీ ఆపరేషన్లలో మీకు సహాయపడటానికి సిద్ధంగా ఉన్నాను. ఈరోజు మీరు ఎలా ఉన్నారు?',
        help: 'నేను ఈ విషయాలలో మీకు సహాయపడగలను: 1) రిస్క్ అసెస్మెంట్లు మరియు సేఫ్టీ మానిటరింగ్, 2) రియల్-టైమ్ అలర్ట్ మేనేజ్మెంట్, 3) సెన్సర్ డేటా అనాలిసిస్, 4) వాతావరణ పరిస్థితుల అప్‌డేట్లు, 5) ఈక్విప్మెంట్ స్టేటస్ చెక్లు, 6) సేఫ్టీ ప్రోటోకాల్ గైడెన్స్. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
        joke: 'మైనర్లు ఎందుకు ఎప్పుడూ దారి తప్పరు? ఎందుకంటే కిందికి ఏ దారి అని వారికి ఎల్లప్పుడూ తెలుసు! కానీ సీరియస్‌గా చెప్పాలంటే, మైనింగ్ ఆపరేషన్లలో సేఫ్టీ ఎల్లప్పుడూ మొదట వస్తుంది.',
        time: `ప్రస్తుత సమయం ${new Date().toLocaleTimeString('te-IN')}. షిఫ్ట్ షెడ్యూల్స్ మరియు సేఫ్టీ బ్రీఫింగ్ టైమ్స్‌ను క్రమం తప్పకుండా చెక్ చేయడాన్ని గుర్తుంచుకోండి.`,
        task: 'ఏదైనా మైనింగ్ సేఫ్టీ టాస్క్‌లో మీకు సహాయపడటంలో నేను సంతోషిస్తాను. మీకు ఏ విషయంలో సహాయం కావాలో దయచేసి స్పెసిఫై చేయండి? నేను సేఫ్టీ చెక్లు, రిస్క్ అనాలిసిస్, లేదా ఆపరేషనల్ గైడెన్స్‌లో సహాయపడగలను.'
      }
    }
  };

  // Initialize messages with greeting based on current language
  useEffect(() => {
    const greeting: Message = {
      id: '1',
      type: 'assistant',
      content: languageContent[language].greeting,
      timestamp: new Date(),
      audioEnabled: true
    };
    setMessages([greeting]);
  }, [language]);

  // Initialize speech recognition and synthesis with language update
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

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
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
      if (voiceState.recognition) {
        voiceState.recognition.lang = language; // Update language before starting
        voiceState.recognition.start();
        setVoiceState(prev => ({ ...prev, isListening: true }));
      }
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
      
      // Get available voices for the selected language
      const voices = voiceState.synthesis.getVoices();
      const languageVoice = voices.find(voice => voice.lang.startsWith(language.split('-')[0]));
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
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

    // Simulate AI response based on content and language
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
    const currentLangContent = languageContent[language].responses;
    
    // Check for different patterns in multiple languages
    const patterns = {
      risk: ['risk', 'danger', 'ঝুঁকি', 'खतरा', 'जोखिम', 'ஆபத்து', 'రిస్క్', 'प्रमाद'],
      alert: ['alert', 'warning', 'सतर्कता', 'चेतावनी', 'সতর্কতা', 'எச்சரிக்கை', 'అలర్ట్'],
      sensor: ['sensor', 'data', 'सेंसर', 'डेटा', 'সেন্সর', 'তথ্য', 'சென்சார்', 'డేటా', 'सेन्सर'],
      weather: ['weather', 'मौसम', 'আবহাওয়া', 'வானிলை', 'వాతావరణ'],
      hello: ['hello', 'hi', 'नमस्ते', 'नमस्कार', 'வணக்கம்', 'হ্যালো', 'నమస্కార'],
      help: ['help', 'assist', 'सहायता', 'সাহায্য', 'உதவி', 'సహాయం'],
      joke: ['joke', 'funny', 'हंसी', 'মজা', 'நகைச்சுवை', 'జోక్'],
      time: ['time', 'समय', 'সময়', 'நேரம்', 'సమయం'],
      task: ['task', 'work', 'काम', 'কাজ', 'வேலை', 'పని']
    };
    
    for (const [key, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return currentLangContent[key as keyof typeof currentLangContent];
      }
    }
    
    return currentLangContent.default;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    // Stop any ongoing speech
    if (voiceState.isSpeaking) {
      voiceState.synthesis?.cancel();
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    }
    
    // Stop listening if active
    if (voiceState.isListening) {
      voiceState.recognition?.stop();
    }
  };

  const quickActions = languageContent[language].quickActions;

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
            onChange={handleLanguageChange}
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