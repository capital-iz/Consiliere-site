<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin Gateway | Consiliere</title>
        @vite(['resources/css/app.css'])
    </head>
    <body class="min-h-screen bg-[#05010a] text-slate-100 selection:bg-fuchsia-500 selection:text-white">
        <main class="min-h-screen flex items-center justify-center px-6">
            <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14">
                <p class="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4">Secure Access Node</p>
                <h1 class="text-4xl md:text-5xl font-black tracking-tight uppercase mb-6">Admin Gateway</h1>
                <p class="text-slate-300 leading-relaxed mb-8">
                    This production endpoint is intentionally locked. Use approved management credentials and internal infrastructure to continue.
                </p>
                <a href="/" class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-black uppercase tracking-wider hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500 hover:text-white transition-all">
                    Return To Site
                </a>
            </div>
        </main>
    </body>
</html>
