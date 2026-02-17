import React from 'react';

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-display">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-glass-border bg-background-dark/80 backdrop-blur-md px-8 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">Universal MCP Bridge</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-primary text-sm font-semibold border-b-2 border-primary pb-1" href="#">Dashboard</a>
            <a className="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Registry</a>
            <a className="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Settings</a>
            <a className="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Documentation</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input 
              className="w-full bg-glass border-glass-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Search resources..." 
              type="text"
            />
          </div>
          <div className="pro-badge-gradient px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <span className="material-symbols-outlined text-[14px] text-black fill-1">workspace_premium</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-black">PRO Edition</span>
          </div>
          <div className="flex items-center gap-3 border-l border-glass-border pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">Alex Dev</p>
              <p className="text-[10px] text-primary/70 uppercase tracking-tighter">Maintainer</p>
            </div>
            <div 
              className="size-10 rounded-full border border-glass-border bg-cover bg-center overflow-hidden" 
              style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')" }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-8 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">dns</span>
                  <span className="text-xs text-white/40 font-medium">REAL-TIME</span>
                </div>
                <p className="text-white/60 text-sm font-medium">Total MCP Servers</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight">12</p>
                  <span className="text-primary text-xs font-bold pb-1 mb-1">+2 active</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">hub</span>
                  <span className="text-xs text-white/40 font-medium">LIVE</span>
                </div>
                <p className="text-white/60 text-sm font-medium">Active Clients</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight">4</p>
                  <span className="text-primary text-xs font-bold pb-1 mb-1">Peak Load</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">savings</span>
                  <span className="text-xs text-white/40 font-medium">LIFETIME</span>
                </div>
                <p className="text-white/60 text-sm font-medium">Token Savings</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight">4.2M</p>
                  <span className="text-green-400 text-xs font-bold pb-1 mb-1">+12.5%</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">cloud_sync</span>
                  <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded text-[10px] text-green-400 font-bold border border-green-500/20">
                    <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    SYNCED
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium">Cloud Sync Status</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight">Active</p>
                  <span className="text-white/40 text-xs font-bold pb-1 mb-1">Encrypted</span>
                </div>
              </div>
            </div>

            {/* Registry Explorer Section */}
            <section className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-glass-border flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="text-xl font-bold">Registry Explorer</h3>
                  <p className="text-sm text-white/40 mt-1">Manage and monitor connected MCP server nodes.</p>
                </div>
                <button className="bg-primary hover:bg-primary/80 text-background-dark font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Register Server
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 border-b border-glass-border">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/60">Server Name</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/60">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/60">Runtime</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/60">Version</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/60 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {/* Row 1 */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(13,242,242,0.6)]"></div>
                          <span className="font-semibold text-white">thought-graph</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded border border-primary/20">ACTIVE</span>
                      </td>
                      <td className="px-6 py-5 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">javascript</span>
                          Local Node.js
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <code className="text-xs bg-white/5 px-2 py-1 rounded text-primary/80">v1.2.0</code>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-white/40 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">Configure</button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(13,242,242,0.6)]"></div>
                          <span className="font-semibold text-white">context7</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded border border-primary/20">ACTIVE</span>
                      </td>
                      <td className="px-6 py-5 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">package_2</span>
                          NPX Runtime
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <code className="text-xs bg-white/5 px-2 py-1 rounded text-primary/80">v0.9.4</code>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-white/40 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">Configure</button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-white/5 transition-colors opacity-60">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-white/20"></div>
                          <span className="font-semibold text-white">github-mcp</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-white/5 text-white/40 text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase">Disabled</span>
                      </td>
                      <td className="px-6 py-5 text-white/40 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">terminal</span>
                          NPX Runtime
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <code className="text-xs bg-white/5 px-2 py-1 rounded text-white/40">v2.1.0</code>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-primary hover:text-primary/80 transition-colors font-bold text-xs uppercase tracking-widest">Enable</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-white/5 border-t border-glass-border flex justify-center">
                <button className="text-xs text-white/40 hover:text-white transition-colors">View All 12 Servers</button>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Security Center */}
            <div className="glass-card rounded-xl p-6 border-l-2 border-l-primary/40">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <h4 className="font-bold text-lg tracking-tight">Security Center</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-glass-border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white/60">KEYCHAIN STATUS</span>
                    <span className="material-symbols-outlined text-green-400 text-sm">lock</span>
                  </div>
                  <p className="text-sm font-semibold">Encrypted & Locked</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-glass-border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white/60">AUTH PROTOCOL</span>
                  </div>
                  <p className="text-sm font-semibold">OAuth 2.0 PKCE</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2 rounded-lg border border-primary/30 text-primary text-sm font-bold hover:bg-primary/5 transition-all">
                Manage Credentials
              </button>
            </div>

            {/* Discovery Insights */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">insights</span>
                <h4 className="font-bold text-lg tracking-tight">Discovery Insights</h4>
              </div>
              <div className="space-y-6">
                {/* Parity Item 1 */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white/60">GEMINI CLI PARITY</span>
                    <span className="text-primary">100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(13,242,242,0.4)] w-full"></div>
                  </div>
                </div>
                {/* Parity Item 2 */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white/60">CURSOR PARITY</span>
                    <span className="text-primary">100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(13,242,242,0.4)] w-full"></div>
                  </div>
                </div>
                {/* Parity Item 3 */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white/60">CLAUDE PARITY</span>
                    <span className="text-primary">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(13,242,242,0.4)] w-[85%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-glass-border">
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Universal Bridge uses predictive token modeling to optimize context windows for major LLM interfaces. 
                  <a className="text-primary hover:underline" href="#">Learn more.</a>
                </p>
              </div>
            </div>

            {/* Quick Support */}
            <div className="glass-card rounded-xl p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Pro Support Live</p>
                  <p className="text-[10px] text-primary/70">Estimated wait: 2 mins</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-glass-border mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© 2026 Universal MCP Bridge. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">API Status</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500"></div>
            <span>Cluster Region: US-EAST-1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
