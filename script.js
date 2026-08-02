function ajouter(val) { document.getElementById('ecran').value += val; }
function effacer() { document.getElementById('ecran').value = ''; }
function supprimer() { let v = document.getElementById('ecran').value; document.getElementById('ecran').value = v.slice(0,-1); }
function calculer() { 
  try { document.getElementById('ecran').value = eval(document.getElementById('ecran').value); } 
  catch { document.getElementById('ecran').value = 'Erreur'; } 
}
