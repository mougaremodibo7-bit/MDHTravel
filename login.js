const SUPABASE_URL='https://bhpscrmwsmcwmvapemxz.supabase.co';
const SUPABASE_KEY='sb_publishable_lj2RFmTiDKIMr7K-suRbCA_yOuLekl9';
let client;
document.addEventListener('DOMContentLoaded',()=>{
 client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
 document.querySelector('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault(); const f=e.currentTarget,m=document.querySelector('#loginMessage'),b=f.querySelector('button');
  b.disabled=true;b.textContent='Connexion...';m.textContent='';
  const {error}=await client.auth.signInWithPassword({email:f.email.value.trim(),password:f.password.value});
  if(error){m.textContent='Email ou mot de passe incorrect.';b.disabled=false;b.textContent='Se connecter';return;}
  const {data:profile,error:pe}=await client.from('profiles').select('role,full_name').eq('id',(await client.auth.getUser()).data.user.id).single();
  if(pe||!profile||!['admin','agent'].includes(profile.role)){await client.auth.signOut();m.textContent='Ce compte n’a pas accès à l’espace professionnel.';b.disabled=false;b.textContent='Se connecter';return;}
  location.href='admin.html';
 });
});