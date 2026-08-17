import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  MessageSquare,
  UserPlus,
  Flame,
  Send,
  CheckCheck,
  Sparkles,
  Search,
  Image as ImageIcon,
  Mic,
  MicOff,
  Play,
  Pause,
  X,
  Paperclip,
  Volume2
} from "lucide-react";
import { Language, UserProfile, FriendUser } from "../types";
import { mockFriends } from "../data/mockData";

interface FriendsAndChatViewProps {
  language: Language;
  user: UserProfile;
}

interface ChatMessage {
  sender: "me" | "them";
  text?: string;
  imageUri?: string;
  voiceDuration?: string;
  type: "text" | "image" | "voice";
  time: string;
}

export const FriendsAndChatView: React.FC<FriendsAndChatViewProps> = ({ language, user }) => {
  const [activeFriend, setActiveFriend] = useState<FriendUser>(mockFriends[0]);
  const [messages, setMessages] = useState<{ [friendId: string]: ChatMessage[] }>({
    f1: [
      { sender: "them", text: "سڵاو برایم، پرسیاری ۱۲ی فیزیات شیکار کرد؟", type: "text", time: "10:14 AM" },
      { sender: "me", text: "بەڵێ شیکارم کرد، با بەیەکەوە لە 1vs1 پێداچوونەوەی بۆ بکەین!", type: "text", time: "10:16 AM" },
      {
        sender: "them",
        type: "voice",
        voiceDuration: "00:14",
        text: "دەنگی شیکارا پرسیارێ",
        time: "10:18 AM"
      }
    ],
    f2: [
      { sender: "them", text: "دەستت خۆش بێت بۆ نۆتەکان!", type: "text", time: "Yesterday" }
    ],
    f3: [
      { sender: "them", text: "وەرە 1vs1 چالنجی کیمیا بکەین!", type: "text", time: "2 hours ago" }
    ]
  });

  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Playing audio state
  const [playingMsgIndex, setPlayingMsgIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle timer for recording
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setRecordSeconds(0);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (selectedImage) {
      const newImageMsg: ChatMessage = {
        sender: "me",
        type: "image",
        imageUri: selectedImage,
        text: inputMessage.trim() || undefined,
        time: "Just now"
      };
      setMessages((prev) => ({
        ...prev,
        [activeFriend.id]: [...(prev[activeFriend.id] || []), newImageMsg]
      }));
      setSelectedImage(null);
      setInputMessage("");
      triggerAutoReply();
      return;
    }

    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      sender: "me",
      type: "text",
      text: inputMessage.trim(),
      time: "Just now"
    };

    setMessages((prev) => ({
      ...prev,
      [activeFriend.id]: [...(prev[activeFriend.id] || []), newMsg]
    }));
    setInputMessage("");
    triggerAutoReply();
  };

  const triggerAutoReply = () => {
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        sender: "them",
        type: "text",
        text:
          language === "badini"
            ? "دەستخۆش! پەیام و وێنە گەهشتن، بابە بەیەکەوە بخوینین."
            : language === "ku"
            ? "دەستت خۆش بێت! پەیامەکە گەیشت، با بەیەکەوە بخوێنین."
            : "Received! Let's study together.",
        time: "Just now"
      };
      setMessages((prev) => ({
        ...prev,
        [activeFriend.id]: [...(prev[activeFriend.id] || []), replyMsg]
      }));
    }, 1500);
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Voice Recording Toggle & Send
  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      // Stop & send voice message
      const formattedDuration = `00:${recordSeconds < 10 ? "0" : ""}${recordSeconds}`;
      setIsRecording(false);

      const voiceMsg: ChatMessage = {
        sender: "me",
        type: "voice",
        voiceDuration: formattedDuration,
        text: language === "badini" ? "پەیاما دەنگی" : "پەیامی دەنگی",
        time: "Just now"
      };

      setMessages((prev) => ({
        ...prev,
        [activeFriend.id]: [...(prev[activeFriend.id] || []), voiceMsg]
      }));

      triggerAutoReply();
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>
              {language === "badini" ? "هاڤاڵ و چاتی ڕاستەوخۆ" : language === "ku" ? "هاوڕێیان و چاتی خوێندن" : "Study Friends & Direct Chat"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {language === "badini" ? "کۆمەڵگەی چات، هنارتنا وێنە و دەنگی" : language === "ku" ? "گرووپی خوێندن و ناردنی دەنگ و وێنە" : "Direct Chat, Voice & Image Sharing"}
          </h1>
        </div>

        <button
          onClick={() => alert("Friend request link copied!")}
          className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">{language === "badini" ? "هاڤاڵان زێدە بکە" : language === "ku" ? "زیادکردنی هاوڕێ" : "Add Friends"}</span>
        </button>
      </div>

      {/* Main Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
        {/* Friends List Sidebar */}
        <div className="bg-[#16182e] border border-indigo-900/30 rounded-2xl p-4 flex flex-col space-y-3">
          <span className="text-xs font-bold text-slate-300 block">
            {language === "badini" ? "هاڤاڵێن چالاک:" : language === "ku" ? "هاوڕێیانی خوێندن:" : "Study Buddies:"}
          </span>

          <div className="space-y-2 overflow-y-auto flex-1">
            {mockFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => {
                  setActiveFriend(friend);
                  setSelectedImage(null);
                  setIsRecording(false);
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                  activeFriend.id === friend.id
                    ? "bg-purple-600/20 border-purple-500/50"
                    : "bg-[#101222] border-indigo-900/30 hover:border-purple-800/30"
                }`}
              >
                <div className="relative">
                  <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-xl object-cover" />
                  {friend.isOnline && (
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#16182e] absolute -bottom-0.5 -right-0.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{friend.name}</span>
                    <span className="text-[10px] text-amber-400 font-bold">Lvl {friend.level}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block">{friend.lastMessage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Box */}
        <div className="lg:col-span-2 bg-[#16182e] border border-indigo-900/30 rounded-2xl flex flex-col justify-between overflow-hidden">
          {/* Active Friend Header */}
          <div className="p-4 border-b border-indigo-900/30 bg-[#101222] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeFriend.avatar} alt={activeFriend.name} className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <span className="text-xs font-bold text-white block">{activeFriend.name} ({activeFriend.city})</span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {activeFriend.isOnline ? "Online • Active Now" : "Offline"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{activeFriend.streak} Day Streak</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-[#0e1021]">
            {(messages[activeFriend.id] || []).map((m, idx) => {
              const isMe = m.sender === "me";
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-xs sm:max-w-md text-xs font-medium leading-relaxed ${
                      isMe
                        ? "bg-purple-600 text-white rounded-tr-none shadow-md"
                        : "bg-[#1a1d36] text-slate-200 border border-indigo-900/30 rounded-tl-none"
                    }`}
                  >
                    {/* Render Image Message */}
                    {m.type === "image" && m.imageUri && (
                      <div className="space-y-2">
                        <img
                          src={m.imageUri}
                          alt="Uploaded attachment"
                          className="max-h-48 w-full object-cover rounded-xl border border-white/20"
                        />
                        {m.text && <p className="mt-1">{m.text}</p>}
                      </div>
                    )}

                    {/* Render Voice Message */}
                    {m.type === "voice" && (
                      <div className="flex items-center gap-3 py-1">
                        <button
                          onClick={() =>
                            setPlayingMsgIndex(playingMsgIndex === idx ? null : idx)
                          }
                          className={`p-2 rounded-full border ${
                            isMe
                              ? "bg-purple-700 text-white border-purple-400"
                              : "bg-indigo-950 text-purple-300 border-indigo-700"
                          }`}
                        >
                          {playingMsgIndex === idx ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </button>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-1">
                            {[40, 75, 30, 90, 60, 100, 45, 80, 50, 65, 35, 85].map((h, i) => (
                              <span
                                key={i}
                                className={`w-1 rounded-full transition-all ${
                                  playingMsgIndex === idx
                                    ? "bg-amber-300 animate-pulse"
                                    : isMe
                                    ? "bg-purple-300"
                                    : "bg-purple-400"
                                }`}
                                style={{ height: `${h}%`, minHeight: "8px" }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] opacity-80 font-mono block">
                            {m.voiceDuration || "00:15"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Render Text Message */}
                    {m.type === "text" && m.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1">{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* Selected Image Preview Area */}
          {selectedImage && (
            <div className="px-4 py-2 bg-[#121428] border-t border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover border border-purple-500/50"
                />
                <span className="text-xs text-purple-300 font-medium">
                  {language === "badini" ? "وێنە هاتیە هەڵبژارتن" : "وێنە هەڵبژێردراو"}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Voice Recording Active Bar */}
          {isRecording ? (
            <div className="p-3 bg-gradient-to-r from-rose-950/60 to-purple-950/60 border-t border-rose-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-300">
                  {language === "badini" ? "تۆمارکرنا دەنگی دچیتن..." : "تۆمارکردنی دەنگ..."} (00:
                  {recordSeconds < 10 ? "0" : ""}
                  {recordSeconds})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRecording(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  {language === "badini" ? "پاشگەزبوونەوە" : "پاشگەزبوونەوە"}
                </button>
                <button
                  onClick={handleToggleVoiceRecording}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === "badini" ? "هنارتن" : "ناردن"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Send Input Form */
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#101222] border-t border-indigo-900/30 flex items-center gap-2"
            >
              {/* Image Input Trigger */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-[#16182e] border border-indigo-900/40 text-slate-400 hover:text-purple-300 hover:border-purple-500/40 transition"
                title={language === "badini" ? "هنارتنا وێنەی" : "ناردنی وێنە"}
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              {/* Voice Record Trigger */}
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                className="p-2.5 rounded-xl bg-[#16182e] border border-indigo-900/40 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition"
                title={language === "badini" ? "تۆمارکرنا دەنگی" : "تۆمارکردنی دەنگ"}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  language === "badini" ? "پەیامەکێ بنڤیسە..." : "پەیامێک بنووسە..."
                }
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />

              {/* Send Button */}
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-md shadow-purple-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

