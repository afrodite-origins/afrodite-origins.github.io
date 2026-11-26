// Configuração da telemetria do jogo e do relatorio.html.
// Enquanto url/anonKey estiverem vazios, os dados ficam só no navegador de quem jogou (localStorage).
// Para juntar os dados de todos os amigos, crie um projeto gratuito no Supabase (veja o README)
// e preencha os dois campos abaixo com a "Project URL" e a chave "anon public".
window.AFRO_ANALYTICS = {
  provider: 'supabase',
  url: 'postgresql://postgres:[YOUR-DATABASE-PASSWORD]@db.hmbsiwpqxeketyamsbsq.supabase.co:5432/postgres',        // ex.: 'https://abcdxyz.supabase.co'
  anonKey: 'sb_publishable_P5Io41ZULIv1Jt9QysG-VQ_k0Nzzotb',    // chave "anon public" do projeto
  table: 'afrodite_sessions'
};
