import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900  px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-white/30 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-500/20 text-3xl">
            🔐
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Password <span className="text-indigo-400">Generator</span>
          </h1>

          <p className="mt-3 text-sm text-white">
            Create a strong password in seconds.
          </p>
        </div>

        {/* Password display */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white">
            Your password
          </label>

          <div className="flex overflow-hidden rounded-xl border border-white/10 bg-gray-950/70 p-1.5 focus-within:border-indigo-500">
            <input
              ref={passwordRef}
              type="text"
              value={password}
              readOnly
              aria-label="Generated password"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-sm tracking-wide text-indigo-300 outline-none sm:text-base"
            />

            <button
              onClick={copyPasswordToClipboard}
              disabled={!password}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500 active:scale-95 disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Password length */}
        <div className="mb-6 rounded-xl border border-white/10 bg-gray-950/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="length" className="font-medium text-white">
              Password length
            </label>

            <span className="rounded-lg bg-indigo-500/20 px-3 py-1 font-bold text-indigo-300">
              {length}
            </span>
          </div>

          <input
            id="length"
            type="range"
            min="8"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
          />

          <div className="mt-2 flex justify-between text-xs text-indigo-500">
            <span>8 characters</span>
            <span>50 characters</span>
          </div>
        </div>

        {/* Options */}
        <div className="mb-6 space-y-3">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-gray-950/70 p-4 transition hover:bg-white/10">
            <div>
              <p className="font-medium text-white">Include numbers</p>
              <p className="mt-1 text-xs text-indigo-400">
                Add digits from 0 to 9
              </p>
            </div>

            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-indigo-500"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-gray-950/70 p-4 transition hover:bg-white/10">
            <div>
              <p className="font-medium text-white">Include symbols</p>
              <p className="mt-1 text-xs text-indigo-400">
                Add special characters like @, #, and !
              </p>
            </div>

            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-indigo-500"
            />
          </label>
        </div>

        {/* Generate button */}
        <button
          onClick={passwordGenerator}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-indigo-900/30 transition hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]"
        >
          Generate New Password
          hello
        </button>

       
      </div>
    </div>
  );
}

export default App;
