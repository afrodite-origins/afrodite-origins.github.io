// Configuração da telemetria do jogo e do relatorio.html.
// Enquanto url/anonKey estiverem vazios, os dados ficam só no navegador de quem jogou (localStorage).
window.AFRO_ANALYTICS = {
  provider: 'supabase',
  url: 'https://hmbsiwpqxeketyamsbsq.supabase.co',
  anonKey: 'sb_publishable_P5Io41ZULIv1Jt9QysG-VQ_k0Nzzotb',
  table: 'afrodite_sessions'
};
