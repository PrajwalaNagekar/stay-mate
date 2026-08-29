"use client";

export default function SplashScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="absolute h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative h-64 w-64">
          {/* Orbit */}
          <svg
            className="absolute inset-0 h-full w-full animate-spin-slow"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="128"
              cy="128"
              r="96"
              stroke="rgba(129, 140, 248, 0.25)"
              strokeWidth="1"
              strokeDasharray="5 8"
            />

            <circle
              cx="128"
              cy="128"
              r="78"
              stroke="rgba(129, 140, 248, 0.12)"
              strokeWidth="1"
            />

            {/* Orbiting dot */}
            <circle
              cx="128"
              cy="32"
              r="5"
              fill="#818cf8"
            />
          </svg>

          {/* Main logo */}
          <svg
            className="absolute inset-0 h-full w-full animate-logo"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="staymateGradient"
                x1="65"
                y1="60"
                x2="190"
                y2="205"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Left person */}
            <circle
              cx="91"
              cy="78"
              r="19"
              fill="url(#staymateGradient)"
            />

            {/* Right person */}
            <circle
              cx="165"
              cy="78"
              r="19"
              fill="url(#staymateGradient)"
            />

            {/* StayMate M */}
            <path
              d="M66 165V111C66 103 76 99 82 105L128 150L174 105C180 99 190 103 190 111V165"
              stroke="url(#staymateGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center connection */}
            <path
              d="M91 126L128 161L165 126"
              stroke="url(#staymateGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div className="mt-2 animate-fade-up text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-white">Stay</span>
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Mate
            </span>
          </h1>

          <p className="mt-3 text-sm tracking-[0.25em] text-slate-400 uppercase">
            Connect. Share. Stay Together.
          </p>
        </div>

        {/* Loading bar */}
        <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full origin-left animate-loading rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes logoPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.04);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-logo {
          animation: logoPulse 2s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }

        .animate-loading {
          animation: loading 4s linear forwards;
        }
      `}</style>
    </div>
  );
}