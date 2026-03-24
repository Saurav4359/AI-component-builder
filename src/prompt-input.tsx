import { useCallback, useState, type FormEvent } from "react";
import type { PromptInputProps } from "./types";

const EXAMPLE_PROMPTS = [
  "A dark pricing card with monthly/annual toggle",
  "A user profile card with avatar and social links",
  "A notification toast with progress bar",
  "A login form with email and password",
  "A testimonial card with star ratings",
  "A stats dashboard card with charts",
];

interface SidebarProps extends PromptInputProps {
  apiKey: string;
  onApiKeySave: (key: string) => void;
}

export const Sidebar = ({
  onGenerate,
  isLoading,
  apiKey,
  onApiKeySave,
}: SidebarProps) => {
  const [input, setInput] = useState("");
  const [keyvalue, setKeyValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!input.trim || isLoading) return;
      onGenerate(input.trim());
    },
    [input, onGenerate, isLoading],
  );

  const handleChipClick = useCallback(
    (promt: string) => {
      setInput(promt);
      if (!isLoading) onGenerate(promt);
    },
    [isLoading, onGenerate],
  );

  return (
    <>
      <aside className=" w-72 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0">
        {/* logo */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-linear-to-br from-violet-500 to-indigo-600 rounded-lg">
              <span className="font-semibold text-white text-sm">
                AI component builder
              </span>
            </div>
          </div>

          {/* api key  */}
          <div className="px-4 border-b border-gray-800">
            <label className="block text-xs font-medium text-gray-400">
              OPENAI API KEY
            </label>
            <div className="flex gap-1.5">
                <input type={showKey ? 'text' : 'password'} value={keyvalue} onChange={(e)=>setKeyValue(e.target.value)} placeholder="sk-..." className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus: ring-violet-500"/>
                <button onClick={()=> setShowKey(!showKey)} className="px-2 py-1.5 text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded-lg hover:text-white transition-colors">{showKey ? 'Hide' : 'Show'}</button>
                <button onClick={()=> {localStorage.setItem('openai_api_key',keyvalue); onApiKeySave(keyvalue)}} className="px-2.5">Save</button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
