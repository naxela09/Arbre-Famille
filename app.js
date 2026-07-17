const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// ---------- Les quatre branches familiales ----------
// Generation 4 = les grands-parents (point de départ). Les ancêtres plus
// anciens reçoivent des numéros plus petits (3, 2, 1...) pour apparaître
// au-dessus dans l'arbre. Les descendants recevraient 5, 6, 7...
// Les champs vides (null / "") sont à compléter au fur et à mesure.
// ---------- Les quatre branches familiales (données GEDCOM, 6 générations d'ancêtres) ----------
// generation 7 = le/la grand-parent (racine). Les ancêtres plus anciens ont un numéro plus
// petit (6, 5, 4...) et apparaissent plus haut dans l'arbre. estFratrie=true = frère/sœur
// d'un ancêtre direct : visible uniquement dans la fiche personne, jamais dans le diagramme.
// ---------- Les quatre branches familiales (données GEDCOM, 6 générations d'ancêtres) ----------
// generation 7 = le/la grand-parent (racine). Les ancêtres plus anciens ont un numéro plus
// petit (6, 5, 4...) et apparaissent plus haut dans l'arbre. estFratrie=true = frère/sœur
// d'un ancêtre direct : visible uniquement dans la fiche personne, jamais dans le diagramme.
// ---------- Les quatre branches familiales (données GEDCOM, 6 générations d'ancêtres) ----------
// generation 7 = le/la grand-parent (racine). Les ancêtres plus anciens ont un numéro plus
// petit (6, 5, 4...) et apparaissent plus haut dans l'arbre. estFratrie=true = frère/sœur
// d'un ancêtre direct : visible uniquement dans la fiche personne, jamais dans le diagramme.
// domiciles est une LISTE (une personne peut avoir déménagé plusieurs fois).
// ---------- Les quatre branches familiales (données GEDCOM, 6 générations d'ancêtres) ----------
// generation 7 = le/la grand-parent (racine). Les ancêtres plus anciens ont un numéro plus
// petit (6, 5, 4...) et apparaissent plus haut dans l'arbre. estFratrie=true = frère/sœur
// d'un ancêtre direct : visible uniquement dans la fiche personne, jamais dans le diagramme.
// naissance/deces ont un champ 'date' (complet, pour la fiche) et 'annee' (pour le titre/l'arbre).
const ARBRES = {
  bareau: {
    nom: "Bareau",
    description: "Branche paternelle — grand-père — 62 personnes en ligne directe",
    personnes: [{
      id: "I500007",
      prenom: "André Alain",
      nom: "BAREAU",
      generation: 6,
      partnerId: null,
      pereId: "I500008",
      mereId: "I500009",
      estFratrie: false,
      naissance: {
        date: "26 septembre 1910",
        annee: 1910,
        lieu: "Rennes, Ille-Et-Vilaine, Bretagne, France"
      },
      deces: {
        date: "1 mars 2005",
        annee: 2005,
        lieu: "La Teste-De-Buch, Gironde, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "Ingénieur, école centrale",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }, {
        date: "1931",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }, {
        date: "1936",
        lieu: "Parc de Montsouris, 14e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: {
        date: "14 septembre 1937",
        lieu: "Paris 14ème"
      },
      remarque: ""
    }, {
      id: "I500009",
      prenom: "Aline Alexandrine",
      nom: "DUBOURG",
      generation: 5,
      partnerId: "I500008",
      pereId: "I500055",
      mereId: "I500056",
      estFratrie: false,
      naissance: {
        date: "2 janvier 1878",
        annee: 1878,
        lieu: "Plougonven, Finistère, Bretagne, France"
      },
      deces: {
        date: "29 juillet 1945",
        annee: 1945,
        lieu: "Rennes, Ille-Et-Vilaine, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Institutrice",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }, {
        date: "1931",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }],
      mariage: {
        date: "3 décembre 1907",
        lieu: "Combourg (35)"
      },
      remarque: ""
    }, {
      id: "I500056",
      prenom: "Aline Louise",
      nom: "LE TROADEC",
      generation: 4,
      partnerId: "I500055",
      pereId: "I500744",
      mereId: "I500719",
      estFratrie: false,
      naissance: {
        date: "26 avril 1844",
        annee: 1844,
        lieu: "Pontrieux, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "8 janvier 1895",
        annee: 1895,
        lieu: "Saint Malo (35)",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "10 juillet 1867",
        lieu: "Plougonver (22)"
      },
      remarque: ""
    }, {
      id: "I500719",
      prenom: "Aline Caroline",
      nom: "(nom inconnu)",
      generation: 3,
      partnerId: "I500744",
      pereId: "I500786",
      mereId: "I500787",
      estFratrie: false,
      naissance: {
        date: "21 août 1815",
        annee: 1815,
        lieu: "Gonesse, Val-D'oise, Île-De-France, France"
      },
      deces: {
        date: "2 octobre 1888",
        annee: 1888,
        lieu: "22216, 22, Côtes d'Armor, France, Plougonver",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 novembre 1836",
        lieu: "Plougonver, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500787",
      prenom: "Marguerite Antoinette",
      nom: "VOISY",
      generation: 2,
      partnerId: "I500786",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500786",
      prenom: "Joseph Allain",
      nom: "THORAVAL",
      generation: 2,
      partnerId: "I500787",
      pereId: "I501289",
      mereId: "I501290",
      estFratrie: false,
      naissance: {
        date: "14 novembre 1786",
        annee: 1786,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501290",
      prenom: "Marie Louise",
      nom: "GARRIN",
      generation: 1,
      partnerId: "I501289",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1 septembre 1752",
        annee: 1752,
        lieu: "Plussulien, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "24 juin 1828",
        annee: 1828,
        lieu: "Saint-Nicolas-Du-Pélem, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juin 1785",
        lieu: "Saint-Igeaux, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I501289",
      prenom: "Allain",
      nom: "THORAVAL",
      generation: 1,
      partnerId: "I501290",
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: false,
      naissance: {
        date: "22 juillet 1753",
        annee: 1753,
        lieu: "Kerpert, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "12 mars 1824",
        annee: 1824,
        lieu: "Saint-Nicolas-Du-Pélem, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juin 1785",
        lieu: "Saint-Igeaux, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I501410",
      prenom: "Françoise",
      nom: "SERANDOUR",
      generation: 0,
      partnerId: "I501409",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1710",
        annee: 1710,
        lieu: ""
      },
      deces: {
        date: "6 mars 1781",
        annee: 1781,
        lieu: "Kerpert, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 février 1727",
        lieu: "Kerpert, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I501409",
      prenom: "Jean",
      nom: "THORAVAL",
      generation: 0,
      partnerId: "I501410",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "5 mars 1702",
        annee: 1702,
        lieu: "Saint-Nicolas-Du-Pélem, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "10 avril 1761",
        annee: 1761,
        lieu: "Kerpert, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 février 1727",
        lieu: "Kerpert, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500744",
      prenom: "Guillaume Marie",
      nom: "LE TROADEC",
      generation: 3,
      partnerId: "I500719",
      pereId: "I500828",
      mereId: "I500829",
      estFratrie: false,
      naissance: {
        date: "25 novembre 1795",
        annee: 1795,
        lieu: "Pontrieux, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "28 août 1845",
        annee: 1845,
        lieu: "Pontrieux, Côtes-d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Négociant, marchand de vins en gros",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 novembre 1836",
        lieu: "Plougonver, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500829",
      prenom: "Marie Catherine",
      nom: "LE JUIF",
      generation: 2,
      partnerId: "I500828",
      pereId: "I500902",
      mereId: "I500903",
      estFratrie: false,
      naissance: {
        date: "vers 1768",
        annee: 1768,
        lieu: "Pontrieux, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "21 août 1836",
        annee: 1836,
        lieu: "Bégard , 22140 , Bretagne , France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juillet 1788",
        lieu: "Pontrieux, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500903",
      prenom: "Catherine",
      nom: "LABASQUE",
      generation: 1,
      partnerId: "I500902",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500902",
      prenom: "Yves",
      nom: "LE JUIF (Le Guideo)",
      generation: 1,
      partnerId: "I500903",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "22 août 1742",
        annee: 1742,
        lieu: "Pontrieux,22260,Côtes-d'Armor,Bretagne,FRANCE"
      },
      deces: {
        date: "18 juillet 1786",
        annee: 1786,
        lieu: "Pontrieux,22260,Côtes-d'Armor,Bretagne,FRANCE, Notre-Dame-des-Fontaines",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500828",
      prenom: "Joseph",
      nom: "LE TROADEC",
      generation: 2,
      partnerId: "I500829",
      pereId: "I500900",
      mereId: "I500901",
      estFratrie: false,
      naissance: {
        date: "10 avril 1766",
        annee: 1766,
        lieu: "Pleudaniel , 22740 , Bretagne , France"
      },
      deces: {
        date: "17 avril 1829",
        annee: 1829,
        lieu: "Bégard , 22140 , Bretagne , France",
        cimetiere: ""
      },
      profession: {
        metier: "Instituteur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juillet 1788",
        lieu: "Pontrieux, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500901",
      prenom: "Marie Gabrielle",
      nom: "LE VAILLANT",
      generation: 1,
      partnerId: "I500900",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "16 août 1731",
        annee: 1731,
        lieu: "Pleudaniel, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "18 septembre 1785",
        annee: 1785,
        lieu: "Pleudaniel, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1761",
        lieu: "Pleumeur-Gautier, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500900",
      prenom: "Guillaume",
      nom: "LE TROADEC",
      generation: 1,
      partnerId: "I500901",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1728",
        annee: 1728,
        lieu: ""
      },
      deces: {
        date: "28 juin 1792",
        annee: 1792,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1761",
        lieu: "Pleumeur-Gautier, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500055",
      prenom: "Alexandre Guillaume Marie",
      nom: "DUBOURG",
      generation: 4,
      partnerId: "I500056",
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: false,
      naissance: {
        date: "5 février 1844",
        annee: 1844,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "6 juillet 1905",
        annee: 1905,
        lieu: "22387, 22, Côtes d'Armor, France, Le Vieux-Marché",
        cimetiere: ""
      },
      profession: {
        metier: "Commerçant à Plougonver",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "10 juillet 1867",
        lieu: "Plougonver (22)"
      },
      remarque: ""
    }, {
      id: "I500063",
      prenom: "Joséphine",
      nom: "DOUENNE",
      generation: 3,
      partnerId: "I500062",
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: false,
      naissance: {
        date: "7 mars 1815",
        annee: 1815,
        lieu: "Trédrez-Locquémeau, Côtes-D'armor, Brittany, France"
      },
      deces: {
        date: "30 juillet 1900",
        annee: 1900,
        lieu: "Loguivy-Plougras, Càotes D'armor, Bretagne, France",
        cimetiere: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France"
      },
      profession: {
        metier: "Aubergiste",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 novembre 1841",
        lieu: "Morlaix, Finistère, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500466",
      prenom: "Renée",
      nom: "LE MEAU",
      generation: 2,
      partnerId: "I500465",
      pereId: "I500898",
      mereId: "I500899",
      estFratrie: false,
      naissance: {
        date: "23 septembre 1793",
        annee: 1793,
        lieu: "Pleumeur Bodou, 22560, Côtes d'Armor, Bretagne, FRANCE"
      },
      deces: {
        date: "9 mars 1852",
        annee: 1852,
        lieu: "Guimaëc, 29620, Finistère, Bretagne, FRANCE, décédée à son domicile : lieu de Sébastien Coquin",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 janvier 1812",
        lieu: "Brélévenez, Côtes D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500899",
      prenom: "Françoise",
      nom: "LE MERRER",
      generation: 1,
      partnerId: "I500898",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "5 juillet 1772",
        annee: 1772,
        lieu: "Pleumeur-Bodou, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 novembre 1792",
        lieu: "Pleumeur-Bodou, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500898",
      prenom: "Jean",
      nom: "LE MAU",
      generation: 1,
      partnerId: "I500899",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 juin 1770",
        annee: 1770,
        lieu: "Trébeurden, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "Meunier, Cultivateur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 novembre 1792",
        lieu: "Pleumeur-Bodou, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500465",
      prenom: "Nicolas",
      nom: "DOUENNE",
      generation: 2,
      partnerId: "I500466",
      pereId: "I500467",
      mereId: "I500468",
      estFratrie: false,
      naissance: {
        date: "22 septembre 1787",
        annee: 1787,
        lieu: "Pleumeur Bodou, 22560, Côtes d'Armor, Bretagne, FRANCE, village de Ker Yvon"
      },
      deces: {
        date: "14 mars 1861",
        annee: 1861,
        lieu: "Guimaëc, 29620, Finistère, Bretagne, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 janvier 1812",
        lieu: "Brélévenez, Côtes D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500468",
      prenom: "Anne Annette",
      nom: "LEMEUR",
      generation: 1,
      partnerId: "I500467",
      pereId: "I500937",
      mereId: "I500938",
      estFratrie: false,
      naissance: {
        date: "18 novembre 1766",
        annee: 1766,
        lieu: "Lannion Brélévenez, 22300, Côtes d'Armor, Bretagne, FRANCE"
      },
      deces: {
        date: "4 novembre 1850",
        annee: 1850,
        lieu: "Guimaëc, Finistère, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "6 novembre 1786",
        lieu: "Perros Guirec, 22700, Côtes d'Armor, Bretagne, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500938",
      prenom: "Marie",
      nom: "LE COZIC /Le Coffic",
      generation: 0,
      partnerId: "I500937",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500937",
      prenom: "Pierre",
      nom: "LEMEUR",
      generation: 0,
      partnerId: "I500938",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500467",
      prenom: "Nicolas Pancrace ( La Grandeur)",
      nom: "DOUENNE",
      generation: 1,
      partnerId: "I500468",
      pereId: "I500826",
      mereId: "I500827",
      estFratrie: false,
      naissance: {
        date: "20 août 1752",
        annee: 1752,
        lieu: "Montigny-Lencoup, Seine-Et-Marne, Île-De-France, France"
      },
      deces: {
        date: "16 février 1830",
        annee: 1830,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "EMPLOYE AUX FERMES DU ROY AU POSTE DE KER YVON",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "6 novembre 1786",
        lieu: "Perros Guirec, 22700, Côtes d'Armor, Bretagne, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500827",
      prenom: "Geneviève",
      nom: "BERTIN",
      generation: 0,
      partnerId: "I500826",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "16 janvier 1727",
        annee: 1727,
        lieu: "Montigny-Lencoup, Seine-Et-Marne, Île-De-France, France"
      },
      deces: {
        date: "4 mai 1771",
        annee: 1771,
        lieu: "Montigny-Lencoup, Seine-Et-Marne, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juin 1751",
        lieu: "Montigny-Lencoup, Seine-Et-Marne, Île-De-France, France"
      },
      remarque: ""
    }, {
      id: "I500826",
      prenom: "Pancrace",
      nom: "DOUENNE",
      generation: 0,
      partnerId: "I500827",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "12 octobre 1719",
        annee: 1719,
        lieu: "Gurcy-Le-Châtel, Seine-Et-Marne, Île-De-France, France"
      },
      deces: {
        date: "19 février 1792",
        annee: 1792,
        lieu: "Montigny-Lencoup 77520 Seine-et-Marne Île-de-France France, 77520, Seine-et-Marne, Île-de-France, FRANCE",
        cimetiere: "Montigny-Lencoup 77520 Seine-et-Marne Île-de-France France, 77520, Seine-et-Marne, Île-de-France, FRANCE"
      },
      profession: {
        metier: "manoeuvre",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 juin 1751",
        lieu: "Montigny-Lencoup, Seine-Et-Marne, Île-De-France, France"
      },
      remarque: ""
    }, {
      id: "I500062",
      prenom: "Guillaume",
      nom: "DUBOURG",
      generation: 3,
      partnerId: "I500063",
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: false,
      naissance: {
        date: "13 février 1813",
        annee: 1813,
        lieu: "Doudauville, France"
      },
      deces: {
        date: "5 janvier 1856",
        annee: 1856,
        lieu: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Couvreur d'ardoise",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 novembre 1841",
        lieu: "Morlaix, Finistère, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500093",
      prenom: "Françoise",
      nom: "LE GUEN",
      generation: 2,
      partnerId: "I500092",
      pereId: "I500094",
      mereId: "I500095",
      estFratrie: false,
      naissance: {
        date: "25 octobre 1793",
        annee: 1793,
        lieu: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France"
      },
      deces: {
        date: "7 mars 1895",
        annee: 1895,
        lieu: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 janvier 1812",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500095",
      prenom: "Antoinette",
      nom: "DERRIEN",
      generation: 1,
      partnerId: "I500094",
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: false,
      naissance: {
        date: "21 avril 1768",
        annee: 1768,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "4 novembre 1803",
        annee: 1803,
        lieu: "Loguivy Plougras, Bretagne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "31 janvier 1792",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500914",
      prenom: "Marie Mathurine",
      nom: "LE GALL",
      generation: 0,
      partnerId: "I500913",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "8 février 1739",
        annee: 1739,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "25 octobre 1798",
        annee: 1798,
        lieu: "Loguivy Plougras, Bretagne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "21 janvier 1764",
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      remarque: ""
    }, {
      id: "I500913",
      prenom: "Ollivier",
      nom: "DERRIEN",
      generation: 0,
      partnerId: "I500914",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "14 avril 1733",
        annee: 1733,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "26 janvier 1780",
        annee: 1780,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "21 janvier 1764",
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      remarque: ""
    }, {
      id: "I500094",
      prenom: "Toussaint",
      nom: "LE GUEN",
      generation: 1,
      partnerId: "I500095",
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: false,
      naissance: {
        date: "18 janvier 1763",
        annee: 1763,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "29 janvier 1822",
        annee: 1822,
        lieu: "LOGUIVY PLOUGRAS",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "31 janvier 1792",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500891",
      prenom: "Anne",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: "I500890",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "13 novembre 1733",
        annee: 1733,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "5 août 1821",
        annee: 1821,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 février 1759",
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500890",
      prenom: "Guillaume",
      nom: "LE GUEN",
      generation: 0,
      partnerId: "I500891",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 juillet 1729",
        annee: 1729,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "12 avril 1803",
        annee: 1803,
        lieu: "Toulanden À Loguivy Plougras, Bretagne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 février 1759",
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500092",
      prenom: "Guillaume",
      nom: "DUBOURG",
      generation: 2,
      partnerId: "I500093",
      pereId: "I500096",
      mereId: "I500097",
      estFratrie: false,
      naissance: {
        date: "20 avril 1787",
        annee: 1787,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "8 avril 1844",
        annee: 1844,
        lieu: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Meunier à loguivy Plougras",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 janvier 1812",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500097",
      prenom: "Marie",
      nom: "BARGUEDAN",
      generation: 1,
      partnerId: "I500096",
      pereId: "I500884",
      mereId: "I500885",
      estFratrie: false,
      naissance: {
        date: "10 décembre 1759",
        annee: 1759,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "1787",
        annee: 1787,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 janvier 1778",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500885",
      prenom: "Catherine",
      nom: "KERRIEN",
      generation: 0,
      partnerId: "I500884",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "5 mai 1728",
        annee: 1728,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "11 novembre 1788",
        annee: 1788,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 février 1759",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500884",
      prenom: "Guillaume",
      nom: "BARGUEDAN",
      generation: 0,
      partnerId: "I500885",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "13 avril 1720",
        annee: 1720,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "30 janvier 1778",
        annee: 1778,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 février 1759",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500096",
      prenom: "Guillaume",
      nom: "DUBOURG",
      generation: 1,
      partnerId: "I500097",
      pereId: "I500104",
      mereId: "I500105",
      estFratrie: false,
      naissance: {
        date: "13 décembre 1747",
        annee: 1747,
        lieu: "Plougras, Côtes-d'Armor, Brittany, France"
      },
      deces: {
        date: "6 juillet 1818",
        annee: 1818,
        lieu: "Plougras, 22581, Côtes d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 janvier 1778",
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      remarque: ""
    }, {
      id: "I500105",
      prenom: "Guillemette",
      nom: "LE PERRON",
      generation: 0,
      partnerId: "I500104",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "17 mars 1722",
        annee: 1722,
        lieu: "Plougras"
      },
      deces: {
        date: "26 décembre 1747",
        annee: 1747,
        lieu: "Plougras",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 octobre 1746",
        lieu: "Plougras"
      },
      remarque: ""
    }, {
      id: "I500104",
      prenom: "François",
      nom: "DUBOURG",
      generation: 0,
      partnerId: "I500105",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 septembre 1723",
        annee: 1723,
        lieu: "Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "26 novembre 1797",
        annee: 1797,
        lieu: "Birac-sur-Trec, Lot-et-Garonne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 octobre 1746",
        lieu: "Plougras"
      },
      remarque: ""
    }, {
      id: "I500008",
      prenom: "Emile Adrien",
      nom: "BAREAU",
      generation: 5,
      partnerId: "I500009",
      pereId: "I500371",
      mereId: "I500372",
      estFratrie: false,
      naissance: {
        date: "3 mars 1868",
        annee: 1868,
        lieu: "Senillé, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "2 janvier 1947",
        annee: 1947,
        lieu: "Rennes, Ille-Et-Vilaine, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Garde d'Artillerie",
        lieu: ""
      },
      domiciles: [{
        date: "1931",
        lieu: "Boulevard Sébastopol à Rennes"
      }, {
        date: "1921",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }],
      mariage: {
        date: "3 décembre 1907",
        lieu: "Combourg (35)"
      },
      remarque: ""
    }, {
      id: "I500372",
      prenom: "Marie Célestine",
      nom: "SAULNIER",
      generation: 4,
      partnerId: "I500371",
      pereId: "I500457",
      mereId: "I500458",
      estFratrie: false,
      naissance: {
        date: "8 février 1842",
        annee: 1842,
        lieu: "Senillé, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "26 janvier 1915",
        annee: 1915,
        lieu: "Rennes, Ille-Et-Vilaine, Brittany, France",
        cimetiere: "Rennes, Cimetière de l'est"
      },
      profession: {
        metier: "Lingère",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 août 1864",
        lieu: "Senillé, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500458",
      prenom: "Marie",
      nom: "BERTON",
      generation: 3,
      partnerId: "I500457",
      pereId: "I500783",
      mereId: "I500782",
      estFratrie: false,
      naissance: {
        date: "1814",
        annee: 1814,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500782",
      prenom: "Marie",
      nom: "MOUNIER",
      generation: 2,
      partnerId: "I500783",
      pereId: "I500784",
      mereId: "I500785",
      estFratrie: false,
      naissance: {
        date: "21 novembre 1789",
        annee: 1789,
        lieu: "Senillé,86100,Vienne,Poitou-Charentes,FRANCE"
      },
      deces: null,
      profession: {
        metier: "Metayere",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500785",
      prenom: "Marie Jeanne",
      nom: "Doucet",
      generation: 1,
      partnerId: "I500784",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "18 mai 1779",
        lieu: "Senillé--Saint-André, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500784",
      prenom: "Antoine",
      nom: "Mounier",
      generation: 1,
      partnerId: "I500785",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "18 mai 1779",
        lieu: "Senillé--Saint-André, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500783",
      prenom: "Jean",
      nom: "BERTON",
      generation: 2,
      partnerId: "I500782",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1789",
        annee: 1789,
        lieu: ""
      },
      deces: {
        date: "30 mai 1826",
        annee: 1826,
        lieu: "Senillé,86100,Vienne,Poitou-Charentes,FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500457",
      prenom: "Jean",
      nom: "SAULNIER",
      generation: 3,
      partnerId: "I500458",
      pereId: "I500778",
      mereId: "I500779",
      estFratrie: false,
      naissance: {
        date: "12 mars 1812",
        annee: 1812,
        lieu: "Availles-En-Châtellerault, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "20 février 1865",
        annee: 1865,
        lieu: "Sénillé",
        cimetiere: ""
      },
      profession: {
        metier: "Cordonnier",
        lieu: ""
      },
      domiciles: [{
        date: "1856",
        lieu: "Sénillé, Vienne, Poitou-Charentes, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500779",
      prenom: "Marie",
      nom: "MÉNARD",
      generation: 2,
      partnerId: "I500778",
      pereId: "I500869",
      mereId: "I500870",
      estFratrie: false,
      naissance: {
        date: "17 septembre 1777",
        annee: 1777,
        lieu: "Pouthumé"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 juin 1801",
        lieu: "Châtellerault, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500870",
      prenom: "Marie",
      nom: "GARNIER",
      generation: 1,
      partnerId: "I500869",
      pereId: "I500872",
      mereId: "I500873",
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500873",
      prenom: "Magdelaine",
      nom: "PIRON",
      generation: 0,
      partnerId: "I500872",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500872",
      prenom: "Pierre",
      nom: "GARNIER",
      generation: 0,
      partnerId: "I500873",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500869",
      prenom: "Pierre",
      nom: "MÉNARD",
      generation: 1,
      partnerId: "I500870",
      pereId: "I500871",
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500871",
      prenom: "Jacques",
      nom: "MÉNARD",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500778",
      prenom: "Pierre",
      nom: "SAULNIER",
      generation: 2,
      partnerId: "I500779",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "17 octobre 1780",
        annee: 1780,
        lieu: "Availles-En-Châtellerault, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 juin 1801",
        lieu: "Châtellerault, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500371",
      prenom: "Louis Eugène",
      nom: "BAREAU",
      generation: 4,
      partnerId: "I500372",
      pereId: "I500373",
      mereId: "I500374",
      estFratrie: false,
      naissance: {
        date: "vers 1835",
        annee: 1835,
        lieu: ""
      },
      deces: {
        date: "13 février 1885",
        annee: 1885,
        lieu: "Châtellerault, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: "Rennes, Ille-Et-Vilaine, Brittany, France"
      },
      profession: {
        metier: "Armurier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 août 1864",
        lieu: "Senillé, Senillé-Saint-Sauveur, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500374",
      prenom: "Pauline",
      nom: "MITON",
      generation: 3,
      partnerId: "I500373",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1807",
        annee: 1807,
        lieu: "Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1856",
        lieu: "Château-Larcher, Vienne, Poitou-Charentes, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500373",
      prenom: "François",
      nom: "BAREAU",
      generation: 3,
      partnerId: "I500374",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1808",
        annee: 1808,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500210",
      prenom: "Françoise",
      nom: "Le Guen",
      generation: 2,
      partnerId: null,
      pereId: "I500094",
      mereId: "I500095",
      estFratrie: true,
      naissance: {
        date: "10 décembre 1794",
        annee: 1794,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500211",
      prenom: "Jeanne",
      nom: "Le Guen",
      generation: 2,
      partnerId: null,
      pereId: "I500094",
      mereId: "I500095",
      estFratrie: true,
      naissance: {
        date: "11 mars 1797",
        annee: 1797,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "22 juin 1797",
        annee: 1797,
        lieu: "Quellenec À Loguivy Plougras, Bretagne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500213",
      prenom: "Toussaint",
      nom: "Le Guen",
      generation: 2,
      partnerId: null,
      pereId: "I500094",
      mereId: "I500095",
      estFratrie: true,
      naissance: {
        date: "22 juin 1800",
        annee: 1800,
        lieu: "Lez-Leguer À Loguivy Plougras, Bretagne"
      },
      deces: {
        date: "27 avril 1801",
        annee: 1801,
        lieu: "Lez-Leguer À Loguivy Plougras, Bretagne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500723",
      prenom: "François",
      nom: "BAREAU",
      generation: 4,
      partnerId: null,
      pereId: "I500373",
      mereId: "I500374",
      estFratrie: true,
      naissance: {
        date: "29 août 1833",
        annee: 1833,
        lieu: "Targé, Châtellerault, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "6 octobre 1833",
        annee: 1833,
        lieu: "Targé, Châtellerault, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501614",
      prenom: "François",
      nom: "BAREAU",
      generation: 4,
      partnerId: null,
      pereId: "I500373",
      mereId: "I500374",
      estFratrie: true,
      naissance: {
        date: "vers 1838",
        annee: 1838,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500892",
      prenom: "Guillaume",
      nom: "LE GUEN",
      generation: 1,
      partnerId: null,
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: true,
      naissance: {
        date: "7 décembre 1759",
        annee: 1759,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500893",
      prenom: "Pierre",
      nom: "LE GUEN",
      generation: 1,
      partnerId: null,
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: true,
      naissance: {
        date: "2 mars 1761",
        annee: 1761,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500894",
      prenom: "Marguerite",
      nom: "LE GUEN",
      generation: 1,
      partnerId: null,
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: true,
      naissance: {
        date: "25 juillet 1765",
        annee: 1765,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500896",
      prenom: "Marie Anne",
      nom: "LE GUEN",
      generation: 1,
      partnerId: null,
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: true,
      naissance: {
        date: "9 février 1768",
        annee: 1768,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500965",
      prenom: "Yves",
      nom: "LE GUEN",
      generation: 1,
      partnerId: null,
      pereId: "I500890",
      mereId: "I500891",
      estFratrie: true,
      naissance: {
        date: "2 juin 1771",
        annee: 1771,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500064",
      prenom: "Auguste René Marie",
      nom: "DUBOURG",
      generation: 4,
      partnerId: null,
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: true,
      naissance: {
        date: "30 septembre 1842",
        annee: 1842,
        lieu: "Loguivy-Plougras, Càotes D'armor, Bretagne, France"
      },
      deces: {
        date: "20 septembre 1921",
        annee: 1921,
        lieu: "Rennes, Ille-Et-Vilaine, Brittany, France",
        cimetiere: ""
      },
      profession: {
        metier: "Prètre , Evêque de Moulins ,Archevêque de Rennes,Dol et St.Malo; Cardinal ( 1906 )",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500067",
      prenom: "Marie Perrine Anne Nathalie Joséphine",
      nom: "Dubourg",
      generation: 4,
      partnerId: null,
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: true,
      naissance: {
        date: "23 décembre 1846",
        annee: 1846,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "23 février 1928",
        annee: 1928,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "Hotelière Commerçante",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500066",
      prenom: "Marie-Reine",
      nom: "Dubourg",
      generation: 4,
      partnerId: null,
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: true,
      naissance: {
        date: "4 mai 1849",
        annee: 1849,
        lieu: "Loguivy-Plougras, 22780, Côtes d'Armor, Bretagne, France"
      },
      deces: {
        date: "1 mai 1931",
        annee: 1931,
        lieu: "Oguivy, Plougras, 22780, Côtes d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "Commerçante",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500068",
      prenom: "Jean Baptiste",
      nom: "Dubourg",
      generation: 4,
      partnerId: null,
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: true,
      naissance: {
        date: "11 septembre 1855",
        annee: 1855,
        lieu: "22780, 22, Côtes d'Armor, France, Loguivy-Plougras"
      },
      deces: {
        date: "23 avril 1883",
        annee: 1883,
        lieu: "22780, 22, Côtes d'Armor, France, Loguivy-Plougras",
        cimetiere: ""
      },
      profession: {
        metier: "Employé contrbutions directes au havres",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500065",
      prenom: "Joséphine",
      nom: "Dubourg",
      generation: 4,
      partnerId: null,
      pereId: "I500062",
      mereId: "I500063",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500960",
      prenom: "François",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "11 février 1731",
        annee: 1731,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "14 août 1732",
        annee: 1732,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500961",
      prenom: "Sébastien",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "26 février 1736",
        annee: 1736,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500962",
      prenom: "Marie",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "7 décembre 1738",
        annee: 1738,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "20 février 1739",
        annee: 1739,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500963",
      prenom: "Toussaint",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "9 mai 1740",
        annee: 1740,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500964",
      prenom: "Catherine",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "1 février 1743",
        annee: 1743,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500966",
      prenom: "Marguerite",
      nom: "LE LIRZIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500098",
      prenom: "Marie Françoise",
      nom: "DUBOURG",
      generation: 2,
      partnerId: null,
      pereId: "I500096",
      mereId: "I500097",
      estFratrie: true,
      naissance: {
        date: "23 septembre 1782",
        annee: 1782,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500099",
      prenom: "François",
      nom: "DUBOURG",
      generation: 2,
      partnerId: null,
      pereId: "I500096",
      mereId: "I500097",
      estFratrie: true,
      naissance: {
        date: "31 mai 1784",
        annee: 1784,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500012",
      prenom: "Yvonne Marie",
      nom: "Bareau",
      generation: 6,
      partnerId: null,
      pereId: "I500008",
      mereId: "I500009",
      estFratrie: true,
      naissance: {
        date: "1 octobre 1908",
        annee: 1908,
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      },
      deces: {
        date: "11 février 2008",
        annee: 2008,
        lieu: "Paris 7e Arrondissement, Paris, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "pharmacienne",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }, {
        date: "1931",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500011",
      prenom: "Alain",
      nom: "Bareau",
      generation: 6,
      partnerId: null,
      pereId: "I500008",
      mereId: "I500009",
      estFratrie: true,
      naissance: {
        date: "12 février 1912",
        annee: 1912,
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      },
      deces: {
        date: "19 février 1962",
        annee: 1962,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Médecin",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }, {
        date: "1931",
        lieu: "Rennes, Ille-et-Vilaine, Bretagne, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500868",
      prenom: "Adèle",
      nom: "SAULNIER",
      generation: 4,
      partnerId: null,
      pereId: "I500457",
      mereId: "I500458",
      estFratrie: true,
      naissance: {
        date: "27 septembre 1837",
        annee: 1837,
        lieu: "Senillé, Vienne, Poitou-Charentes, France"
      },
      deces: {
        date: "22 février 1861",
        annee: 1861,
        lieu: "Chatellerault, Vosges, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500777",
      prenom: "Louis Célestin",
      nom: "SAULNIER",
      generation: 4,
      partnerId: null,
      pereId: "I500457",
      mereId: "I500458",
      estFratrie: true,
      naissance: {
        date: "24 septembre 1850",
        annee: 1850,
        lieu: "Sénillé"
      },
      deces: null,
      profession: {
        metier: "Cordonnier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501413",
      prenom: "Marie",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501414",
      prenom: "Yvonne",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501415",
      prenom: "Françoise",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501416",
      prenom: "Guillaume",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501417",
      prenom: "Marguerite",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501418",
      prenom: "Jean",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501419",
      prenom: "Yves",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501420",
      prenom: "Rolland",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501421",
      prenom: "Jean",
      nom: "THORAVAL",
      generation: 1,
      partnerId: null,
      pereId: "I501409",
      mereId: "I501410",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500886",
      prenom: "Abel",
      nom: "BARGUEDAN",
      generation: 1,
      partnerId: null,
      pereId: "I500884",
      mereId: "I500885",
      estFratrie: true,
      naissance: {
        date: "3 avril 1762",
        annee: 1762,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "8 mai 1762",
        annee: 1762,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500887",
      prenom: "Guillaume",
      nom: "Bargueden",
      generation: 1,
      partnerId: null,
      pereId: "I500884",
      mereId: "I500885",
      estFratrie: true,
      naissance: {
        date: "31 juillet 1763",
        annee: 1763,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500888",
      prenom: "Marie Jeanne",
      nom: "Bargueden",
      generation: 1,
      partnerId: null,
      pereId: "I500884",
      mereId: "I500885",
      estFratrie: true,
      naissance: {
        date: "25 juin 1765",
        annee: 1765,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500917",
      prenom: "Ollivier",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "23 avril 1766",
        annee: 1766,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "5 mai 1766",
        annee: 1766,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500918",
      prenom: "Antoinette",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "26 avril 1767",
        annee: 1767,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "17 mai 1767",
        annee: 1767,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500919",
      prenom: "Marie Anne",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "21 octobre 1770",
        annee: 1770,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500920",
      prenom: "Ollivier",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "21 février 1773",
        annee: 1773,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500921",
      prenom: "Marie Françoise",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "21 novembre 1775",
        annee: 1775,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "20 février 1830",
        annee: 1830,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500922",
      prenom: "Anne",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "7 mai 1778",
        annee: 1778,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22"
      },
      deces: {
        date: "23 août 1786",
        annee: 1786,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500923",
      prenom: "Marie",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500924",
      prenom: "Marie Françoise",
      nom: "DERRIEN",
      generation: 1,
      partnerId: null,
      pereId: "I500913",
      mereId: "I500914",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "8 août 1786",
        annee: 1786,
        lieu: "Loguivy-Plougras, 22780, Côtes-d'Armor, Bretagne, FRANCE, 22",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500472",
      prenom: "Louis Marie Auguste",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "10 novembre 1816",
        annee: 1816,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500473",
      prenom: "Olive Antoinette",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "13 août 1818",
        annee: 1818,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500469",
      prenom: "Jean Marie",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "17 août 1820",
        annee: 1820,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: {
        date: "4 octobre 1886",
        annee: 1886,
        lieu: "Guimaëc, 29620, Finistère, Bretagne, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500474",
      prenom: "Anne Françoise Marie Perrine",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "12 janvier 1823",
        annee: 1823,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500475",
      prenom: "Marie Renée",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "5 décembre 1824",
        annee: 1824,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500476",
      prenom: "Yves Louis",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "24 janvier 1827",
        annee: 1827,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500470",
      prenom: "Guillaume",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "17 avril 1833",
        annee: 1833,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: null,
      profession: {
        metier: "Instituteur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500471",
      prenom: "Maurice Marie",
      nom: "DOUENNE",
      generation: 3,
      partnerId: null,
      pereId: "I500465",
      mereId: "I500466",
      estFratrie: true,
      naissance: {
        date: "25 juin 1835",
        annee: 1835,
        lieu: "Locquirec, 29241, Finistère, Bretagne, FRANCE"
      },
      deces: {
        date: "8 mars 1879",
        annee: 1879,
        lieu: "Dirinon, 29460, Finistère, Bretagne, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "INSTITUTEUR",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500874",
      prenom: "Josephine Marie Antoinette",
      nom: "THORAVAL",
      generation: 3,
      partnerId: null,
      pereId: "I500786",
      mereId: "I500787",
      estFratrie: true,
      naissance: {
        date: "24 juin 1818",
        annee: 1818,
        lieu: "Plougonver, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501291",
      prenom: "Allain",
      nom: "THORAVAL",
      generation: 2,
      partnerId: null,
      pereId: "I501289",
      mereId: "I501290",
      estFratrie: true,
      naissance: {
        date: "10 décembre 1788",
        annee: 1788,
        lieu: "Breta, Provincia Di Bergamo, Lombardie, Italie"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501292",
      prenom: "Jean Claude",
      nom: "THORAVAL",
      generation: 2,
      partnerId: null,
      pereId: "I501289",
      mereId: "I501290",
      estFratrie: true,
      naissance: {
        date: "9 décembre 1791",
        annee: 1791,
        lieu: "Breta, Provincia Di Bergamo, Lombardie, Italie"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501411",
      prenom: "Jean Marie",
      nom: "THORAVAL",
      generation: 2,
      partnerId: null,
      pereId: "I501289",
      mereId: "I501290",
      estFratrie: true,
      naissance: {
        date: "25 janvier 1794",
        annee: 1794,
        lieu: "Saint-Nicolas-Du-Pélem, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "21 mars 1869",
        annee: 1869,
        lieu: "Saint-Nicolas-Du-Pélem, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501412",
      prenom: "Mathurin",
      nom: "THORAVAL",
      generation: 2,
      partnerId: null,
      pereId: "I501289",
      mereId: "I501290",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500101",
      prenom: "(prénom inconnu)",
      nom: "DUBOURG",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "vers 1815",
        annee: 1815,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500214",
      prenom: "Noel Marie",
      nom: "Dubourg",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "22 janvier 1815",
        annee: 1815,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500102",
      prenom: "Jean Marie",
      nom: "DUBOURG",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "1821",
        annee: 1821,
        lieu: "22780, 22, Côtes d'Armor, France, Loguivy-Plougras"
      },
      deces: null,
      profession: {
        metier: "Couvreur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500103",
      prenom: "Vincent Marie",
      nom: "DUBOURG",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "5 avril 1824",
        annee: 1824,
        lieu: "Plounévez-Moëdec, Côtes-d'Armor, Brittany, France"
      },
      deces: {
        date: "19 février 1882",
        annee: 1882,
        lieu: "Havres",
        cimetiere: ""
      },
      profession: {
        metier: "Journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500215",
      prenom: "Perrine",
      nom: "(nom inconnu)",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "3 août 1827",
        annee: 1827,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500216",
      prenom: "Renée",
      nom: "Dubourg",
      generation: 3,
      partnerId: null,
      pereId: "I500092",
      mereId: "I500093",
      estFratrie: true,
      naissance: {
        date: "27 mai 1831",
        annee: 1831,
        lieu: "Loguivy-Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501112",
      prenom: "Nicolas",
      nom: "LE GALL",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501124",
      prenom: "Guillaume",
      nom: "LE GALL",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "avant 1808",
        annee: 1808,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500245",
      prenom: "Guillaume",
      nom: "Dubourg",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "24 février 1728",
        annee: 1728,
        lieu: "Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "11 août 1782",
        annee: 1782,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500879",
      prenom: "Guillemette",
      nom: "DUBOURG",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "10 avril 1731",
        annee: 1731,
        lieu: "Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500246",
      prenom: "Marie",
      nom: "DUBOURG",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "12 décembre 1733",
        annee: 1733,
        lieu: "Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "6 avril 1801",
        annee: 1801,
        lieu: "Plougras, Côtes-d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500247",
      prenom: "Joseph",
      nom: "Dubourg",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "15 août 1737",
        annee: 1737,
        lieu: "Plougras, Côtes-d'Armor, Bretagne, France"
      },
      deces: {
        date: "15 janvier 1819",
        annee: 1819,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501405",
      prenom: "Abel",
      nom: "BARGUEDAN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "24 mai 1717",
        annee: 1717,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: {
        date: "14 juin 1779",
        annee: 1779,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501406",
      prenom: "Claudine",
      nom: "BARGUEDAN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "13 avril 1720",
        annee: 1720,
        lieu: "Loguivy-Plougras, Côtes-D'armor, Bretagne, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }]
  },
  baranowski: {
    nom: "Baranowski de Rawiez",
    description: "Branche paternelle — grand-mère — 50 personnes en ligne directe",
    personnes: [{
      id: "I500006",
      prenom: "Louise Esther Léontine",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 6,
      partnerId: null,
      pereId: "I500031",
      mereId: "I500010",
      estFratrie: false,
      naissance: {
        date: "3 novembre 1912",
        annee: 1912,
        lieu: "144 grande Rue, Saint-Maurice, Val-De-Marne, Île-De-France, France"
      },
      deces: {
        date: "12 février 1992",
        annee: 1992,
        lieu: "Le Teich, Gironde, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "14 septembre 1937",
        lieu: "Paris 14ème"
      },
      remarque: ""
    }, {
      id: "I500010",
      prenom: "Louise Philomene",
      nom: "MOINE",
      generation: 5,
      partnerId: "I500031",
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: false,
      naissance: {
        date: "25 avril 1878",
        annee: 1878,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "vers décembre 1940",
        annee: 1940,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1 septembre 1907",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500039",
      prenom: "Marie Adélaïde Euphémie",
      nom: "CHARMOILLAUX",
      generation: 4,
      partnerId: "I500038",
      pereId: "I500712",
      mereId: "I500713",
      estFratrie: false,
      naissance: {
        date: "29 octobre 1840",
        annee: 1840,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "10 mars 1908",
        annee: 1908,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1908",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500713",
      prenom: "Marie Véronique",
      nom: "BARBETTE",
      generation: 3,
      partnerId: "I500712",
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: false,
      naissance: {
        date: "6 janvier 1817",
        annee: 1817,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "27 juillet 1887",
        annee: 1887,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "cultivatrice",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1839",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "29 avril 1839",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500841",
      prenom: "Marie Agnès",
      nom: "MÉDECIN",
      generation: 2,
      partnerId: "I500840",
      pereId: "I500843",
      mereId: "I500842",
      estFratrie: false,
      naissance: {
        date: "18 juillet 1784",
        annee: 1784,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "10 avril 1863",
        annee: 1863,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1863",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "11 janvier 1801",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500842",
      prenom: "Anne Thérèse",
      nom: "TRUCHOT",
      generation: 1,
      partnerId: "I500843",
      pereId: "I501031",
      mereId: "I501032",
      estFratrie: false,
      naissance: {
        date: "2 novembre 1760",
        annee: 1760,
        lieu: "Vaucluse (RP), Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1800",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "26 mai 1784",
        lieu: "Vaucluse (RP), Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501032",
      prenom: "Marie Thérèse",
      nom: "ROUSSE",
      generation: 0,
      partnerId: "I501031",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "19 mars 1743",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501031",
      prenom: "Jean Joseph",
      nom: "TRUCHOT",
      generation: 0,
      partnerId: "I501032",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "10 janvier 1715",
        annee: 1715,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "28 février 1768",
        annee: 1768,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1768",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "19 mars 1743",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500843",
      prenom: "Désiré",
      nom: "MEDECIN",
      generation: 1,
      partnerId: "I500842",
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: false,
      naissance: {
        date: "27 juillet 1760",
        annee: 1760,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "4 août 1799",
        annee: 1799,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1784",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "26 mai 1784",
        lieu: "Vaucluse (RP), Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500905",
      prenom: "Jeanne Antoine",
      nom: "PRELAT",
      generation: 0,
      partnerId: "I500904",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "18 avril 1802",
        annee: 1802,
        lieu: "Ornans, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "9 mai 1758",
        lieu: "Vaucluse, 25588, Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500904",
      prenom: "Jean Jacques",
      nom: "MEDECIN",
      generation: 0,
      partnerId: "I500905",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "25 avril 1731",
        annee: 1731,
        lieu: "Dampjoux (Rp), Dampjoux, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "6 juin 1784",
        annee: 1784,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1758",
        lieu: "Orgeans-Blanchefontaine, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "9 mai 1758",
        lieu: "Vaucluse, 25588, Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500840",
      prenom: "Pierre Victor",
      nom: "BARBETTE",
      generation: 2,
      partnerId: "I500841",
      pereId: "I500845",
      mereId: "I500844",
      estFratrie: false,
      naissance: {
        date: "20 avril 1779",
        annee: 1779,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "19 mars 1853",
        annee: 1853,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1801",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "11 janvier 1801",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500844",
      prenom: "Jeanne Marie",
      nom: "GROSGIRARD",
      generation: 1,
      partnerId: "I500845",
      pereId: "I501437",
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1737",
        annee: 1737,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "7 juin 1763",
        lieu: "Cour-Saint-Maurice - 25380 - Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501437",
      prenom: "Claude",
      nom: "GROSGIRARD",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500845",
      prenom: "Pierre Claude",
      nom: "BARBETTE",
      generation: 1,
      partnerId: "I500844",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1739",
        annee: 1739,
        lieu: "Lanthenans - 25250 - Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "5 août 1797",
        annee: 1797,
        lieu: "Charmoille - 25380 - Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "7 juin 1763",
        lieu: "Cour-Saint-Maurice - 25380 - Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500712",
      prenom: "François Xavier",
      nom: "CHARMOILLAUX",
      generation: 3,
      partnerId: "I500713",
      pereId: "I500837",
      mereId: "I500838",
      estFratrie: false,
      naissance: {
        date: "17 novembre 1814",
        annee: 1814,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "8 décembre 1887",
        annee: 1887,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1839",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "29 avril 1839",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500838",
      prenom: "Marie Josephe",
      nom: "FOILLON",
      generation: 2,
      partnerId: "I500837",
      pereId: "I500846",
      mereId: "I500847",
      estFratrie: false,
      naissance: {
        date: "6 janvier 1784",
        annee: 1784,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "2 mai 1864",
        annee: 1864,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 janvier 1809",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500847",
      prenom: "Marie Blaise",
      nom: "DEVILLERS",
      generation: 1,
      partnerId: "I500846",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "3 février 1745",
        annee: 1745,
        lieu: "Laviron, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "14 avril 1820",
        annee: 1820,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "16 janvier 1764",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500846",
      prenom: "Jean François",
      nom: "FOILLON",
      generation: 1,
      partnerId: "I500847",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "22 novembre 1736",
        annee: 1736,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "19 septembre 1794",
        annee: 1794,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "16 janvier 1764",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500837",
      prenom: "Antoine Joseph",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: "I500838",
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: false,
      naissance: {
        date: "1 juin 1785",
        annee: 1785,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "12 mars 1857",
        annee: 1857,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1857",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "24 janvier 1809",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500853",
      prenom: "Jeanne Agnès",
      nom: "PERROT",
      generation: 1,
      partnerId: "I500852",
      pereId: "I501099",
      mereId: "I501100",
      estFratrie: false,
      naissance: {
        date: "28 janvier 1748",
        annee: 1748,
        lieu: "Belleherbe, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "21 janvier 1817",
        annee: 1817,
        lieu: "Charmoille, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 février 1772",
        lieu: "Vaucluse, Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501100",
      prenom: "Anne",
      nom: "EMONIN",
      generation: 0,
      partnerId: "I501099",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "13 mars 1720",
        annee: 1720,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      deces: {
        date: "27 décembre 1781",
        annee: 1781,
        lieu: "Belleherbe, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "2 juin 1744",
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501099",
      prenom: "Jean Pierre",
      nom: "PERROT",
      generation: 0,
      partnerId: "I501100",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "11 juin 1719",
        annee: 1719,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "2 juin 1744",
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500852",
      prenom: "Pierre Joseph",
      nom: "CHARMOILLAUX",
      generation: 1,
      partnerId: "I500853",
      pereId: "I501093",
      mereId: "I501094",
      estFratrie: false,
      naissance: {
        date: "4 juillet 1738",
        annee: 1738,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "16 février 1814",
        annee: 1814,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1772",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "4 février 1772",
        lieu: "Vaucluse, Doubs, Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501094",
      prenom: "Anne Claude Françoise",
      nom: "Roy",
      generation: 0,
      partnerId: "I501093",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "6 août 1699",
        annee: 1699,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "30 août 1739",
        annee: 1739,
        lieu: "Charmoille, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "TO 1738",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I501093",
      prenom: "Etienne",
      nom: "Charmoillaux",
      generation: 0,
      partnerId: "I501094",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "20 décembre 1699",
        annee: 1699,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "10 juillet 1775",
        annee: 1775,
        lieu: "Vaucluse, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "TO 1738",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500038",
      prenom: "Jean Baptiste Léonard",
      nom: "MOINE",
      generation: 4,
      partnerId: "I500039",
      pereId: "I500386",
      mereId: "I500387",
      estFratrie: false,
      naissance: {
        date: "21 janvier 1826",
        annee: 1826,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "21 février 1901",
        annee: 1901,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1860",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }, {
        date: "ABT 1901",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500387",
      prenom: "Marie Véronique",
      nom: "ROY",
      generation: 3,
      partnerId: "I500386",
      pereId: "I500835",
      mereId: "I500836",
      estFratrie: false,
      naissance: {
        date: "4 février 1798",
        annee: 1798,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "10 décembre 1867",
        annee: 1867,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 novembre 1820",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500836",
      prenom: "Marie Généreuse",
      nom: "SIMONIN",
      generation: 2,
      partnerId: "I500835",
      pereId: "I500862",
      mereId: "I500863",
      estFratrie: false,
      naissance: {
        date: "vers 1763",
        annee: 1763,
        lieu: ""
      },
      deces: {
        date: "13 septembre 1834",
        annee: 1834,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 février 1789",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500863",
      prenom: "Jeanne Françoise",
      nom: "BREUILLOT",
      generation: 1,
      partnerId: "I500862",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1727",
        annee: 1727,
        lieu: ""
      },
      deces: {
        date: "2 août 1772",
        annee: 1772,
        lieu: "Vaucluse (RP), Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1772",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "19 juin 1753",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500862",
      prenom: "Pierre Joseph",
      nom: "SIMONIN",
      generation: 1,
      partnerId: "I500863",
      pereId: "I501424",
      mereId: "I501425",
      estFratrie: false,
      naissance: {
        date: "18 mars 1721",
        annee: 1721,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "7 septembre 1797",
        annee: 1797,
        lieu: "Charmoille, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "19 juin 1753",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501425",
      prenom: "Blaise",
      nom: "RECEVEUR",
      generation: 0,
      partnerId: "I501424",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501424",
      prenom: "Joseph",
      nom: "SIMONIN",
      generation: 0,
      partnerId: "I501425",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "2 mars 1684",
        annee: 1684,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "28 juin 1752",
        annee: 1752,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500835",
      prenom: "Jean Claude Xavier",
      nom: "ROY",
      generation: 2,
      partnerId: "I500836",
      pereId: "I501422",
      mereId: "I501423",
      estFratrie: false,
      naissance: {
        date: "10 mai 1759",
        annee: 1759,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "19 avril 1820",
        annee: 1820,
        lieu: "LA JOUX-BELLEHERBE, 25051, Doubs, Franche-Comté, FRANCE,",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 février 1789",
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I501423",
      prenom: "Jeanne Françoise",
      nom: "GIRARDOT",
      generation: 1,
      partnerId: "I501422",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501422",
      prenom: "Pierre Claude",
      nom: "ROY",
      generation: 1,
      partnerId: "I501423",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500386",
      prenom: "François Joseph",
      nom: "MOINE",
      generation: 3,
      partnerId: "I500387",
      pereId: "I500830",
      mereId: "I500831",
      estFratrie: false,
      naissance: {
        date: "2 juillet 1798",
        annee: 1798,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "4 décembre 1853",
        annee: 1853,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1820",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: {
        date: "27 novembre 1820",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      remarque: ""
    }, {
      id: "I500831",
      prenom: "Marie Joseph",
      nom: "MARCHAND",
      generation: 2,
      partnerId: "I500830",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500830",
      prenom: "Jean Baptiste",
      nom: "MOINE",
      generation: 2,
      partnerId: "I500831",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500031",
      prenom: "Etienne François",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 5,
      partnerId: "I500010",
      pereId: "I500035",
      mereId: "I500036",
      estFratrie: false,
      naissance: {
        date: "25 juin 1875",
        annee: 1875,
        lieu: "Paris 9EME, Paris, Île-de-France, France"
      },
      deces: {
        date: "29 septembre 1914",
        annee: 1914,
        lieu: "Avocourt, Meuse, France",
        cimetiere: ""
      },
      profession: {
        metier: "LICENCIE EN DROIT - Interprète",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1 septembre 1907",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500036",
      prenom: "Joséphine Barbe Françoise",
      nom: "GROSSI",
      generation: 4,
      partnerId: "I500035",
      pereId: "I500429",
      mereId: "I500430",
      estFratrie: false,
      naissance: {
        date: "21 avril 1839",
        annee: 1839,
        lieu: "Crassier, canton de Vaud, Suisse"
      },
      deces: {
        date: "19 janvier 1918",
        annee: 1918,
        lieu: "15, Rue de la Colombière Nyon, Switzerland",
        cimetiere: ""
      },
      profession: {
        metier: "couturière",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1907",
        lieu: "31 rue de Clichy"
      }],
      mariage: {
        date: "9 septembre 1873",
        lieu: "Paris 9EME, Paris, Île-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500430",
      prenom: "Anna Barbara",
      nom: "KAUFMANN",
      generation: 3,
      partnerId: "I500429",
      pereId: "I501549",
      mereId: "I501550",
      estFratrie: false,
      naissance: {
        date: "vers 1806",
        annee: 1806,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 février 1837",
        lieu: "Annecy"
      },
      remarque: ""
    }, {
      id: "I501550",
      prenom: "Marie",
      nom: "HEINDEL",
      generation: 2,
      partnerId: "I501549",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: "Bayern"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501549",
      prenom: "Jean Michel",
      nom: "KAUFMANN",
      generation: 2,
      partnerId: "I501550",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500429",
      prenom: "Joseph Jean Batiste",
      nom: "GROSSI",
      generation: 3,
      partnerId: "I500430",
      pereId: "I501548",
      mereId: "I501547",
      estFratrie: false,
      naissance: {
        date: "13 septembre 1800",
        annee: 1800,
        lieu: ""
      },
      deces: {
        date: "29 mai 1877",
        annee: 1877,
        lieu: "15, Rue de la Colombière Nyon, Switzerland",
        cimetiere: ""
      },
      profession: {
        metier: "Tailleur d'habit",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 février 1837",
        lieu: "Annecy"
      },
      remarque: ""
    }, {
      id: "I501547",
      prenom: "Ténégonde",
      nom: "RATZINGER",
      generation: 2,
      partnerId: "I501548",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501548",
      prenom: "Joseph",
      nom: "GROSSI",
      generation: 2,
      partnerId: "I501547",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500035",
      prenom: "François Eustache",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 4,
      partnerId: "I500036",
      pereId: "I500426",
      mereId: "I500428",
      estFratrie: false,
      naissance: {
        date: "22 octobre 1822",
        annee: 1822,
        lieu: "Jytomir, Gouvernement de Volhynie (Pologne)Pologne /Ukraine"
      },
      deces: {
        date: "30 juin 1904",
        annee: 1904,
        lieu: "maison des vétérans polonais de Juvisy",
        cimetiere: ""
      },
      profession: {
        metier: "Interprète",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "9 septembre 1873",
        lieu: "Paris 9EME, Paris, Île-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500428",
      prenom: "Tekla",
      nom: "Gąsecka",
      generation: 3,
      partnerId: "I500426",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "",
        lieu: "Wołyń"
      },
      remarque: ""
    }, {
      id: "I500426",
      prenom: "Bazyli",
      nom: "BARANOWSKI herb RAWICZ",
      generation: 3,
      partnerId: "I500428",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "vers 1821",
        annee: 1821,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "",
        lieu: "Wołyń"
      },
      remarque: ""
    }, {
      id: "I500866",
      prenom: "Claude Theodore",
      nom: "Roy",
      generation: 3,
      partnerId: null,
      pereId: "I500835",
      mereId: "I500836",
      estFratrie: true,
      naissance: {
        date: "14 février 1793",
        annee: 1793,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "14 février 1862",
        annee: 1862,
        lieu: "Charmoille, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500867",
      prenom: "Prospère Albin",
      nom: "Roy",
      generation: 3,
      partnerId: null,
      pereId: "I500835",
      mereId: "I500836",
      estFratrie: true,
      naissance: {
        date: "vers 1795",
        annee: 1795,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501442",
      prenom: "Pierre Ignace",
      nom: "PRELAT",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "31 juillet 1738",
        annee: 1738,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "7 mars 1804",
        annee: 1804,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500864",
      prenom: "jean claude",
      nom: "simonin",
      generation: 2,
      partnerId: null,
      pereId: "I500862",
      mereId: "I500863",
      estFratrie: true,
      naissance: {
        date: "1 mars 1756",
        annee: 1756,
        lieu: "Vaucluse, Doubs, Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500865",
      prenom: "claude joseph",
      nom: "simonin",
      generation: 2,
      partnerId: null,
      pereId: "I500862",
      mereId: "I500863",
      estFratrie: true,
      naissance: {
        date: "vers 1761",
        annee: 1761,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500040",
      prenom: "Marie Véronique",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "26 février 1862",
        annee: 1862,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "23 mai 1936",
        annee: 1936,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Couturière",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1936",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500043",
      prenom: "Marie Genereuse Philomène",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "21 mai 1863",
        annee: 1863,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "31 janvier 1926",
        annee: 1926,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivatrice",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }, {
        date: "1921",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500041",
      prenom: "Prosper Alexandre",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "14 octobre 1864",
        annee: 1864,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "4 mars 1883",
        annee: 1883,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1883",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500046",
      prenom: "Séphora Joseph",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "15 février 1867",
        annee: 1867,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500044",
      prenom: "François Xavier Ulysse",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "7 mars 1868",
        annee: 1868,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "17 avril 1869",
        annee: 1869,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500045",
      prenom: "François Xavier Auguste",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "8 octobre 1870",
        annee: 1870,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500042",
      prenom: "Esther Éloïse",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "5 avril 1872",
        annee: 1872,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "10 mars 1952",
        annee: 1952,
        lieu: "Bourges, Cher, Centre-Val De Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500047",
      prenom: "Marie Berthe",
      nom: "MOINE",
      generation: 5,
      partnerId: null,
      pereId: "I500038",
      mereId: "I500039",
      estFratrie: true,
      naissance: {
        date: "26 avril 1880",
        annee: 1880,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500834",
      prenom: "Modeste Edouard",
      nom: "MOINE",
      generation: 4,
      partnerId: null,
      pereId: "I500386",
      mereId: "I500387",
      estFratrie: true,
      naissance: {
        date: "vers 1822",
        annee: 1822,
        lieu: ""
      },
      deces: {
        date: "16 mars 1840",
        annee: 1840,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500833",
      prenom: "Marie Philippine",
      nom: "MOINE",
      generation: 4,
      partnerId: null,
      pereId: "I500386",
      mereId: "I500387",
      estFratrie: true,
      naissance: {
        date: "8 juillet 1828",
        annee: 1828,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500832",
      prenom: "Généreuse Appoline",
      nom: "MOINE",
      generation: 4,
      partnerId: null,
      pereId: "I500386",
      mereId: "I500387",
      estFratrie: true,
      naissance: {
        date: "16 août 1829",
        annee: 1829,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "29 juin 1893",
        annee: 1893,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1856",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501214",
      prenom: "Joseph Alexandre",
      nom: "MOINE",
      generation: 4,
      partnerId: null,
      pereId: "I500386",
      mereId: "I500387",
      estFratrie: true,
      naissance: {
        date: "25 avril 1834",
        annee: 1834,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501034",
      prenom: "Pierre François",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "vers 1806",
        annee: 1806,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1833",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501035",
      prenom: "Marie Victorine",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "29 mars 1810",
        annee: 1810,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1839",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501036",
      prenom: "Jean Baptiste",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "vers 1812",
        annee: 1812,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "12 juin 1851",
        annee: 1851,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501037",
      prenom: "Marie Thérèse",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "29 avril 1814",
        annee: 1814,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "20 juillet 1820",
        annee: 1820,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501038",
      prenom: "Marie Geneviève",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "6 juillet 1824",
        annee: 1824,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "9 janvier 1865",
        annee: 1865,
        lieu: "Chevigney-Lès-Vercel, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1865",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501039",
      prenom: "Charles Auguste",
      nom: "BARBETTE",
      generation: 3,
      partnerId: null,
      pereId: "I500840",
      mereId: "I500841",
      estFratrie: true,
      naissance: {
        date: "14 juillet 1826",
        annee: 1826,
        lieu: "Charmolle, Commune Nouvelle D'arrou, Eure-Et-Loir, Centre, France"
      },
      deces: {
        date: "25 juillet 1897",
        annee: 1897,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1897",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501166",
      prenom: "Jean Joseph",
      nom: "CHARMOILLAUX",
      generation: 4,
      partnerId: null,
      pereId: "I500712",
      mereId: "I500713",
      estFratrie: true,
      naissance: {
        date: "8 juin 1839",
        annee: 1839,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "25 septembre 1839",
        annee: 1839,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501095",
      prenom: "Marie Joséphine",
      nom: "Charmoillaux",
      generation: 1,
      partnerId: null,
      pereId: "I501093",
      mereId: "I501094",
      estFratrie: true,
      naissance: {
        date: "24 janvier 1728",
        annee: 1728,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: {
        date: "12 avril 1774",
        annee: 1774,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501096",
      prenom: "Anne Agnès",
      nom: "Charmoillaux",
      generation: 1,
      partnerId: null,
      pereId: "I501093",
      mereId: "I501094",
      estFratrie: true,
      naissance: {
        date: "30 avril 1731",
        annee: 1731,
        lieu: "Vaucluse, Doubs, Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501097",
      prenom: "Jeanne Françoise",
      nom: "Charmoillaux",
      generation: 1,
      partnerId: null,
      pereId: "I501093",
      mereId: "I501094",
      estFratrie: true,
      naissance: {
        date: "3 octobre 1734",
        annee: 1734,
        lieu: "Charmoille, Doubs, Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501098",
      prenom: "claude françois joseph",
      nom: "charmoillaux",
      generation: 1,
      partnerId: null,
      pereId: "I501093",
      mereId: "I501094",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "TO 1798",
        annee: 1798,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500322",
      prenom: "Etienne Eugène",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 6,
      partnerId: null,
      pereId: "I500031",
      mereId: "I500010",
      estFratrie: true,
      naissance: {
        date: "3 septembre 1907",
        annee: 1907,
        lieu: "12eme - Paris, 75000, Paris, Île-De-France, FRANCE"
      },
      deces: {
        date: "11 août 1909",
        annee: 1909,
        lieu: "Saint-Maurice, Val-De-Marne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500323",
      prenom: "Enfant sans vie",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 6,
      partnerId: null,
      pereId: "I500031",
      mereId: "I500010",
      estFratrie: true,
      naissance: {
        date: "22 octobre 1908",
        annee: 1908,
        lieu: "12eme - Paris, 75000, Paris, Île-De-France, FRANCE"
      },
      deces: {
        date: "22 octobre 1908",
        annee: 1908,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500030",
      prenom: "Berthe Louise",
      nom: "Baranowski De Rawiez",
      generation: 6,
      partnerId: null,
      pereId: "I500031",
      mereId: "I500010",
      estFratrie: true,
      naissance: {
        date: "4 mars 1910",
        annee: 1910,
        lieu: "Saint Maurice"
      },
      deces: {
        date: "17 février 1950",
        annee: 1950,
        lieu: "Argenteuil",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500425",
      prenom: "Léontine Christine",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 5,
      partnerId: null,
      pereId: "I500035",
      mereId: "I500036",
      estFratrie: true,
      naissance: {
        date: "14 août 1873",
        annee: 1873,
        lieu: "Paris 9EME, Paris, Île-de-France, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500427",
      prenom: "Adolphe Edouard Eugène",
      nom: "BARANOWSKI DE RAWIEZ",
      generation: 5,
      partnerId: null,
      pereId: "I500035",
      mereId: "I500036",
      estFratrie: true,
      naissance: {
        date: "14 février 1877",
        annee: 1877,
        lieu: "Paris 8EME, Paris, Île-de-France, France"
      },
      deces: {
        date: "21 septembre 1916",
        annee: 1916,
        lieu: "Infirmerie de  Nyon, Vaud, Switzerland",
        cimetiere: ""
      },
      profession: {
        metier: "tailleur d'habits",
        lieu: ""
      },
      domiciles: [{
        date: "",
        lieu: "15 rue de la Colombière"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500848",
      prenom: "Marie Ludivine",
      nom: "FOILLON",
      generation: 2,
      partnerId: null,
      pereId: "I500846",
      mereId: "I500847",
      estFratrie: true,
      naissance: {
        date: "vers 1786",
        annee: 1786,
        lieu: ""
      },
      deces: {
        date: "21 octobre 1826",
        annee: 1826,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501546",
      prenom: "Joseph Benjamin",
      nom: "GROSSI",
      generation: 4,
      partnerId: null,
      pereId: "I500429",
      mereId: "I500430",
      estFratrie: true,
      naissance: {
        date: "vers 18 mai 1837",
        annee: 1837,
        lieu: "Crassier, canton de Vaud, Suisse"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500434",
      prenom: "Joseph Antoine Edouard",
      nom: "GROSSI",
      generation: 4,
      partnerId: null,
      pereId: "I500429",
      mereId: "I500430",
      estFratrie: true,
      naissance: {
        date: "1 avril 1841",
        annee: 1841,
        lieu: "Penthalaz, Waadt, Schweiz"
      },
      deces: {
        date: "1 juin 1909",
        annee: 1909,
        lieu: "Lausanne, Lausanne, Vaud, Switzerland",
        cimetiere: ""
      },
      profession: {
        metier: "Chef de gare à Cossonay",
        lieu: ""
      },
      domiciles: [{
        date: "",
        lieu: "Penthalaz, Gros-De-Vaud, Vaud, Switzerland"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500909",
      prenom: "Jean Pierre",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "29 mai 1758",
        annee: 1758,
        lieu: "Vaucluse (Rp), Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500907",
      prenom: "Marie Thérèse",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "11 septembre 1762",
        annee: 1762,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "19 mars 1834",
        annee: 1834,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1782",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500906",
      prenom: "Jeanne Elisabeth Généreuse",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "3 janvier 1765",
        annee: 1765,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500911",
      prenom: "Marie Séraphine",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "15 novembre 1767",
        annee: 1767,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "28 octobre 1828",
        annee: 1828,
        lieu: "Domprel, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500912",
      prenom: "Claude Joseph",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "16 juillet 1770",
        annee: 1770,
        lieu: "Vaucluse (Rp), Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "3 novembre 1827",
        annee: 1827,
        lieu: "Droitfontaine, Belleherbe, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500910",
      prenom: "Jean François Albin",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "23 mars 1774",
        annee: 1774,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500908",
      prenom: "Jacques François",
      nom: "MEDECIN",
      generation: 1,
      partnerId: null,
      pereId: "I500904",
      mereId: "I500905",
      estFratrie: true,
      naissance: {
        date: "12 novembre 1776",
        annee: 1776,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "6 avril 1778",
        annee: 1778,
        lieu: "Vaucluse (Rp), Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500855",
      prenom: "Jean Joseph",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "23 avril 1774",
        annee: 1774,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "15 janvier 1792",
        annee: 1792,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500856",
      prenom: "Jean Baptiste",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "vers 1776",
        annee: 1776,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "11 mai 1776",
        annee: 1776,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500857",
      prenom: "Anne Véronique",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "vers 1777",
        annee: 1777,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "13 mars 1816",
        annee: 1816,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1799",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500858",
      prenom: "François Joseph Victor",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "2 octobre 1779",
        annee: 1779,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "12 mars 1852",
        annee: 1852,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur à Charmoille.",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500854",
      prenom: "Marie Joseph",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "5 mai 1782",
        annee: 1782,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "11 décembre 1842",
        annee: 1842,
        lieu: "Belleherbe, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500859",
      prenom: "Pierre François",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "5 mai 1782",
        annee: 1782,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "29 juillet 1782",
        annee: 1782,
        lieu: "Vaucluse, Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500861",
      prenom: "Alexandre Joseph",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "3 juin 1791",
        annee: 1791,
        lieu: "Vaucluse, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "14 juin 1812",
        annee: 1812,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500860",
      prenom: "(prénom inconnu)",
      nom: "CHARMOILLAUX",
      generation: 2,
      partnerId: null,
      pereId: "I500852",
      mereId: "I500853",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501577",
      prenom: "Sabina",
      nom: "Baranowska",
      generation: 4,
      partnerId: null,
      pereId: "I500426",
      mereId: "I500428",
      estFratrie: true,
      naissance: {
        date: "1812",
        annee: 1812,
        lieu: "Radziwiłłów, powiat Dubno, Wołyń"
      },
      deces: {
        date: "25 août 1859",
        annee: 1859,
        lieu: "Satyjów, gmina Warkowicze, powiat Dubno, Wołyń",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501556",
      prenom: "Aleksander",
      nom: "BARANOWSKI herbu RAWICZ",
      generation: 4,
      partnerId: null,
      pereId: "I500426",
      mereId: "I500428",
      estFratrie: true,
      naissance: {
        date: "20 février 1814",
        annee: 1814,
        lieu: "Dubno"
      },
      deces: {
        date: "11 juin 1814",
        annee: 1814,
        lieu: "Dubno",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501555",
      prenom: "Emilia",
      nom: "BARANOWSKA",
      generation: 4,
      partnerId: null,
      pereId: "I500426",
      mereId: "I500428",
      estFratrie: true,
      naissance: {
        date: "vers 1818",
        annee: 1818,
        lieu: "Dubno"
      },
      deces: {
        date: "28 juillet 1820",
        annee: 1820,
        lieu: "Dubno",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501026",
      prenom: "Jean Pierre",
      nom: "MEDECIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 1721",
        annee: 1721,
        lieu: ""
      },
      deces: {
        date: "16 octobre 1783",
        annee: 1783,
        lieu: "Vauclusotte, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501027",
      prenom: "Jeanne Claude",
      nom: "MEDECIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "20 juin 1728",
        annee: 1728,
        lieu: "Chaux-Lès-Châtillon (Rp), Les Terres-De-Chaux, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501028",
      prenom: "Eloy",
      nom: "MEDECIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "1 décembre 1734",
        annee: 1734,
        lieu: "Dampjoux (Rp), Dampjoux, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501101",
      prenom: "Jeanne Baptiste",
      nom: "PERROT",
      generation: 1,
      partnerId: null,
      pereId: "I501099",
      mereId: "I501100",
      estFratrie: true,
      naissance: {
        date: "vers 1751",
        annee: 1751,
        lieu: ""
      },
      deces: {
        date: "24 septembre 1817",
        annee: 1817,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501102",
      prenom: "Antoine Joseph",
      nom: "PERROT",
      generation: 1,
      partnerId: null,
      pereId: "I501099",
      mereId: "I501100",
      estFratrie: true,
      naissance: {
        date: "4 septembre 1754",
        annee: 1754,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501103",
      prenom: "Anne Baptiste Agnès",
      nom: "PERROT",
      generation: 1,
      partnerId: null,
      pereId: "I501099",
      mereId: "I501100",
      estFratrie: true,
      naissance: {
        date: "22 avril 1761",
        annee: 1761,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France"
      },
      deces: {
        date: "24 février 1823",
        annee: 1823,
        lieu: "Belleherbe - 25380 - Doubs, Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500849",
      prenom: "Marie Agnès",
      nom: "CHARMOILLAUX",
      generation: 3,
      partnerId: null,
      pereId: "I500837",
      mereId: "I500838",
      estFratrie: true,
      naissance: {
        date: "8 juillet 1809",
        annee: 1809,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500850",
      prenom: "Marie Élisabeth",
      nom: "CHARMOILLAUX",
      generation: 3,
      partnerId: null,
      pereId: "I500837",
      mereId: "I500838",
      estFratrie: true,
      naissance: {
        date: "20 janvier 1811",
        annee: 1811,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "19 août 1888",
        annee: 1888,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500851",
      prenom: "Joseph Alexandre",
      nom: "CHARMOILLAUX",
      generation: 3,
      partnerId: null,
      pereId: "I500837",
      mereId: "I500838",
      estFratrie: true,
      naissance: {
        date: "24 janvier 1813",
        annee: 1813,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "25 avril 1893",
        annee: 1893,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500839",
      prenom: "Généreuse",
      nom: "CHARMOILLAUX",
      generation: 3,
      partnerId: null,
      pereId: "I500837",
      mereId: "I500838",
      estFratrie: true,
      naissance: {
        date: "vers 1827",
        annee: 1827,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      },
      deces: {
        date: "23 août 1854",
        annee: 1854,
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "ABT 1854",
        lieu: "Charmoille, Doubs, Bourgogne-Franche-Comté, France"
      }],
      mariage: null,
      remarque: ""
    }]
  },
  monsigny: {
    nom: "Monsigny",
    description: "Branche maternelle — grand-père — 87 personnes en ligne directe",
    personnes: [{
      id: "I500005",
      prenom: "Roger Alexandre Desiré",
      nom: "MONSIGNY",
      generation: 6,
      partnerId: null,
      pereId: "I500016",
      mereId: "I500017",
      estFratrie: false,
      naissance: {
        date: "26 juin 1911",
        annee: 1911,
        lieu: "Paris 20e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "2 juin 1985",
        annee: 1985,
        lieu: "2 juin 1985 - Marly-Le-Roi, Yvelines, Île-De-France, France",
        cimetiere: "Marly-Le-Roi"
      },
      profession: {
        metier: "Etalagiste",
        lieu: ""
      },
      domiciles: [{
        date: "1926",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1921",
        lieu: "Loix, Charente-Maritime, Nouvelle-Aquitaine, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500017",
      prenom: "Marie Louise",
      nom: "ROTEREAU",
      generation: 5,
      partnerId: "I500016",
      pereId: "I500313",
      mereId: "I500312",
      estFratrie: false,
      naissance: {
        date: "17 mars 1870",
        annee: 1870,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 10ème arrondissement"
      },
      deces: {
        date: "30 novembre 1938",
        annee: 1938,
        lieu: "Le Plessis-Robinson, Hauts-de-Seine, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Fleuriste",
        lieu: ""
      },
      domiciles: [{
        date: "1926",
        lieu: "160, rue de Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1936",
        lieu: "160, rue de Belleville, Combat, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "160 rue de Belleville, Combat, 20e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: {
        date: "31 août 1899",
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement"
      },
      remarque: ""
    }, {
      id: "I500312",
      prenom: "Marie Alexandrine",
      nom: "Girardin",
      generation: 4,
      partnerId: "I500313",
      pereId: "I500318",
      mereId: "I500319",
      estFratrie: false,
      naissance: {
        date: "24 novembre 1852",
        annee: 1852,
        lieu: "la-souterraine, La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "4 janvier 1909",
        annee: 1909,
        lieu: "Paris 19, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Couturière",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 juillet 1891",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500319",
      prenom: "Louise",
      nom: "NERNUY",
      generation: 3,
      partnerId: "I500318",
      pereId: "I500448",
      mereId: "I500449",
      estFratrie: false,
      naissance: {
        date: "25 novembre 1834",
        annee: 1834,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "27 décembre 1857",
        annee: 1857,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "Lingère",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 novembre 1851",
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500449",
      prenom: "Marie",
      nom: "MALTON",
      generation: 2,
      partnerId: "I500448",
      pereId: "I501570",
      mereId: "I501571",
      estFratrie: false,
      naissance: {
        date: "vers 1801",
        annee: 1801,
        lieu: ""
      },
      deces: {
        date: "1 février 1869",
        annee: 1869,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "vers 1830",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I501571",
      prenom: "Geneviève",
      nom: "CARTAND",
      generation: 1,
      partnerId: "I501570",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501570",
      prenom: "Alexis",
      nom: "MALTON",
      generation: 1,
      partnerId: "I501571",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500448",
      prenom: "Barthélémy",
      nom: "NERNUY",
      generation: 2,
      partnerId: "I500449",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1791",
        annee: 1791,
        lieu: ""
      },
      deces: {
        date: "15 mars 1855",
        annee: 1855,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "Tisserand",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "vers 1830",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500318",
      prenom: "Jean Baptiste",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: "I500319",
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: false,
      naissance: {
        date: "30 octobre 1830",
        annee: 1830,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "après 18 janvier 1861",
        annee: 1861,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 novembre 1851",
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500656",
      prenom: "Marie Madelaine",
      nom: "COGNAC",
      generation: 2,
      partnerId: "I500655",
      pereId: "I500670",
      mereId: "I500671",
      estFratrie: false,
      naissance: {
        date: "19 mars 1791",
        annee: 1791,
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "9 mars 1877",
        annee: 1877,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 novembre 1813",
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500671",
      prenom: "Marieanne",
      nom: "DROUHAULT",
      generation: 1,
      partnerId: "I500670",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1762",
        annee: 1762,
        lieu: "hampagné-le-Sec, 86510, Vienne, Nouvelle-Aquitaine, FRANCE"
      },
      deces: {
        date: "4 février 1831",
        annee: 1831,
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500670",
      prenom: "Pierre",
      nom: "COGNAC",
      generation: 1,
      partnerId: "I500671",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "2 janvier 1754",
        annee: 1754,
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "23 avril 1807",
        annee: 1807,
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cabaretier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500655",
      prenom: "Louis",
      nom: "GIRARDIN",
      generation: 2,
      partnerId: "I500656",
      pereId: "I500657",
      mereId: "I500658",
      estFratrie: false,
      naissance: {
        date: "3 mai 1782",
        annee: 1782,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "14 février 1857",
        annee: 1857,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 novembre 1813",
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500658",
      prenom: "Magdelaine",
      nom: "ROUHAULT",
      generation: 1,
      partnerId: "I500657",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "17 juillet 1750",
        annee: 1750,
        lieu: "Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "5 octobre 1796",
        annee: 1796,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "25 novembre 1772",
        lieu: "Brux--Saint-Martin, Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500657",
      prenom: "Pierre Jacques",
      nom: "GIRARDIN",
      generation: 1,
      partnerId: "I500658",
      pereId: "I500668",
      mereId: "I500669",
      estFratrie: false,
      naissance: {
        date: "29 juin 1734",
        annee: 1734,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "7 septembre 1782",
        annee: 1782,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "25 novembre 1772",
        lieu: "Brux--Saint-Martin, Brux, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500669",
      prenom: "Marguerite",
      nom: "POUPART",
      generation: 0,
      partnerId: "I500668",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "8 novembre 1710",
        annee: 1710,
        lieu: "Linazay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "avant 1772",
        annee: 1772,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 février 1730",
        lieu: "Linazay, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500668",
      prenom: "Pierre",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: "I500669",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 décembre 1704",
        annee: 1704,
        lieu: "Chaunay, 86510, Vienne, Nouvelle-Aquitaine, FRANCE"
      },
      deces: {
        date: "30 octobre 1777",
        annee: 1777,
        lieu: "Chaunay, 86510, Vienne, Nouvelle-Aquitaine, FRANCE",
        cimetiere: "Chaunay--Saint-Pierre, Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      profession: {
        metier: "Charron (fabricant/réparateur de charrettes)",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 février 1730",
        lieu: "Linazay, Vienne, Nouvelle-Aquitaine, France"
      },
      remarque: ""
    }, {
      id: "I500313",
      prenom: "Charles Paul",
      nom: "Rotereau",
      generation: 4,
      partnerId: "I500312",
      pereId: "I500314",
      mereId: "I500315",
      estFratrie: false,
      naissance: {
        date: "12 janvier 1859",
        annee: 1859,
        lieu: "Vrécourt, Vosges, Grand Est, France"
      },
      deces: {
        date: "11 avril 1919",
        annee: 1919,
        lieu: "Paris 04, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Ebeniste",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 juillet 1891",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500315",
      prenom: "Rose Victorine",
      nom: "BROUILLET",
      generation: 3,
      partnerId: "I500314",
      pereId: "I500316",
      mereId: "I500317",
      estFratrie: false,
      naissance: {
        date: "13 juillet 1834",
        annee: 1834,
        lieu: "Vrécourt, 88140, Vosges, Lorraine"
      },
      deces: {
        date: "15 août 1879",
        annee: 1879,
        lieu: "Vrécourt 88 F, Val-de-Marne, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Lingère",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "22 juillet 1858",
        lieu: "Ivry-sur-Seine, Val-de-Marne, France"
      },
      remarque: ""
    }, {
      id: "I500317",
      prenom: "Marie",
      nom: "WATHELIEUX",
      generation: 2,
      partnerId: "I500316",
      pereId: "I500641",
      mereId: "I500642",
      estFratrie: false,
      naissance: {
        date: "1798",
        annee: 1798,
        lieu: "Vrécourt, Vosges, Grand Est, France"
      },
      deces: {
        date: "1877",
        annee: 1877,
        lieu: "Paris, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 octobre 1828",
        lieu: "Vrécourt, Vosges, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500642",
      prenom: "Denise",
      nom: "THOUVENEL",
      generation: 1,
      partnerId: "I500641",
      pereId: "I500643",
      mereId: "I500644",
      estFratrie: false,
      naissance: {
        date: "8 avril 1777",
        annee: 1777,
        lieu: "Vrécourt, 88140, Vosges, Lorraine"
      },
      deces: {
        date: "1 mai 1833",
        annee: 1833,
        lieu: "Vrécourt, 88140, Vosges, Lorraine",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 octobre 1797",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500644",
      prenom: "Marie",
      nom: "PERICARD",
      generation: 0,
      partnerId: "I500643",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1738",
        annee: 1738,
        lieu: ""
      },
      deces: {
        date: "13 septembre 1818",
        annee: 1818,
        lieu: "Vrécourt, Vosges, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1764",
        lieu: "Soulaucourt-Sur-Mouzon, Haute-Marne, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500643",
      prenom: "Ignace",
      nom: "THOUVENEL",
      generation: 0,
      partnerId: "I500644",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1736",
        annee: 1736,
        lieu: "Vrécourt, Vosges, Grand Est, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1764",
        lieu: "Soulaucourt-Sur-Mouzon, Haute-Marne, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500641",
      prenom: "Jacques",
      nom: "WATHELIEUX",
      generation: 1,
      partnerId: "I500642",
      pereId: "I500645",
      mereId: "I500646",
      estFratrie: false,
      naissance: {
        date: "9 avril 1762",
        annee: 1762,
        lieu: "Sailly-le-Sec, 80800, Somme, Picardie, FRANCE"
      },
      deces: {
        date: "17 octobre 1824",
        annee: 1824,
        lieu: "Vrécourt 88 F, Val-de-Marne, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cordonnier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "24 octobre 1797",
        lieu: ""
      },
      remarque: ""
    }, {
      id: "I500646",
      prenom: "Marie Madeleine",
      nom: "PRUVOT",
      generation: 0,
      partnerId: "I500645",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1734",
        annee: 1734,
        lieu: ""
      },
      deces: {
        date: "vers 1765",
        annee: 1765,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500645",
      prenom: "jacques",
      nom: "WATHELIEUX",
      generation: 0,
      partnerId: "I500646",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1728",
        annee: 1728,
        lieu: ""
      },
      deces: {
        date: "vers 1774",
        annee: 1774,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500316",
      prenom: "Jean Evre",
      nom: "BROUILLET",
      generation: 2,
      partnerId: "I500317",
      pereId: "I500618",
      mereId: "I500619",
      estFratrie: false,
      naissance: {
        date: "18 octobre 1807",
        annee: 1807,
        lieu: "Uriménil, Lorraine, France"
      },
      deces: {
        date: "1864",
        annee: 1864,
        lieu: "Paris, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Tailleur de pierre",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 octobre 1828",
        lieu: "Vrécourt, Vosges, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500619",
      prenom: "Anne Catherine",
      nom: "Tinlef",
      generation: 1,
      partnerId: "I500618",
      pereId: "I500624",
      mereId: "I500625",
      estFratrie: false,
      naissance: {
        date: "vers 1765",
        annee: 1765,
        lieu: "Uzemain, Vosges, Grand Est, France"
      },
      deces: {
        date: "19 mai 1822",
        annee: 1822,
        lieu: "Uriménil, Vosges, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1791",
        lieu: "Uriménil, Vosges, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500625",
      prenom: "Anne",
      nom: "ROMARY",
      generation: 0,
      partnerId: "I500624",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 juillet 1762",
        lieu: "Uzemain, Lorraine, France"
      },
      remarque: ""
    }, {
      id: "I500624",
      prenom: "Jean",
      nom: "TINLEF",
      generation: 0,
      partnerId: "I500625",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "5 mars 1732",
        annee: 1732,
        lieu: "Charmois-L'Orgueilleux, 88270, Vosges, Lorraine, FRANCE"
      },
      deces: {
        date: "23 août 1781",
        annee: 1781,
        lieu: "Uriménil, Vosges, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 juillet 1762",
        lieu: "Uzemain, Lorraine, France"
      },
      remarque: ""
    }, {
      id: "I500618",
      prenom: "Nicolas",
      nom: "BROUILLET",
      generation: 1,
      partnerId: "I500619",
      pereId: "I500620",
      mereId: "I500621",
      estFratrie: false,
      naissance: {
        date: "vers 1769",
        annee: 1769,
        lieu: "Épinal, Vosges, Lorraine, France"
      },
      deces: {
        date: "25 janvier 1833",
        annee: 1833,
        lieu: "Uriménil, Vosges, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1791",
        lieu: "Uriménil, Vosges, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500621",
      prenom: "Barbe",
      nom: "GOERY",
      generation: 0,
      partnerId: "I500620",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500620",
      prenom: "Pierre",
      nom: "BROUILLET",
      generation: 0,
      partnerId: "I500621",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500314",
      prenom: "Pierre Alexandre",
      nom: "ROTEREAU",
      generation: 3,
      partnerId: "I500315",
      pereId: "I500452",
      mereId: "I500453",
      estFratrie: false,
      naissance: {
        date: "9 octobre 1818",
        annee: 1818,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France"
      },
      deces: {
        date: "17 mars 1869",
        annee: 1869,
        lieu: "Paris 17ème Arrondissement, 75017, Paris, Île-de-France, FRANCE",
        cimetiere: "Cimetière de Montmartre (18e), Paris, Île-de-France, France"
      },
      profession: {
        metier: "Comptable",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "22 juillet 1858",
        lieu: "Ivry-sur-Seine, Val-de-Marne, France"
      },
      remarque: ""
    }, {
      id: "I500453",
      prenom: "Renée Françoise Jeanne",
      nom: "CHARPENTIER",
      generation: 2,
      partnerId: "I500452",
      pereId: "I500593",
      mereId: "I500594",
      estFratrie: false,
      naissance: {
        date: "30 juillet 1785",
        annee: 1785,
        lieu: "Machecoul 44270"
      },
      deces: {
        date: "28 juin 1826",
        annee: 1826,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 janvier 1812",
        lieu: "Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500594",
      prenom: "Renée",
      nom: "ARCHAMBAUD",
      generation: 1,
      partnerId: "I500593",
      pereId: "I500612",
      mereId: "I500613",
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: "Paroisse ste Croix - Machecoul, 44270, Loire-Atlantique, Pays de la Loire, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 octobre 1783",
        lieu: "Machecoul (La Trinité), Machecoul-Saint-Même, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500613",
      prenom: "Charlotte",
      nom: "MORICET",
      generation: 0,
      partnerId: "I500612",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500612",
      prenom: "Jean",
      nom: "ARCHAMBAUD",
      generation: 0,
      partnerId: "I500613",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500593",
      prenom: "Jean",
      nom: "CHARPENTIER",
      generation: 1,
      partnerId: "I500594",
      pereId: "I500614",
      mereId: "I500615",
      estFratrie: false,
      naissance: {
        date: "vers 1732",
        annee: 1732,
        lieu: "Saint-Léger-les-Vignes, 44710, Loire-Atlantique,"
      },
      deces: {
        date: "4 octobre 1785",
        annee: 1785,
        lieu: "Machecoul 44270",
        cimetiere: ""
      },
      profession: {
        metier: "Boucher",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 octobre 1783",
        lieu: "Machecoul (La Trinité), Machecoul-Saint-Même, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500615",
      prenom: "Marie",
      nom: "FETIVEAU",
      generation: 0,
      partnerId: "I500614",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500614",
      prenom: "Julien",
      nom: "CHARPENTIER",
      generation: 0,
      partnerId: "I500615",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500452",
      prenom: "Jean François",
      nom: "ROTEREAU",
      generation: 2,
      partnerId: "I500453",
      pereId: "I500590",
      mereId: "I500591",
      estFratrie: false,
      naissance: {
        date: "11 mars 1783",
        annee: 1783,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France"
      },
      deces: {
        date: "28 février 1860",
        annee: 1860,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cabaretier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "15 janvier 1812",
        lieu: "Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500591",
      prenom: "Marie Jeanne",
      nom: "CHEVECIER",
      generation: 1,
      partnerId: "I500590",
      pereId: "I500606",
      mereId: "I500607",
      estFratrie: false,
      naissance: {
        date: "1747",
        annee: 1747,
        lieu: ""
      },
      deces: {
        date: "1 novembre 1830",
        annee: 1830,
        lieu: "Nantes, Loire-Atlantique, Pays de la Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "12 avril 1768",
        lieu: "Nantes--Saint-Similien, Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500607",
      prenom: "Marie",
      nom: "DUGAST",
      generation: 0,
      partnerId: "I500606",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1718",
        annee: 1718,
        lieu: ""
      },
      deces: {
        date: "16 mars 1785",
        annee: 1785,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 avril 1744",
        lieu: "Nantes (St-Similien), Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500606",
      prenom: "Jean",
      nom: "CHEVESSIER /CHEVECIER",
      generation: 0,
      partnerId: "I500607",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1717",
        annee: 1717,
        lieu: ""
      },
      deces: {
        date: "21 août 1792",
        annee: 1792,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: "Nantes--Notre-Dame-de-la-Fosse, Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 avril 1744",
        lieu: "Nantes (St-Similien), Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500590",
      prenom: "Jean",
      nom: "ROTEREAU",
      generation: 1,
      partnerId: "I500591",
      pereId: "I500598",
      mereId: "I500599",
      estFratrie: false,
      naissance: {
        date: "1742",
        annee: 1742,
        lieu: "St-Bienheuré, Vendôme, Loir-Et-Cher, France"
      },
      deces: {
        date: "17 janvier 1801",
        annee: 1801,
        lieu: "Nantes, Loire Atlantique, Pays De La Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "12 avril 1768",
        lieu: "Nantes--Saint-Similien, Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      remarque: ""
    }, {
      id: "I500599",
      prenom: "Marie",
      nom: "BALLU",
      generation: 0,
      partnerId: "I500598",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500598",
      prenom: "Jean",
      nom: "ROTEREAU",
      generation: 0,
      partnerId: "I500599",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1720",
        annee: 1720,
        lieu: ""
      },
      deces: {
        date: "vers 1757",
        annee: 1757,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500016",
      prenom: "Victor Julien",
      nom: "MONSIGNY",
      generation: 5,
      partnerId: "I500017",
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: false,
      naissance: {
        date: "3 septembre 1877",
        annee: 1877,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 19ème arrondissement"
      },
      deces: {
        date: "8 février 1936",
        annee: 1936,
        lieu: "160 rue de Belleville, Paris, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Horloger",
        lieu: ""
      },
      domiciles: [{
        date: "1926",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: {
        date: "31 août 1899",
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement"
      },
      remarque: ""
    }, {
      id: "I500049",
      prenom: "Désirée Esther",
      nom: "FEUGUEUR",
      generation: 4,
      partnerId: "I500048",
      pereId: "I500126",
      mereId: "I500127",
      estFratrie: false,
      naissance: {
        date: "11 février 1838",
        annee: 1838,
        lieu: "Mainnevile, Eure, Normandie, France"
      },
      deces: {
        date: "26 décembre 1895",
        annee: 1895,
        lieu: "Rue de la chine,Paris 20, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Journalière",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "31 mars 1857",
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, belleville"
      },
      remarque: ""
    }, {
      id: "I500127",
      prenom: "Therese Agathe Joséphine",
      nom: "LELEU",
      generation: 3,
      partnerId: "I500126",
      pereId: "I500521",
      mereId: "I500522",
      estFratrie: false,
      naissance: {
        date: "3 mai 1799",
        annee: 1799,
        lieu: "Martagny 27"
      },
      deces: {
        date: "22 octobre 1869",
        annee: 1869,
        lieu: "Etrépagny 27",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 mars 1823",
        lieu: "Martagny"
      },
      remarque: ""
    }, {
      id: "I500522",
      prenom: "Marie Catherine Joséphine",
      nom: "SENCE",
      generation: 2,
      partnerId: "I500521",
      pereId: "I500572",
      mereId: "I500571",
      estFratrie: false,
      naissance: {
        date: "14 octobre 1761",
        annee: 1761,
        lieu: "Bézu-la-Forêt 27"
      },
      deces: {
        date: "1 mars 1842",
        annee: 1842,
        lieu: "Martagny, Eure, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "21 novembre 1785",
        lieu: "Bézu-la-Forêt"
      },
      remarque: ""
    }, {
      id: "I500571",
      prenom: "Marie Madeleine Nicole",
      nom: "Goulle",
      generation: 1,
      partnerId: "I500572",
      pereId: "I500587",
      mereId: "I500588",
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "16 juillet 1755",
        lieu: "Gancourt-Saint-Étienne, Seine-Maritime, Normandy, France"
      },
      remarque: ""
    }, {
      id: "I500588",
      prenom: "Marie",
      nom: "Le Long",
      generation: 0,
      partnerId: "I500587",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500587",
      prenom: "Claude",
      nom: "Goulle",
      generation: 0,
      partnerId: "I500588",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Charpentier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500572",
      prenom: "Jean",
      nom: "SENCE",
      generation: 1,
      partnerId: "I500571",
      pereId: "I500573",
      mereId: "I500574",
      estFratrie: false,
      naissance: {
        date: "30 juin 1722",
        annee: 1722,
        lieu: "Gancourt-Saint-Étienne, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "3 octobre 1781",
        annee: 1781,
        lieu: "Villers-Vermont, Oise, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Laboureur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "16 juillet 1755",
        lieu: "Gancourt-Saint-Étienne, Seine-Maritime, Normandy, France"
      },
      remarque: ""
    }, {
      id: "I500574",
      prenom: "Marguerite Geneviève",
      nom: "BROCHE",
      generation: 0,
      partnerId: "I500573",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 octobre 1696",
        annee: 1696,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "après 11 mars 1728",
        annee: 1728,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "4 JUL 1718",
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      }],
      mariage: {
        date: "4 juillet 1718",
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500573",
      prenom: "Nicolas",
      nom: "SENCE",
      generation: 0,
      partnerId: "I500574",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "24 février 1667",
        annee: 1667,
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      },
      deces: {
        date: "24 août 1727",
        annee: 1727,
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France",
        cimetiere: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      },
      profession: {
        metier: "Laboureur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "4 juillet 1718",
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500521",
      prenom: "Jean Charles",
      nom: "LELEU",
      generation: 2,
      partnerId: "I500522",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: "Martagny Eure, France"
      },
      deces: null,
      profession: {
        metier: "Domestique",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "21 novembre 1785",
        lieu: "Bézu-la-Forêt"
      },
      remarque: ""
    }, {
      id: "I500126",
      prenom: "Prosper André",
      nom: "FEUGUEUR",
      generation: 3,
      partnerId: "I500127",
      pereId: "I500518",
      mereId: "I500519",
      estFratrie: false,
      naissance: {
        date: "29 avril 1800",
        annee: 1800,
        lieu: "Martagny Eure, France"
      },
      deces: {
        date: "27 février 1855",
        annee: 1855,
        lieu: "Mainneville, Eure, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "Tonnelier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "20 mars 1823",
        lieu: "Martagny"
      },
      remarque: ""
    }, {
      id: "I500519",
      prenom: "Marie Aimée Julie",
      nom: "Florent",
      generation: 2,
      partnerId: "I500518",
      pereId: "I500523",
      mereId: "I500524",
      estFratrie: false,
      naissance: {
        date: "1770",
        annee: 1770,
        lieu: ""
      },
      deces: {
        date: "26 décembre 1818",
        annee: 1818,
        lieu: "Au Hameau au Bord des Bois Martagny Eure, ,",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 avril 1790",
        lieu: "Bézu-La-Forêt, Eure, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500524",
      prenom: "Geneviève",
      nom: "VAULTIER",
      generation: 1,
      partnerId: "I500523",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500523",
      prenom: "Simon",
      nom: "FLORENT",
      generation: 1,
      partnerId: "I500524",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500518",
      prenom: "Pierre Francois",
      nom: "Feugueur",
      generation: 2,
      partnerId: "I500519",
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: false,
      naissance: {
        date: "11 juin 1768",
        annee: 1768,
        lieu: "Longchamps, Eure, Normandie, France"
      },
      deces: {
        date: "1825",
        annee: 1825,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Tonnelier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 avril 1790",
        lieu: "Bézu-La-Forêt, Eure, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500527",
      prenom: "Marie, Magdeleine",
      nom: "FÉRON",
      generation: 1,
      partnerId: "I500526",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "16 septembre 1733",
        annee: 1733,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: {
        date: "10 avril 1808",
        annee: 1808,
        lieu: "Longchamps, Eure, Haute-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 juillet 1756",
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500526",
      prenom: "joseph",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: "I500527",
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: false,
      naissance: {
        date: "18 mars 1732",
        annee: 1732,
        lieu: "Longchamps 27"
      },
      deces: {
        date: "23 février 1810",
        annee: 1810,
        lieu: "Heudicourt, Eure, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "Tonnelier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "27 juillet 1756",
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500537",
      prenom: "Anne",
      nom: "DUHAMEL",
      generation: 0,
      partnerId: "I500536",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "11 novembre 1695",
        annee: 1695,
        lieu: "Longchamps 27"
      },
      deces: {
        date: "9 mars 1762",
        annee: 1762,
        lieu: "Longchamps, Eure, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1728",
        lieu: "Longchamps, 27150, Eure, Haute-Normandie, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500536",
      prenom: "Jacques",
      nom: "FEUGUEUR",
      generation: 0,
      partnerId: "I500537",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "16 mars 1701",
        annee: 1701,
        lieu: "Longchamps, 27150, EURE, Haute-Normandie, FR"
      },
      deces: {
        date: "15 octobre 1761",
        annee: 1761,
        lieu: "Longchamps, Eure, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "tonnelier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1728",
        lieu: "Longchamps, 27150, Eure, Haute-Normandie, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500048",
      prenom: "Henri Aimable",
      nom: "MONSIGNY",
      generation: 4,
      partnerId: "I500049",
      pereId: "I500057",
      mereId: "I500058",
      estFratrie: false,
      naissance: {
        date: "6 avril 1831",
        annee: 1831,
        lieu: "98 rue de Tournay, Lille"
      },
      deces: {
        date: "14 mai 1898",
        annee: 1898,
        lieu: "Paris 20EME, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Estampeur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "31 mars 1857",
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, belleville"
      },
      remarque: ""
    }, {
      id: "I500058",
      prenom: "Catherine Louise",
      nom: "Michel",
      generation: 3,
      partnerId: "I500057",
      pereId: "I500125",
      mereId: "I500124",
      estFratrie: false,
      naissance: {
        date: "23 janvier 1802",
        annee: 1802,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "26 novembre 1868",
        annee: 1868,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement",
        cimetiere: "Cimetière du Père-Lachaise (20e), Paris, Île-de-France, France"
      },
      profession: {
        metier: "Tisserande",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "13 novembre 1820",
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500124",
      prenom: "Florentine",
      nom: "DUBOR",
      generation: 2,
      partnerId: "I500125",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500125",
      prenom: "Gaspard Joseph",
      nom: "MICHEL",
      generation: 2,
      partnerId: "I500124",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500057",
      prenom: "Jean Baptiste Louis",
      nom: "MONSIGNY",
      generation: 3,
      partnerId: "I500058",
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: false,
      naissance: {
        date: "7 avril 1799",
        annee: 1799,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "24 avril 1862",
        annee: 1862,
        lieu: "Hôpital de la Charité, rue des Saints-Pères, Paris",
        cimetiere: "Cimetière de Montparnasse (14e), Paris, Île-de-France, France"
      },
      profession: {
        metier: "Fileur",
        lieu: ""
      },
      domiciles: [{
        date: "",
        lieu: "18 rue Romainville, Paris"
      }],
      mariage: {
        date: "13 novembre 1820",
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500110",
      prenom: "Augustine Josephe",
      nom: "ROUSSEL",
      generation: 2,
      partnerId: "I500109",
      pereId: "I500174",
      mereId: "I500175",
      estFratrie: false,
      naissance: {
        date: "25 février 1767",
        annee: 1767,
        lieu: "Saint-Omer, 62765, Pas-de-Calais, Nord-Pas-de-Calais, France"
      },
      deces: {
        date: "9 mars 1821",
        annee: 1821,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "2 juin 1789",
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE, saint sépulcre"
      },
      remarque: ""
    }, {
      id: "I500175",
      prenom: "Jeanne, Louise, Thérèse",
      nom: "LEMAIRE",
      generation: 1,
      partnerId: "I500174",
      pereId: "I500190",
      mereId: "I500191",
      estFratrie: false,
      naissance: {
        date: "vers 1733",
        annee: 1733,
        lieu: "[Paroisse Saint-Denis] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "après juin 1789",
        annee: 1789,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "5 octobre 1756",
        lieu: "[Paroisse Saint-Denis] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500191",
      prenom: "Catherine, Thérèse",
      nom: "HARDY",
      generation: 0,
      partnerId: "I500190",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "après octobre 1756",
        annee: 1756,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500190",
      prenom: "Louis",
      nom: "LEMAIRE",
      generation: 0,
      partnerId: "I500191",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "après octobre 1756",
        annee: 1756,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500174",
      prenom: "Jean Baptiste Joseph",
      nom: "ROUSSEL",
      generation: 1,
      partnerId: "I500175",
      pereId: "I500188",
      mereId: "I500189",
      estFratrie: false,
      naissance: {
        date: "22 août 1735",
        annee: 1735,
        lieu: "Saint-Omer, Pas-de-Calais, Hauts-de-France, France"
      },
      deces: {
        date: "20 août 1801",
        annee: 1801,
        lieu: "Saint Omer, Nord Pas de Calais",
        cimetiere: ""
      },
      profession: {
        metier: "Marchand amidonnier (1767)",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "5 octobre 1756",
        lieu: "[Paroisse Saint-Denis] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      remarque: ""
    }, {
      id: "I500189",
      prenom: "Marie-Claire, Alexis",
      nom: "GRESSIER",
      generation: 0,
      partnerId: "I500188",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "après octobre 1756",
        annee: 1756,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500188",
      prenom: "Jean",
      nom: "ROUSSEL",
      generation: 0,
      partnerId: "I500189",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "avant octobre 1756",
        annee: 1756,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Marchand amidonnier (1735)",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500109",
      prenom: "Antoine Joseph",
      nom: "MONSIGNY",
      generation: 2,
      partnerId: "I500110",
      pereId: "I500168",
      mereId: "I500169",
      estFratrie: false,
      naissance: {
        date: "1769",
        annee: 1769,
        lieu: "[paroisse Saint Sépulcre] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "1 avril 1839",
        annee: 1839,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "charpentier (1830)",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "2 juin 1789",
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE, saint sépulcre"
      },
      remarque: ""
    }, {
      id: "I500169",
      prenom: "Françoise Marie Colombe",
      nom: "DETHE",
      generation: 1,
      partnerId: "I500168",
      pereId: "I500172",
      mereId: "I500173",
      estFratrie: false,
      naissance: {
        date: "10 avril 1732",
        annee: 1732,
        lieu: "Saint-Omer, Pas-De-Calais, Hauts-De-France, France"
      },
      deces: {
        date: "24 février 1780",
        annee: 1780,
        lieu: "[paroisse Saint Sépulcre] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: "[paroisse Saint Sépulcre] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "12 février 1760",
        lieu: "Saint-Omer, Pas-De-Calais, Hauts-De-France, France"
      },
      remarque: ""
    }, {
      id: "I500173",
      prenom: "Marie-Antoinette",
      nom: "PRUVOST",
      generation: 0,
      partnerId: "I500172",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1706",
        annee: 1706,
        lieu: ""
      },
      deces: {
        date: "après février 1760",
        annee: 1760,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1 août 1730",
        lieu: "St Omer (St Sepulcre)"
      },
      remarque: ""
    }, {
      id: "I500172",
      prenom: "Jean",
      nom: "DETHE",
      generation: 0,
      partnerId: "I500173",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1694",
        annee: 1694,
        lieu: "Confolens, Charente, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "avant 12 février 1760",
        annee: 1760,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "1 août 1730",
        lieu: "St Omer (St Sepulcre)"
      },
      remarque: ""
    }, {
      id: "I500168",
      prenom: "Claude, Antoine",
      nom: "DE MONSIGNY",
      generation: 1,
      partnerId: "I500169",
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: false,
      naissance: {
        date: "26 mars 1724",
        annee: 1724,
        lieu: "Doudeauville, Pas-de-Calais, Hauts-de-France, France"
      },
      deces: {
        date: "29 juillet 1790",
        annee: 1790,
        lieu: "[paroisse Saint Sépulcre] - Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "Ouvrier drapier (1760) - Compagnon drapier (1760)",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "12 février 1760",
        lieu: "Saint-Omer, Pas-De-Calais, Hauts-De-France, France"
      },
      remarque: ""
    }, {
      id: "I500171",
      prenom: "Marie Françoise Marguerite",
      nom: "DENQUIN",
      generation: 0,
      partnerId: "I500170",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "10 septembre 1686",
        annee: 1686,
        lieu: "Doudeauville, 62830, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "29 octobre 1741",
        annee: 1741,
        lieu: "Doudeauville, 62830, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 mai 1709",
        lieu: "Doudeauville, Pas-de-Calais, Hauts-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500170",
      prenom: "Daniel",
      nom: "DE MONSIGNY",
      generation: 0,
      partnerId: "I500171",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "18 mars 1682",
        annee: 1682,
        lieu: "Desvres, 62240, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "14 mars 1747",
        annee: 1747,
        lieu: "Vieil-Moutier, 62240, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "Sieur de Grossilière - Praticien",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 mai 1709",
        lieu: "Doudeauville, Pas-de-Calais, Hauts-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500592",
      prenom: "Françoise Alexandrine",
      nom: "ROTEREAU",
      generation: 3,
      partnerId: null,
      pereId: "I500452",
      mereId: "I500453",
      estFratrie: true,
      naissance: {
        date: "14 octobre 1813",
        annee: 1813,
        lieu: "Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      deces: {
        date: "8 octobre 1842",
        annee: 1842,
        lieu: "Tivernon (table), Tivernon, Loiret, Centre-Val de Loire, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500595",
      prenom: "François Esprit",
      nom: "ROTEREAU",
      generation: 3,
      partnerId: null,
      pereId: "I500452",
      mereId: "I500453",
      estFratrie: true,
      naissance: {
        date: "6 décembre 1816",
        annee: 1816,
        lieu: "Nantes, Loire-Atlantique, Pays de la Loire, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500597",
      prenom: "Marie Marguerite",
      nom: "ROTÉREAU",
      generation: 2,
      partnerId: null,
      pereId: "I500590",
      mereId: "I500591",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500628",
      prenom: "Jean Baptiste",
      nom: "TINLEF",
      generation: 1,
      partnerId: null,
      pereId: "I500624",
      mereId: "I500625",
      estFratrie: true,
      naissance: {
        date: "1763",
        annee: 1763,
        lieu: "Uriménil, Lorraine, France"
      },
      deces: {
        date: "26 novembre 1801",
        annee: 1801,
        lieu: "Uriménil, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "maçon",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500738",
      prenom: "Marie Marthe",
      nom: "GIRARDIN",
      generation: 1,
      partnerId: null,
      pereId: "I500668",
      mereId: "I500669",
      estFratrie: true,
      naissance: {
        date: "14 avril 1737",
        annee: 1737,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "23 octobre 1818",
        annee: 1818,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500739",
      prenom: "Marie",
      nom: "GIRARDIN",
      generation: 1,
      partnerId: null,
      pereId: "I500668",
      mereId: "I500669",
      estFratrie: true,
      naissance: {
        date: "25 novembre 1740",
        annee: 1740,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "20 mars 1790",
        annee: 1790,
        lieu: "Champagné-Le-Sec, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500659",
      prenom: "Pierre",
      nom: "GIRARDIN",
      generation: 2,
      partnerId: null,
      pereId: "I500657",
      mereId: "I500658",
      estFratrie: true,
      naissance: {
        date: "22 octobre 1773",
        annee: 1773,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "13 décembre 1841",
        annee: 1841,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500660",
      prenom: "Jean Pierre",
      nom: "GIRARDIN",
      generation: 2,
      partnerId: null,
      pereId: "I500657",
      mereId: "I500658",
      estFratrie: true,
      naissance: {
        date: "3 août 1776",
        annee: 1776,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500661",
      prenom: "Anne",
      nom: "GIRARDIN",
      generation: 2,
      partnerId: null,
      pereId: "I500657",
      mereId: "I500658",
      estFratrie: true,
      naissance: {
        date: "28 décembre 1779",
        annee: 1779,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "4 décembre 1867",
        annee: 1867,
        lieu: "Civray, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500540",
      prenom: "Pierre, Jacques",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: null,
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: true,
      naissance: {
        date: "5 décembre 1728",
        annee: 1728,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500541",
      prenom: "Jacques, Pierre",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: null,
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: true,
      naissance: {
        date: "3 août 1730",
        annee: 1730,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500542",
      prenom: "Marie, Anne",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: null,
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: true,
      naissance: {
        date: "28 octobre 1733",
        annee: 1733,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500543",
      prenom: "Jacques, Mathurin",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: null,
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: true,
      naissance: {
        date: "6 avril 1735",
        annee: 1735,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: {
        date: "21 janvier 1737",
        annee: 1737,
        lieu: "Longchamps, Eure, Haute-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500544",
      prenom: "Pierre, Jacques",
      nom: "FEUGUEUR",
      generation: 1,
      partnerId: null,
      pereId: "I500536",
      mereId: "I500537",
      estFratrie: true,
      naissance: {
        date: "1 février 1737",
        annee: 1737,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500272",
      prenom: "MARIE FRANCOISE JOSEPHE",
      nom: "MONSIGNY",
      generation: 2,
      partnerId: null,
      pereId: "I500168",
      mereId: "I500169",
      estFratrie: true,
      naissance: {
        date: "27 janvier 1761",
        annee: 1761,
        lieu: "St Omer (St Sepulcre)"
      },
      deces: {
        date: "30 août 1834",
        annee: 1834,
        lieu: "Saint-Omer, Pas-De-Calais, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500273",
      prenom: "FRANCOIS JOSEPH",
      nom: "MONSIGNY",
      generation: 2,
      partnerId: null,
      pereId: "I500168",
      mereId: "I500169",
      estFratrie: true,
      naissance: {
        date: "30 décembre 1762",
        annee: 1762,
        lieu: "Saint-Omer, Pas-De-Calais, Hauts-De-France, France"
      },
      deces: {
        date: "après 1790",
        annee: 1790,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "tisseur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500320",
      prenom: "Paul Auguste",
      nom: "GIRARDIN",
      generation: 4,
      partnerId: null,
      pereId: "I500318",
      mereId: "I500319",
      estFratrie: true,
      naissance: {
        date: "22 avril 1855",
        annee: 1855,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500321",
      prenom: "Alexandre",
      nom: "GIRARDIN",
      generation: 4,
      partnerId: null,
      pereId: "I500318",
      mereId: "I500319",
      estFratrie: true,
      naissance: {
        date: "19 décembre 1857",
        annee: 1857,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "27 décembre 1857",
        annee: 1857,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500525",
      prenom: "Marie Rose Victoire",
      nom: "FEUGUEUR",
      generation: 3,
      partnerId: null,
      pereId: "I500518",
      mereId: "I500519",
      estFratrie: true,
      naissance: {
        date: "1793",
        annee: 1793,
        lieu: "Martagny, Eure, Normandie, France"
      },
      deces: {
        date: "7 juillet 1841",
        annee: 1841,
        lieu: "Bézu-La-Forêt, Eure, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500520",
      prenom: "Philippe Benoit",
      nom: "Feugueur",
      generation: 3,
      partnerId: null,
      pereId: "I500518",
      mereId: "I500519",
      estFratrie: true,
      naissance: {
        date: "12 février 1797",
        annee: 1797,
        lieu: "Martagny, Eure, Normandie, France"
      },
      deces: {
        date: "22 novembre 1860",
        annee: 1860,
        lieu: "Bézu-la-Forêt, 27480, Eure, Haute-Normandie, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1849",
        lieu: "Bosquentin, Eure, Normandie, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500059",
      prenom: "Gustave Lucien",
      nom: "Monsigny",
      generation: 5,
      partnerId: null,
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: true,
      naissance: {
        date: "23 mai 1859",
        annee: 1859,
        lieu: "Belleville, Paris, Île-de-France, France"
      },
      deces: {
        date: "9 octobre 1937",
        annee: 1937,
        lieu: "Sucy-en-Brie, Val-de-Marne, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "bijoutier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500091",
      prenom: "Louis Jules Marie",
      nom: "Monsigny",
      generation: 5,
      partnerId: null,
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: true,
      naissance: {
        date: "11 mai 1861",
        annee: 1861,
        lieu: "Paris 19EME, Paris, Île-de-France, France"
      },
      deces: {
        date: "19 mai 1899",
        annee: 1899,
        lieu: "Lilas, Les Lilas, Seine-Saint-Denis, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500089",
      prenom: "Leonie Juliette",
      nom: "MONSIGNY",
      generation: 5,
      partnerId: null,
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: true,
      naissance: {
        date: "28 septembre 1881",
        annee: 1881,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement"
      },
      deces: {
        date: "24 février 1882",
        annee: 1882,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement",
        cimetiere: "Cimetière parisien de Saint-Ouen (93), Saint-Ouen-sur-Seine, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500061",
      prenom: "Louis Marius",
      nom: "MONSIGNY",
      generation: 5,
      partnerId: null,
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: true,
      naissance: {
        date: "vers 27 décembre 1881",
        annee: 1881,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 20 eme arrondissement"
      },
      deces: {
        date: "21 décembre 1926",
        annee: 1926,
        lieu: "Hôpital Fernand-Widal, Paris",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Tourneur",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Saint-Maur-des-Fossés, Val-de-Marne, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500090",
      prenom: "Josephine",
      nom: "MONSIGNY",
      generation: 5,
      partnerId: null,
      pereId: "I500048",
      mereId: "I500049",
      estFratrie: true,
      naissance: {
        date: "24 juin 1883",
        annee: 1883,
        lieu: "Paris 20EME, Paris, Île-de-France, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1926",
        lieu: "Folie-Méricourt, 11e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500111",
      prenom: "Antoine Alexandre",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "21 décembre 1790",
        annee: 1790,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500112",
      prenom: "Victoire Jeanne",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "5 mai 1793",
        annee: 1793,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500114",
      prenom: "Charlotte Bétanie",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "12 février 1795",
        annee: 1795,
        lieu: "Ommeray (Omerey), Ommeray, Moselle, Grand Est, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500113",
      prenom: "Louis Auguste",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "17 novembre 1797",
        annee: 1797,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "16 avril 1842",
        annee: 1842,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "journalier (1830)",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500115",
      prenom: "Omer Felix Joseph",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "24 décembre 1801",
        annee: 1801,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500116",
      prenom: "Sophie Bernadine",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "4 juin 1804",
        annee: 1804,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500117",
      prenom: "Constant Joseph Eugéne",
      nom: "Monsigny",
      generation: 3,
      partnerId: null,
      pereId: "I500109",
      mereId: "I500110",
      estFratrie: true,
      naissance: {
        date: "6 septembre 1806",
        annee: 1806,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "5 janvier 1873",
        annee: 1873,
        lieu: "Lille, 59000, Nord, Nord-Pas-de-Calais, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "contre maitre",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500575",
      prenom: "Marguerite",
      nom: "SENCE",
      generation: 1,
      partnerId: null,
      pereId: "I500573",
      mereId: "I500574",
      estFratrie: true,
      naissance: {
        date: "27 février 1719",
        annee: 1719,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "8 décembre 1729",
        annee: 1729,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500576",
      prenom: "Pierre",
      nom: "SENCE",
      generation: 1,
      partnerId: null,
      pereId: "I500573",
      mereId: "I500574",
      estFratrie: true,
      naissance: {
        date: "9 juillet 1720",
        annee: 1720,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "21 septembre 1721",
        annee: 1721,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500577",
      prenom: "Charles Alexandre",
      nom: "SENCE",
      generation: 1,
      partnerId: null,
      pereId: "I500573",
      mereId: "I500574",
      estFratrie: true,
      naissance: {
        date: "3 mai 1725",
        annee: 1725,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "après 1773",
        annee: 1773,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Journalier",
        lieu: ""
      },
      domiciles: [{
        date: "20 MAY 1749",
        lieu: "Grumesnil, 76332, Seine-Maritime, Normandie, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500578",
      prenom: "Pierre",
      nom: "SENCE",
      generation: 1,
      partnerId: null,
      pereId: "I500573",
      mereId: "I500574",
      estFratrie: true,
      naissance: {
        date: "11 mars 1728",
        annee: 1728,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "8 décembre 1729",
        annee: 1729,
        lieu: "Grumesnil, Seine-Maritime, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500674",
      prenom: "Marie",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "27 août 1698",
        annee: 1698,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500675",
      prenom: "Charles",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "9 octobre 1701",
        annee: 1701,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "après 6 janvier 1751",
        annee: 1751,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500676",
      prenom: "Marguerite",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "4 janvier 1704",
        annee: 1704,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500677",
      prenom: "Jean",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 1706",
        annee: 1706,
        lieu: ""
      },
      deces: {
        date: "5 janvier 1751",
        annee: 1751,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500678",
      prenom: "Philibert",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "2 août 1707",
        annee: 1707,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500679",
      prenom: "Suzanne",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "19 septembre 1709",
        annee: 1709,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500680",
      prenom: "François",
      nom: "GIRARDIN",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "21 février 1712",
        annee: 1712,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500118",
      prenom: "Jean Batiste Auguste Joseph",
      nom: "Monsigny",
      generation: 4,
      partnerId: null,
      pereId: "I500057",
      mereId: "I500058",
      estFratrie: true,
      naissance: {
        date: "29 avril 1821",
        annee: 1821,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: {
        date: "16 mars 1888",
        annee: 1888,
        lieu: "Paris, 75000, Paris, Île-de-France, FRANCE, 13ème arrondissement",
        cimetiere: "Cimetière parisien d'Ivry (94), Ivry-sur-Seine, Val-de-Marne, Île-de-France, France"
      },
      profession: {
        metier: "chapelier, commis voyageur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500119",
      prenom: "Catherine Louise",
      nom: "Monsigny",
      generation: 4,
      partnerId: null,
      pereId: "I500057",
      mereId: "I500058",
      estFratrie: true,
      naissance: {
        date: "3 avril 1823",
        annee: 1823,
        lieu: "Saint-Omer, 62500, Pas-de-Calais, Nord-Pas-de-Calais, FRANCE"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501288",
      prenom: "Marie-Anne",
      nom: "FEUGUEUR",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "21 novembre 1704",
        annee: 1704,
        lieu: "Longchamps, Eure, Normandie, France"
      },
      deces: {
        date: "12 juin 1726",
        annee: 1726,
        lieu: "Longchamps, Eure, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500662",
      prenom: "Louis",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "3 avril 1815",
        annee: 1815,
        lieu: "Chaunay, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "10 décembre 1887",
        annee: 1887,
        lieu: "Aubusson, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500663",
      prenom: "Alexandrine",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "15 septembre 1820",
        annee: 1820,
        lieu: "Couhé, Vienne, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "9 juillet 1887",
        annee: 1887,
        lieu: "Toulouse, Haute-Garonne, Occitanie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500664",
      prenom: "Olivier",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "vers 1822",
        annee: 1822,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500665",
      prenom: "Louis Alexis",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "13 juillet 1824",
        annee: 1824,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "24 juin 1905",
        annee: 1905,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500666",
      prenom: "Louis",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "18 décembre 1826",
        annee: 1826,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "16 août 1905",
        annee: 1905,
        lieu: "Bessines-Sur-Gartempe, Haute-Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500667",
      prenom: "Michel",
      nom: "GIRARDIN",
      generation: 3,
      partnerId: null,
      pereId: "I500655",
      mereId: "I500656",
      estFratrie: true,
      naissance: {
        date: "3 août 1829",
        annee: 1829,
        lieu: "Limalonges, Deux-Sèvres, Nouvelle-Aquitaine, France"
      },
      deces: {
        date: "5 mars 1911",
        annee: 1911,
        lieu: "La Souterraine, Creuse, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501225",
      prenom: "Daniel Joseph",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "28 mai 1710",
        annee: 1710,
        lieu: "Doudauville, France"
      },
      deces: {
        date: "7 mai 1715",
        annee: 1715,
        lieu: "Desvres, Pas-De-Calais, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501226",
      prenom: "Marie Françoise",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "24 février 1712",
        annee: 1712,
        lieu: "Saint-Martin-Choquel, Pas-De-Calais, Hauts-De-France, France"
      },
      deces: {
        date: "26 juin 1751",
        annee: 1751,
        lieu: "Courset, Pas-De-Calais, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501227",
      prenom: "Barthelemy",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "10 juillet 1714",
        annee: 1714,
        lieu: "Saint-Martin-Choquel, Pas-De-Calais, Hauts-De-France, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501228",
      prenom: "Marie Anne",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "13 octobre 1716",
        annee: 1716,
        lieu: "Desvres, Pas-De-Calais, Hauts-De-France, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500970",
      prenom: "Daniel",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "17 avril 1719",
        annee: 1719,
        lieu: "Doudauville, France"
      },
      deces: {
        date: "22 mars 1784",
        annee: 1784,
        lieu: "Vieil-Moutier, Pas-De-Calais, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501229",
      prenom: "Marie Jeanne",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "6 mars 1721",
        annee: 1721,
        lieu: "Doudauville, France"
      },
      deces: {
        date: "1 février 1779",
        annee: 1779,
        lieu: "Lottinghen, Pas-De-Calais, Hauts-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501230",
      prenom: "Marie Marguerite Claudine",
      nom: "MONSIGNY",
      generation: 1,
      partnerId: null,
      pereId: "I500170",
      mereId: "I500171",
      estFratrie: true,
      naissance: {
        date: "25 août 1726",
        annee: 1726,
        lieu: "Doudauville, France"
      },
      deces: {
        date: "29 octobre 1741",
        annee: 1741,
        lieu: "Doudauville, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500528",
      prenom: "Marie, Magdeleine",
      nom: "FEUGUEUR",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "13 mars 1758",
        annee: 1758,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: {
        date: "22 juillet 1760",
        annee: 1760,
        lieu: "Longchamps, Eure, Haute-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500529",
      prenom: "Joseph",
      nom: "Feugueur",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "11 juillet 1761",
        annee: 1761,
        lieu: "Longchamps, 27150, EURE, Haute-Normandie, FR"
      },
      deces: {
        date: "16 janvier 1840",
        annee: 1840,
        lieu: "Hébécourt, 27150, EURE, Haute-Normandie, FR",
        cimetiere: ""
      },
      profession: {
        metier: "Tonnelier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500530",
      prenom: "Mathurin Guillaume",
      nom: "Feugueur",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "5 novembre 1763",
        annee: 1763,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: {
        date: "1 juin 1791",
        annee: 1791,
        lieu: "Bezu-la-Foret, Eure, Haute-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500531",
      prenom: "Marie Madeline Prudence",
      nom: "Feugueur",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "1766",
        annee: 1766,
        lieu: ""
      },
      deces: {
        date: "1825",
        annee: 1825,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500532",
      prenom: "Marie Rose Victoire",
      nom: "Feugueur",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "13 mars 1773",
        annee: 1773,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500533",
      prenom: "François Barnabé",
      nom: "Feugueur",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "11 juin 1775",
        annee: 1775,
        lieu: "Longchamps, Eure, Haute-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500534",
      prenom: "Marie, Catherine, Julie",
      nom: "FEUGUEUR",
      generation: 2,
      partnerId: null,
      pereId: "I500526",
      mereId: "I500527",
      estFratrie: true,
      naissance: {
        date: "1776",
        annee: 1776,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500693",
      prenom: "Anne",
      nom: "POUPART",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "1717",
        annee: 1717,
        lieu: "Linazay, 86134, Vienne, Poitou-Charentes, France"
      },
      deces: {
        date: "12 octobre 1782",
        annee: 1782,
        lieu: "Saint-Romain, 86242, Vienne, Poitou-Charentes, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500740",
      prenom: "Charles",
      nom: "POUPART",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "après 14 septembre 1746",
        annee: 1746,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500741",
      prenom: "Louis",
      nom: "POUPART",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "après 14 septembre 1746",
        annee: 1746,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501213",
      prenom: "Jean",
      nom: "SENCE",
      generation: 2,
      partnerId: null,
      pereId: "I500572",
      mereId: "I500571",
      estFratrie: true,
      naissance: {
        date: "4 octobre 1755",
        annee: 1755,
        lieu: "Gancourt-Saint-Étienne, Seine-Maritime, Normandy, France"
      },
      deces: {
        date: "28 novembre 1838",
        annee: 1838,
        lieu: "Gancourt-Saint-Étienne, Seine-Maritime, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500432",
      prenom: "Jean Charles",
      nom: "Rotereau",
      generation: 5,
      partnerId: null,
      pereId: "I500313",
      mereId: "I500312",
      estFratrie: true,
      naissance: {
        date: "24 novembre 1872",
        annee: 1872,
        lieu: ""
      },
      deces: {
        date: "18 novembre 1918",
        annee: 1918,
        lieu: "4 rue de la Chine = Hôpital Tenon, Paris 20e.",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "Camionneur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501569",
      prenom: "Margueritte Sophie",
      nom: "NERNUY",
      generation: 3,
      partnerId: null,
      pereId: "I500448",
      mereId: "I500449",
      estFratrie: true,
      naissance: {
        date: "8 avril 1832",
        annee: 1832,
        lieu: "la-souterraine, La Souterraine, Creuse, Nouvelle-Aquitaine, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500218",
      prenom: "Marie Aldegonde Alexandrine Josephe",
      nom: "ROUSSEL",
      generation: 2,
      partnerId: null,
      pereId: "I500174",
      mereId: "I500175",
      estFratrie: true,
      naissance: {
        date: "1766",
        annee: 1766,
        lieu: "St Omer (St Denis)"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500050",
      prenom: "Marcel Paul Henri",
      nom: "Monsigny",
      generation: 6,
      partnerId: null,
      pereId: "I500016",
      mereId: "I500017",
      estFratrie: true,
      naissance: {
        date: "27 octobre 1899",
        annee: 1899,
        lieu: "13 rue des Gâtines, Paris 20e"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500018",
      prenom: "Yvonne Julienne",
      nom: "Monsigny",
      generation: 6,
      partnerId: null,
      pereId: "I500016",
      mereId: "I500017",
      estFratrie: true,
      naissance: {
        date: "20 novembre 1904",
        annee: 1904,
        lieu: "Paris, Île-de-France, France"
      },
      deces: {
        date: "30 décembre 1969",
        annee: 1969,
        lieu: "villejuif, Val-de-Marne",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1926",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "Belleville, 20e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500622",
      prenom: "Marie",
      nom: "BROUILLET",
      generation: 2,
      partnerId: null,
      pereId: "I500618",
      mereId: "I500619",
      estFratrie: true,
      naissance: {
        date: "4 octobre 1791",
        annee: 1791,
        lieu: "Uriménil, Lorraine, France"
      },
      deces: {
        date: "22 mars 1852",
        annee: 1852,
        lieu: "Uriménil, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500623",
      prenom: "Joseph",
      nom: "BROUILLET",
      generation: 2,
      partnerId: null,
      pereId: "I500618",
      mereId: "I500619",
      estFratrie: true,
      naissance: {
        date: "6 août 1793",
        annee: 1793,
        lieu: "Uriménil, Lorraine, France"
      },
      deces: {
        date: "28 août 1793",
        annee: 1793,
        lieu: "Uriménil, Lorraine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500596",
      prenom: "Pauline Louise",
      nom: "ROTEREAU",
      generation: 4,
      partnerId: null,
      pereId: "I500314",
      mereId: "I500315",
      estFratrie: true,
      naissance: {
        date: "1866",
        annee: 1866,
        lieu: "Paris, Île-De-France, France"
      },
      deces: {
        date: "1909",
        annee: 1909,
        lieu: "Paris 12, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Pantin (93), Pantin, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500589",
      prenom: "Stéphane Edouard",
      nom: "Rotereau",
      generation: 4,
      partnerId: null,
      pereId: "I500314",
      mereId: "I500315",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: "Paris 75, Paris, Île-de-France, France"
      },
      deces: {
        date: "7 octobre 1860",
        annee: 1860,
        lieu: "Vrécourt, Vosges, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }]
  },
  pillon: {
    nom: "Pillon",
    description: "Branche maternelle — grand-mère — 46 personnes en ligne directe",
    personnes: [{
      id: "I500004",
      prenom: "Marie-Louise",
      nom: "PILLON",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: false,
      naissance: {
        date: "22 mai 1913",
        annee: 1913,
        lieu: "Clichy, Hauts-De-Seine, Île-De-France, France"
      },
      deces: {
        date: "23 mai 2009",
        annee: 2009,
        lieu: "Jouars-Pontchartrain, Yvelines, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "Couturière",
        lieu: ""
      },
      domiciles: [{
        date: "1936",
        lieu: "Combat, 19e Arrondissement, Paris, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500014",
      prenom: "Marie-Louise Léontine",
      nom: "WERNERT",
      generation: 5,
      partnerId: "I500013",
      pereId: "I500037",
      mereId: "I500051",
      estFratrie: false,
      naissance: {
        date: "10 janvier 1881",
        annee: 1881,
        lieu: "Paris 15ème"
      },
      deces: {
        date: "22 février 1971",
        annee: 1971,
        lieu: "Clichy",
        cimetiere: ""
      },
      profession: {
        metier: "Lingère",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: {
        date: "3 février 1906",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500051",
      prenom: "Adèle Julie",
      nom: "RAYNAL / WERNERT",
      generation: 4,
      partnerId: "I500037",
      pereId: "I500345",
      mereId: "I500344",
      estFratrie: false,
      naissance: {
        date: "13 avril 1861",
        annee: 1861,
        lieu: "Montpellier, Hérault, Occitanie, France"
      },
      deces: {
        date: "24 avril 1899",
        annee: 1899,
        lieu: "Paris 7e,Paris,France",
        cimetiere: "Cimetière parisien de Bagneux (92), Bagneux, Hauts-de-Seine, Île-de-France, France"
      },
      profession: {
        metier: "Blanchisseuse",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500344",
      prenom: "Nathalie",
      nom: "RAYNAL",
      generation: 3,
      partnerId: "I500345",
      pereId: "I500491",
      mereId: "I500497",
      estFratrie: false,
      naissance: {
        date: "vers 1837",
        annee: 1837,
        lieu: "Saint-Saturnin-de-Lenne, Aveyron, Occitanie, France"
      },
      deces: {
        date: "16 juillet 1893",
        annee: 1893,
        lieu: "Paris 15EME, Paris, Île-de-France, France",
        cimetiere: "Cimetière parisien de Bagneux (92), Bagneux, Hauts-de-Seine, Île-de-France, France"
      },
      profession: {
        metier: "gantière",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "vers février 1869",
        lieu: "Paris"
      },
      remarque: ""
    }, {
      id: "I500497",
      prenom: "Marianne",
      nom: "GAZAGNES",
      generation: 2,
      partnerId: "I500491",
      pereId: "I500498",
      mereId: "I500499",
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 janvier 1834",
        lieu: "Campagnac, Aveyron, Occitanie, France"
      },
      remarque: ""
    }, {
      id: "I500499",
      prenom: "Marianne",
      nom: "MERCIER",
      generation: 1,
      partnerId: "I500498",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500498",
      prenom: "Jean Pierre",
      nom: "GAZAGNES",
      generation: 1,
      partnerId: "I500499",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "31 mars 1814",
        annee: 1814,
        lieu: "Campagnac",
        cimetiere: ""
      },
      profession: {
        metier: "Domestique",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500491",
      prenom: "Antoine",
      nom: "RAYNAL",
      generation: 2,
      partnerId: "I500497",
      pereId: "I500495",
      mereId: "I500496",
      estFratrie: false,
      naissance: {
        date: "11 juillet 1804",
        annee: 1804,
        lieu: "Capelle-Bonance, La Capelle-Bonance, Aveyron, Occitanie, France"
      },
      deces: {
        date: "22 novembre 1885",
        annee: 1885,
        lieu: "La Capelle-Bonance, Aveyron, Occitanie, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cordonnier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "29 janvier 1834",
        lieu: "Campagnac, Aveyron, Occitanie, France"
      },
      remarque: ""
    }, {
      id: "I500496",
      prenom: "Catherine",
      nom: "BERNAT",
      generation: 1,
      partnerId: "I500495",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1770",
        annee: 1770,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "2 janvier 1845",
        annee: 1845,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500495",
      prenom: "Valentin",
      nom: "RAYNAL",
      generation: 1,
      partnerId: "I500496",
      pereId: "I500947",
      mereId: "I500948",
      estFratrie: false,
      naissance: {
        date: "3 juin 1770",
        annee: 1770,
        lieu: "La Capelle-Bonance, Aveyron, Occitanie, France"
      },
      deces: {
        date: "4 septembre 1845",
        annee: 1845,
        lieu: "La Capelle-Bonance, Aveyron, Occitanie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500948",
      prenom: "Elisabeth",
      nom: "Gaben",
      generation: 0,
      partnerId: "I500947",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1720",
        annee: 1720,
        lieu: ""
      },
      deces: {
        date: "24 janvier 1810",
        annee: 1810,
        lieu: "Capelle-Bonance, La Capelle-Bonance, Aveyron, Occitanie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500947",
      prenom: "Jean Antoine",
      nom: "RAYNAL",
      generation: 0,
      partnerId: "I500948",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "BET 1729 AND 1731",
        annee: 1729,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500345",
      prenom: "Aloïse",
      nom: "WERNERT",
      generation: 3,
      partnerId: "I500344",
      pereId: "I500346",
      mereId: "I500347",
      estFratrie: false,
      naissance: {
        date: "10 octobre 1819",
        annee: 1819,
        lieu: "Haguenau, Bas-Rhin, Grand Est, France"
      },
      deces: {
        date: "avant juillet 1893",
        annee: 1893,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Musicien de régiment",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "vers février 1869",
        lieu: "Paris"
      },
      remarque: ""
    }, {
      id: "I500347",
      prenom: "Catherine Genevieve",
      nom: "BOEUMLER",
      generation: 2,
      partnerId: "I500346",
      pereId: "I500348",
      mereId: "I500349",
      estFratrie: false,
      naissance: {
        date: "25 décembre 1786",
        annee: 1786,
        lieu: "Haguenau, Bas-Rhin, Alsace, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "22 juin 1812",
        lieu: "Strasbourg, Bas-Rhin, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500349",
      prenom: "Marguerite",
      nom: "BORN",
      generation: 1,
      partnerId: "I500348",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "12 février 1794",
        annee: 1794,
        lieu: "Haguenau, Bas-Rhin, Alsace, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500348",
      prenom: "Jean George Valentin (dit Ignace)",
      nom: "BAEUMLER",
      generation: 1,
      partnerId: "I500349",
      pereId: "I500443",
      mereId: "I500444",
      estFratrie: false,
      naissance: {
        date: "29 juillet 1752",
        annee: 1752,
        lieu: "Haguenau, Bas-Rhin, Alsace, France"
      },
      deces: {
        date: "7 février 1829",
        annee: 1829,
        lieu: "Haguenau, Bas-Rhin, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "Jardinier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500444",
      prenom: "Barbe",
      nom: "NIDERMEYER",
      generation: 0,
      partnerId: "I500443",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "4 décembre 1797",
        annee: 1797,
        lieu: "Haguenau, Bas-Rhin, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500443",
      prenom: "Jean Conrad",
      nom: "BAEUMLER",
      generation: 0,
      partnerId: "I500444",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Jardinier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500346",
      prenom: "Aloïse",
      nom: "WERNERT",
      generation: 2,
      partnerId: "I500347",
      pereId: "I500440",
      mereId: "I500441",
      estFratrie: false,
      naissance: {
        date: "20 avril 1786",
        annee: 1786,
        lieu: "Lixhausen,Bas-Rhin,France"
      },
      deces: {
        date: "10 mai 1856",
        annee: 1856,
        lieu: "Strasbourg, Bas-Rhin, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "Peintre doreur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "22 juin 1812",
        lieu: "Strasbourg, Bas-Rhin, Grand Est, France"
      },
      remarque: ""
    }, {
      id: "I500441",
      prenom: "Marguerite",
      nom: "KIRST",
      generation: 1,
      partnerId: "I500440",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "vers janvier 1812",
        annee: 1812,
        lieu: "Lixhausen,Bas-Rhin,France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500440",
      prenom: "Antoine",
      nom: "WERNERT",
      generation: 1,
      partnerId: "I500441",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500037",
      prenom: "(prénom inconnu)",
      nom: "MARTINI",
      generation: 4,
      partnerId: "I500051",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: "Corse"
      },
      deces: null,
      profession: {
        metier: "Général",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500013",
      prenom: "Arthur Alphonse",
      nom: "PILLON",
      generation: 5,
      partnerId: "I500014",
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: false,
      naissance: {
        date: "23 avril 1881",
        annee: 1881,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "13 mai 1934",
        annee: 1934,
        lieu: "Brévannes hospice",
        cimetiere: ""
      },
      profession: {
        metier: "Manoeuvre",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: {
        date: "3 février 1906",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      },
      remarque: ""
    }, {
      id: "I500129",
      prenom: "Caroline Emée",
      nom: "RICHARD / MARIE",
      generation: 4,
      partnerId: "I500128",
      pereId: null,
      mereId: "I500941",
      estFratrie: false,
      naissance: {
        date: "30 octobre 1847",
        annee: 1847,
        lieu: "Cretteville, Picauville, Manche, Normandy, France"
      },
      deces: {
        date: "après janvier 1904",
        annee: 1904,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "Domestique",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "9 janvier 1873",
        lieu: "Cap - Montmartin-En-Graignes, Manche, Basse Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500941",
      prenom: "Marie Emée",
      nom: "RICHARD",
      generation: 3,
      partnerId: null,
      pereId: "I501631",
      mereId: "I501632",
      estFratrie: false,
      naissance: {
        date: "9 avril 1822",
        annee: 1822,
        lieu: "Cretteville, Picauville, Manche, Normandy, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501632",
      prenom: "Aimée Victoire Henriette",
      nom: "LETELLIER",
      generation: 2,
      partnerId: "I501631",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1799",
        annee: 1799,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "Fileuse",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "19 mars 1822",
        lieu: "Cretteville, Picauville, Manche, Normandy, France"
      },
      remarque: ""
    }, {
      id: "I501631",
      prenom: "Pierre Louis Michel",
      nom: "RICHARD",
      generation: 2,
      partnerId: "I501632",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1793",
        annee: 1793,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "menuisier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "19 mars 1822",
        lieu: "Cretteville, Picauville, Manche, Normandy, France"
      },
      remarque: ""
    }, {
      id: "I500128",
      prenom: "Hippolyte Edouard",
      nom: "PILLON",
      generation: 4,
      partnerId: "I500129",
      pereId: "I500258",
      mereId: "I500259",
      estFratrie: false,
      naissance: {
        date: "vers 16 janvier 1833",
        annee: 1833,
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "19 janvier 1904",
        annee: 1904,
        lieu: "Isigny-sur-Mer--Isigny, Isigny-sur-Mer, Calvados, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "Maçon",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "9 janvier 1873",
        lieu: "Cap - Montmartin-En-Graignes, Manche, Basse Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500259",
      prenom: "Françoise Catherine Sophie",
      nom: "LELOUP",
      generation: 3,
      partnerId: "I500258",
      pereId: "I500265",
      mereId: "I500266",
      estFratrie: false,
      naissance: {
        date: "16 janvier 1791",
        annee: 1791,
        lieu: "(Saint-Georges-De-Bohon) Terre-Et-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "20 octobre 1869",
        annee: 1869,
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 décembre 1813",
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500266",
      prenom: "Marie Anne Catherine",
      nom: "CAILLEMER",
      generation: 2,
      partnerId: "I500265",
      pereId: "I500944",
      mereId: "I500945",
      estFratrie: false,
      naissance: {
        date: "9 mai 1759",
        annee: 1759,
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "13 septembre 1831",
        annee: 1831,
        lieu: "Saint-Georges-de-Bohon, Terre-et-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 novembre 1789",
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500945",
      prenom: "Catherine",
      nom: "LEDENTU",
      generation: 1,
      partnerId: "I500944",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "7 novembre 1736",
        annee: 1736,
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "20 août 1781",
        annee: 1781,
        lieu: "Terre-Et-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 octobre 1756",
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500944",
      prenom: "Nicolas",
      nom: "CAILLEMER",
      generation: 1,
      partnerId: "I500945",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1736",
        annee: 1736,
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "28 octobre 1756",
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500265",
      prenom: "Gilles",
      nom: "LELOUP",
      generation: 2,
      partnerId: "I500266",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1741",
        annee: 1741,
        lieu: ""
      },
      deces: {
        date: "5 mars 1842",
        annee: 1842,
        lieu: "Terre-Et-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "17 novembre 1789",
        lieu: "Terre-Et-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500258",
      prenom: "Raphaël Victor",
      nom: "PILLON",
      generation: 3,
      partnerId: "I500259",
      pereId: "I500260",
      mereId: "I500261",
      estFratrie: false,
      naissance: {
        date: "31 mars 1785",
        annee: 1785,
        lieu: "Montmartin-En-Graignes, Carentan-Les-Marais, Manche, Normandy, France"
      },
      deces: {
        date: "18 août 1859",
        annee: 1859,
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France",
        cimetiere: "Montmartin-en-Graignes"
      },
      profession: {
        metier: "Charpentier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 décembre 1813",
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500261",
      prenom: "Marie Suzanne Elisabeth",
      nom: "LESAGE",
      generation: 2,
      partnerId: "I500260",
      pereId: "I500263",
      mereId: "I500264",
      estFratrie: false,
      naissance: {
        date: "17 mai 1755",
        annee: 1755,
        lieu: "Gorges (50)"
      },
      deces: {
        date: "6 juin 1819",
        annee: 1819,
        lieu: "Montmartin en Graignes (50)",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 janvier 1784",
        lieu: "Auvers, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500264",
      prenom: "Anne",
      nom: "Le Gand",
      generation: 1,
      partnerId: "I500263",
      pereId: "I500567",
      mereId: "I500570",
      estFratrie: false,
      naissance: {
        date: "1722",
        annee: 1722,
        lieu: "Gorges, Manche, Normandie, France"
      },
      deces: {
        date: "15 décembre 1800",
        annee: 1800,
        lieu: "Gorges, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 novembre 1750",
        lieu: "GORGES  50"
      },
      remarque: ""
    }, {
      id: "I500570",
      prenom: "Anne",
      nom: "LOZOUET",
      generation: 0,
      partnerId: "I500567",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "31 mars 1698",
        annee: 1698,
        lieu: "Lessay, Manche, Normandie, France"
      },
      deces: {
        date: "3 juillet 1755",
        annee: 1755,
        lieu: "Gorges, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "7 septembre 1728",
        lieu: "Gorges, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500567",
      prenom: "François",
      nom: "LE GAND",
      generation: 0,
      partnerId: "I500570",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "8 février 1703",
        annee: 1703,
        lieu: ""
      },
      deces: {
        date: "26 juin 1755",
        annee: 1755,
        lieu: "Gorges, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "7 septembre 1728",
        lieu: "Gorges, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500263",
      prenom: "Isidore",
      nom: "LESAGE",
      generation: 1,
      partnerId: "I500264",
      pereId: "I500361",
      mereId: "I500362",
      estFratrie: false,
      naissance: {
        date: "13 août 1722",
        annee: 1722,
        lieu: "Gorges, Manche, Normandie, France"
      },
      deces: {
        date: "2 décembre 1776",
        annee: 1776,
        lieu: "Gorges, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "26 novembre 1750",
        lieu: "GORGES  50"
      },
      remarque: ""
    }, {
      id: "I500362",
      prenom: "Catherine, Suzanne",
      nom: "BIGOT",
      generation: 0,
      partnerId: "I500361",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "19 juillet 1687",
        annee: 1687,
        lieu: "Gorges, Manche, Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1720",
        lieu: "GORGES  50"
      },
      remarque: ""
    }, {
      id: "I500361",
      prenom: "Isidore",
      nom: "LESAGE",
      generation: 0,
      partnerId: "I500362",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1695",
        annee: 1695,
        lieu: "NAY   50"
      },
      deces: {
        date: "23 juillet 1755",
        annee: 1755,
        lieu: "Gorges, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 février 1720",
        lieu: "GORGES  50"
      },
      remarque: ""
    }, {
      id: "I500260",
      prenom: "Raphaël",
      nom: "PILLON",
      generation: 2,
      partnerId: "I500261",
      pereId: "I500267",
      mereId: "I500270",
      estFratrie: false,
      naissance: {
        date: "21 décembre 1712",
        annee: 1712,
        lieu: "Montmartin-En-Graignes, Manche, Basse Normandie, France"
      },
      deces: {
        date: "31 août 1798",
        annee: 1798,
        lieu: "Montmartin-En-Graignes, Manche, Basse Normandie, France",
        cimetiere: "Montmartin-en-Graignes"
      },
      profession: {
        metier: "Laboureur",
        lieu: ""
      },
      domiciles: [],
      mariage: {
        date: "8 janvier 1784",
        lieu: "Auvers, Manche, Normandie, France"
      },
      remarque: ""
    }, {
      id: "I500270",
      prenom: "Barbe",
      nom: "HAMELIN",
      generation: 1,
      partnerId: "I500267",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "1671",
        annee: 1671,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "5 juillet 1746",
        annee: 1746,
        lieu: "Montmartin-En-Graignes, Manche, Normandie, France",
        cimetiere: "Montmartin-en-Graignes (50)"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500267",
      prenom: "Jean",
      nom: "PILLON",
      generation: 1,
      partnerId: "I500270",
      pereId: "I500268",
      mereId: "I500269",
      estFratrie: false,
      naissance: {
        date: "1676",
        annee: 1676,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "19 septembre 1726",
        annee: 1726,
        lieu: "Montmartin en Graignes (50)",
        cimetiere: ""
      },
      profession: {
        metier: "Journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500269",
      prenom: "Jeanne",
      nom: "Langlois",
      generation: 0,
      partnerId: "I500268",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "17 mars 1706",
        annee: 1706,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500268",
      prenom: "Nicolas",
      nom: "PILLON",
      generation: 0,
      partnerId: "I500269",
      pereId: null,
      mereId: null,
      estFratrie: false,
      naissance: {
        date: "vers 1634",
        annee: 1634,
        lieu: "France"
      },
      deces: {
        date: "1 mars 1704",
        annee: 1704,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500515",
      prenom: "Marie",
      nom: "Pillon",
      generation: 2,
      partnerId: null,
      pereId: "I500267",
      mereId: "I500270",
      estFratrie: true,
      naissance: {
        date: "vers 1697",
        annee: 1697,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500271",
      prenom: "Pierre",
      nom: "PILLON",
      generation: 2,
      partnerId: null,
      pereId: "I500267",
      mereId: "I500270",
      estFratrie: true,
      naissance: {
        date: "28 août 1701",
        annee: 1701,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500516",
      prenom: "Anne",
      nom: "Pilon",
      generation: 2,
      partnerId: null,
      pereId: "I500267",
      mereId: "I500270",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: {
        date: "18 novembre 1788",
        annee: 1788,
        lieu: "Montmartin-en-Graignes (50)",
        cimetiere: "Montmartin-en-Graignes (50)"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500517",
      prenom: "Jeanne",
      nom: "Pillon",
      generation: 2,
      partnerId: null,
      pereId: "I500267",
      mereId: "I500270",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500262",
      prenom: "Antoine Henri",
      nom: "PILLON",
      generation: 3,
      partnerId: null,
      pereId: "I500260",
      mereId: "I500261",
      estFratrie: true,
      naissance: {
        date: "21 février 1784",
        annee: 1784,
        lieu: "Auvers, Manche, Normandie, France"
      },
      deces: {
        date: "25 février 1855",
        annee: 1855,
        lieu: "Cap - Montmartin-En-Graignes, Manche, Basse Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501624",
      prenom: "Célestin Alexis",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "21 avril 1873",
        annee: 1873,
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501625",
      prenom: "Auguste Armand",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "1874",
        annee: 1874,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501599",
      prenom: "Napoléon Louis Philippe",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "vers 1876",
        annee: 1876,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "29 décembre 1946",
        annee: 1946,
        lieu: "Saint-Côme-du-Mont, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1911",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501627",
      prenom: "Delphine Marie Augustine",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "7 mars 1878",
        annee: 1878,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "1958",
        annee: 1958,
        lieu: "",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500459",
      prenom: "Henriette Louise Azelma",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "30 juillet 1879",
        annee: 1879,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "16 août 1913",
        annee: 1913,
        lieu: "Bayeux, 14400, Calvados, Basse-Normandie, FRANCE",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500240",
      prenom: "Armandine Léontine Elise",
      nom: "Pillon",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "1882",
        annee: 1882,
        lieu: "Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1931",
        lieu: "Lisieux, Calvados, Normandie, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I501629",
      prenom: "Prosper Lucien",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "8 mai 1885",
        annee: 1885,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "2 juin 1885",
        annee: 1885,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501628",
      prenom: "Marguerite Pauline",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "28 septembre 1886",
        annee: 1886,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "12 juin 1887",
        annee: 1887,
        lieu: "Montmartin-en-Graignes, Carentan-les-Marais, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501012",
      prenom: "Caroline Pauline",
      nom: "PILLON",
      generation: 5,
      partnerId: null,
      pereId: "I500128",
      mereId: "I500129",
      estFratrie: true,
      naissance: {
        date: "12 novembre 1888",
        annee: 1888,
        lieu: "Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "6 mars 1968",
        annee: 1968,
        lieu: "Bayeux, Calvados, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501370",
      prenom: "Pierre",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 1682",
        annee: 1682,
        lieu: "Angoville-sur-Ay,Lessay, Manche, Normandie, France"
      },
      deces: {
        date: "1 mars 1762",
        annee: 1762,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France",
        cimetiere: "Angoville-sur-Ay, Manche, Basse-Normandie, France"
      },
      profession: {
        metier: "journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501371",
      prenom: "Jean Denis",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 1684",
        annee: 1684,
        lieu: ""
      },
      deces: {
        date: "4 décembre 1766",
        annee: 1766,
        lieu: "Angoville-sur-Ay, Lessay, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "journalier, laboureur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501373",
      prenom: "Marie",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "28 avril 1691",
        annee: 1691,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501369",
      prenom: "Jean Baptiste",
      nom: "lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 16 septembre 1693",
        annee: 1693,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France"
      },
      deces: {
        date: "vers 1 décembre 1762",
        annee: 1762,
        lieu: "Gorges, Manche, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "journalier",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501374",
      prenom: "Joseph",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "8 mars 1696",
        annee: 1696,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France"
      },
      deces: {
        date: "23 mars 1737",
        annee: 1737,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501372",
      prenom: "Vincent",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "vers 1697",
        annee: 1697,
        lieu: ""
      },
      deces: {
        date: "4 mars 1737",
        annee: 1737,
        lieu: "Gouey, Manche, Basse-Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501375",
      prenom: "Pierre",
      nom: "Lozouet",
      generation: 0,
      partnerId: null,
      pereId: null,
      mereId: null,
      estFratrie: true,
      naissance: {
        date: "avant 1704",
        annee: 1704,
        lieu: "Angoville-sur-Ay, Manche, Basse-Normandie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500953",
      prenom: "Valentin",
      nom: "Raynal",
      generation: 2,
      partnerId: null,
      pereId: "I500495",
      mereId: "I500496",
      estFratrie: true,
      naissance: {
        date: "1802",
        annee: 1802,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "25 avril 1817",
        annee: 1817,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500954",
      prenom: "Catherine",
      nom: "Raynal",
      generation: 2,
      partnerId: null,
      pereId: "I500495",
      mereId: "I500496",
      estFratrie: true,
      naissance: {
        date: "15 décembre 1806",
        annee: 1806,
        lieu: "Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "2 janvier 1895",
        annee: 1895,
        lieu: "La Capelle-Bonance",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500955",
      prenom: "Marie Jeanne",
      nom: "Raynal",
      generation: 2,
      partnerId: null,
      pereId: "I500495",
      mereId: "I500496",
      estFratrie: true,
      naissance: {
        date: "17 mars 1809",
        annee: 1809,
        lieu: "La Capelle, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "11 septembre 1817",
        annee: 1817,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500489",
      prenom: "Nathalie Marie",
      nom: "WERNERT",
      generation: 4,
      partnerId: null,
      pereId: "I500345",
      mereId: "I500344",
      estFratrie: true,
      naissance: {
        date: "vers 12 juin 1871",
        annee: 1871,
        lieu: "Paris 11EME, Paris, Île-de-France, France"
      },
      deces: {
        date: "12 juillet 1871",
        annee: 1871,
        lieu: "Paris 11, Paris, Île-de-France, France",
        cimetiere: "Cimetière de Charonne (20e), Paris, Île-de-France, France"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500350",
      prenom: "Amelie Eleonore",
      nom: "Wernert",
      generation: 3,
      partnerId: null,
      pereId: "I500346",
      mereId: "I500347",
      estFratrie: true,
      naissance: {
        date: "14 mars 1813",
        annee: 1813,
        lieu: "Strasbourg, Bas-Rhin, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500351",
      prenom: "Henry Etienne",
      nom: "Wernert",
      generation: 3,
      partnerId: null,
      pereId: "I500346",
      mereId: "I500347",
      estFratrie: true,
      naissance: {
        date: "26 décembre 1824",
        annee: 1824,
        lieu: "Haguenau, Bas-Rhin, Alsace, France"
      },
      deces: {
        date: "17 janvier 1871",
        annee: 1871,
        lieu: "Obernai, Bas-Rhin, Grand Est, France",
        cimetiere: ""
      },
      profession: {
        metier: "Vernisseur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500353",
      prenom: "Louise Odile",
      nom: "Wernert",
      generation: 3,
      partnerId: null,
      pereId: "I500346",
      mereId: "I500347",
      estFratrie: true,
      naissance: {
        date: "9 juillet 1829",
        annee: 1829,
        lieu: "Haguenau, Bas-Rhin, Alsace, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500354",
      prenom: "Catherine Julie",
      nom: "Wernert",
      generation: 3,
      partnerId: null,
      pereId: "I500346",
      mereId: "I500347",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500949",
      prenom: "Mort né",
      nom: "Raynal",
      generation: 1,
      partnerId: null,
      pereId: "I500947",
      mereId: "I500948",
      estFratrie: true,
      naissance: {
        date: "18 mars 1760",
        annee: 1760,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "1760",
        annee: 1760,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500950",
      prenom: "Anne",
      nom: "Raynal",
      generation: 1,
      partnerId: null,
      pereId: "I500947",
      mereId: "I500948",
      estFratrie: true,
      naissance: {
        date: "18 mars 1760",
        annee: 1760,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "18 mars 1760",
        annee: 1760,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500951",
      prenom: "Marie Jeanne",
      nom: "Raynal",
      generation: 1,
      partnerId: null,
      pereId: "I500947",
      mereId: "I500948",
      estFratrie: true,
      naissance: {
        date: "9 mars 1761",
        annee: 1761,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "",
        annee: null,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500952",
      prenom: "Jean Louis",
      nom: "Raynal",
      generation: 1,
      partnerId: null,
      pereId: "I500947",
      mereId: "I500948",
      estFratrie: true,
      naissance: {
        date: "29 septembre 1763",
        annee: 1763,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia"
      },
      deces: {
        date: "",
        annee: null,
        lieu: "La Capelle-Bonance, Aveyron, Midi-Pyrénées, Francia",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500494",
      prenom: "Marie-Virginie",
      nom: "RAYNAL",
      generation: 3,
      partnerId: null,
      pereId: "I500491",
      mereId: "I500497",
      estFratrie: true,
      naissance: {
        date: "5 août 1836",
        annee: 1836,
        lieu: "La Capelle-Bonance, Aveyron, Occitanie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501596",
      prenom: "Philomene",
      nom: "RAINAL",
      generation: 3,
      partnerId: null,
      pereId: "I500491",
      mereId: "I500497",
      estFratrie: true,
      naissance: {
        date: "1 avril 1844",
        annee: 1844,
        lieu: "Capelle-Bonance, La Capelle-Bonance, Aveyron, Occitanie, France"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I501469",
      prenom: "Jean Albert Valentin",
      nom: "RAYNAL",
      generation: 3,
      partnerId: null,
      pereId: "I500491",
      mereId: "I500497",
      estFratrie: true,
      naissance: {
        date: "",
        annee: null,
        lieu: "La Capelle-Bonance"
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500943",
      prenom: "Jacques François Raphaël",
      nom: "PILLON",
      generation: 4,
      partnerId: null,
      pereId: "I500258",
      mereId: "I500259",
      estFratrie: true,
      naissance: {
        date: "2 mai 1817",
        annee: 1817,
        lieu: "Montmartin-En-Graignes, Carentan-Les-Marais, Manche, Normandy, France"
      },
      deces: {
        date: "19 janvier 1890",
        annee: 1890,
        lieu: "Saint-Georges-De-Bohon, Terre-Et-Marais, Manche, Normandy, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500554",
      prenom: "Auguste Charles",
      nom: "pillon",
      generation: 4,
      partnerId: null,
      pereId: "I500258",
      mereId: "I500259",
      estFratrie: true,
      naissance: {
        date: "22 avril 1822",
        annee: 1822,
        lieu: "(Montmartin-En-Graignes) Carentan-Les-Marais, Manche, Normandie, France"
      },
      deces: {
        date: "17 mars 1891",
        annee: 1891,
        lieu: "Graignes-Mesnil-Angot, Manche, Normandie, France",
        cimetiere: ""
      },
      profession: {
        metier: "Cultivateur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500446",
      prenom: "Barbe",
      nom: "BAEUMLER",
      generation: 2,
      partnerId: null,
      pereId: "I500348",
      mereId: "I500349",
      estFratrie: true,
      naissance: {
        date: "vers 1777",
        annee: 1777,
        lieu: ""
      },
      deces: null,
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500360",
      prenom: "Jean Baptiste",
      nom: "Baeumler",
      generation: 2,
      partnerId: null,
      pereId: "I500348",
      mereId: "I500349",
      estFratrie: true,
      naissance: {
        date: "13 décembre 1791",
        annee: 1791,
        lieu: "Haguenau, Bas-Rhin, Alsace, France"
      },
      deces: {
        date: "3 avril 1858",
        annee: 1858,
        lieu: "Strasbourg, Bas-Rhin, Alsace, France",
        cimetiere: ""
      },
      profession: {
        metier: "Peintre vernisseur",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500020",
      prenom: "Napoléon Lucien",
      nom: "Pillon",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "2 janvier 1907",
        annee: 1907,
        lieu: "Paris 8e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "4 novembre 1974",
        annee: 1974,
        lieu: "Coussac-Bonneval, Haute-Vienne, Nouvelle-Aquitaine, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Mariage avec: Jeanne (Jehanne) DARSY"
      }, {
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500015",
      prenom: "Léontine",
      nom: "Pillon",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "15 janvier 1908",
        annee: 1908,
        lieu: "Paris 6e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "23 octobre 2001",
        annee: 2001,
        lieu: "Sartrouville, Yvelines, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500021",
      prenom: "Lucie Marguerite",
      nom: "Pillon",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "19 avril 1909",
        annee: 1909,
        lieu: "Paris 8e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "14 octobre 1998",
        annee: 1998,
        lieu: "Montigny-Lès-Cormeilles, 95370, Val-d'Oise, Île-de-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1911",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }, {
        date: "1931",
        lieu: "Gennevilliers, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500422",
      prenom: "Arthur Alphonse",
      nom: "PILLON",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "29 avril 1911",
        annee: 1911,
        lieu: ""
      },
      deces: {
        date: "1 février 1912",
        annee: 1912,
        lieu: "Hôpital Bretonneau à Paris 18e",
        cimetiere: "Cimetière parisien de Saint-Ouen (93), Saint-Ouen-sur-Seine, Seine-Saint-Denis, Île-de-France, France"
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }, {
      id: "I500054",
      prenom: "Marguerite Jeanne",
      nom: "Pillon",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "12 novembre 1918",
        annee: 1918,
        lieu: "Paris 8e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "6 août 2008",
        annee: 2008,
        lieu: "Erquy, Côtes-d'Armor, Bretagne, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [{
        date: "1921",
        lieu: "Clichy, Hauts-de-Seine, Île-de-France, France"
      }],
      mariage: null,
      remarque: ""
    }, {
      id: "I500242",
      prenom: "Arthur Albert",
      nom: "Pillon",
      generation: 6,
      partnerId: null,
      pereId: "I500013",
      mereId: "I500014",
      estFratrie: true,
      naissance: {
        date: "27 mars 1923",
        annee: 1923,
        lieu: "Paris 8e Arrondissement, Paris, Île-De-France, France"
      },
      deces: {
        date: "23 juillet 2012",
        annee: 2012,
        lieu: "Paris 20e Arrondissement, Paris, Île-De-France, France",
        cimetiere: ""
      },
      profession: {
        metier: "",
        lieu: ""
      },
      domiciles: [],
      mariage: null,
      remarque: ""
    }]
  }
};

// ---------- Données pour la vue graphique (8 arbres, ligne père/mère séparées) ----------
// ---------- Données pour la vue graphique (8 arbres, ligne père/mère séparées) ----------
// depth 0 = le/la grand-parent (base du tronc). La branche ne monte que du côté
// concerné (père ou mère) ; au-delà, les deux côtés de chaque ancêtre sont inclus.
const ARBRES_GRAPHIQUES = {
  bareau_pere: {
    label: "Bareau",
    personnes: {
      "I500007": {
        id: "I500007",
        prenom: "André Alain",
        nom: "BAREAU",
        naissance: 1910,
        deces: 2005,
        pereId: "I500008",
        mereId: null
      },
      "I500008": {
        id: "I500008",
        prenom: "Emile Adrien",
        nom: "BAREAU",
        naissance: 1868,
        deces: 1947,
        pereId: "I500371",
        mereId: "I500372"
      },
      "I500371": {
        id: "I500371",
        prenom: "Louis Eugène",
        nom: "BAREAU",
        naissance: 1835,
        deces: 1885,
        pereId: "I500373",
        mereId: "I500374"
      },
      "I500373": {
        id: "I500373",
        prenom: "François",
        nom: "BAREAU",
        naissance: 1808,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500374": {
        id: "I500374",
        prenom: "Pauline",
        nom: "MITON",
        naissance: 1807,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500372": {
        id: "I500372",
        prenom: "Marie Célestine",
        nom: "SAULNIER",
        naissance: 1842,
        deces: 1915,
        pereId: "I500457",
        mereId: "I500458"
      },
      "I500457": {
        id: "I500457",
        prenom: "Jean",
        nom: "SAULNIER",
        naissance: 1812,
        deces: 1865,
        pereId: "I500778",
        mereId: "I500779"
      },
      "I500778": {
        id: "I500778",
        prenom: "Pierre",
        nom: "SAULNIER",
        naissance: 1780,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500779": {
        id: "I500779",
        prenom: "Marie",
        nom: "MÉNARD",
        naissance: 1777,
        deces: null,
        pereId: "I500869",
        mereId: "I500870"
      },
      "I500869": {
        id: "I500869",
        prenom: "Pierre",
        nom: "MÉNARD",
        naissance: null,
        deces: null,
        pereId: "I500871",
        mereId: null
      },
      "I500871": {
        id: "I500871",
        prenom: "Jacques",
        nom: "MÉNARD",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500870": {
        id: "I500870",
        prenom: "Marie",
        nom: "GARNIER",
        naissance: null,
        deces: null,
        pereId: "I500872",
        mereId: "I500873"
      },
      "I500872": {
        id: "I500872",
        prenom: "Pierre",
        nom: "GARNIER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500873": {
        id: "I500873",
        prenom: "Magdelaine",
        nom: "PIRON",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500458": {
        id: "I500458",
        prenom: "Marie",
        nom: "BERTON",
        naissance: 1814,
        deces: null,
        pereId: "I500783",
        mereId: "I500782"
      },
      "I500783": {
        id: "I500783",
        prenom: "Jean",
        nom: "BERTON",
        naissance: 1789,
        deces: 1826,
        pereId: null,
        mereId: null
      },
      "I500782": {
        id: "I500782",
        prenom: "Marie",
        nom: "MOUNIER",
        naissance: 1789,
        deces: null,
        pereId: "I500784",
        mereId: "I500785"
      },
      "I500784": {
        id: "I500784",
        prenom: "Antoine",
        nom: "Mounier",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500785": {
        id: "I500785",
        prenom: "Marie Jeanne",
        nom: "Doucet",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500007"
  },
  bareau_mere: {
    label: "Dubourg",
    personnes: {
      "I500007": {
        id: "I500007",
        prenom: "André Alain",
        nom: "BAREAU",
        naissance: 1910,
        deces: 2005,
        pereId: null,
        mereId: "I500009"
      },
      "I500009": {
        id: "I500009",
        prenom: "Aline Alexandrine",
        nom: "DUBOURG",
        naissance: 1878,
        deces: 1945,
        pereId: "I500055",
        mereId: "I500056"
      },
      "I500055": {
        id: "I500055",
        prenom: "Alexandre Guillaume Marie",
        nom: "DUBOURG",
        naissance: 1844,
        deces: 1905,
        pereId: "I500062",
        mereId: "I500063"
      },
      "I500062": {
        id: "I500062",
        prenom: "Guillaume",
        nom: "DUBOURG",
        naissance: 1813,
        deces: 1856,
        pereId: "I500092",
        mereId: "I500093"
      },
      "I500092": {
        id: "I500092",
        prenom: "Guillaume",
        nom: "DUBOURG",
        naissance: 1787,
        deces: 1844,
        pereId: "I500096",
        mereId: "I500097"
      },
      "I500096": {
        id: "I500096",
        prenom: "Guillaume",
        nom: "DUBOURG",
        naissance: 1747,
        deces: 1818,
        pereId: "I500104",
        mereId: "I500105"
      },
      "I500104": {
        id: "I500104",
        prenom: "François",
        nom: "DUBOURG",
        naissance: 1723,
        deces: 1797,
        pereId: null,
        mereId: null
      },
      "I500105": {
        id: "I500105",
        prenom: "Guillemette",
        nom: "LE PERRON",
        naissance: 1722,
        deces: 1747,
        pereId: null,
        mereId: null
      },
      "I500097": {
        id: "I500097",
        prenom: "Marie",
        nom: "BARGUEDAN",
        naissance: 1759,
        deces: 1787,
        pereId: "I500884",
        mereId: "I500885"
      },
      "I500884": {
        id: "I500884",
        prenom: "Guillaume",
        nom: "BARGUEDAN",
        naissance: 1720,
        deces: 1778,
        pereId: null,
        mereId: null
      },
      "I500885": {
        id: "I500885",
        prenom: "Catherine",
        nom: "KERRIEN",
        naissance: 1728,
        deces: 1788,
        pereId: null,
        mereId: null
      },
      "I500093": {
        id: "I500093",
        prenom: "Françoise",
        nom: "LE GUEN",
        naissance: 1793,
        deces: 1895,
        pereId: "I500094",
        mereId: "I500095"
      },
      "I500094": {
        id: "I500094",
        prenom: "Toussaint",
        nom: "LE GUEN",
        naissance: 1763,
        deces: 1822,
        pereId: "I500890",
        mereId: "I500891"
      },
      "I500890": {
        id: "I500890",
        prenom: "Guillaume",
        nom: "LE GUEN",
        naissance: 1729,
        deces: 1803,
        pereId: null,
        mereId: null
      },
      "I500891": {
        id: "I500891",
        prenom: "Anne",
        nom: "LE LIRZIN",
        naissance: 1733,
        deces: 1821,
        pereId: null,
        mereId: null
      },
      "I500095": {
        id: "I500095",
        prenom: "Antoinette",
        nom: "DERRIEN",
        naissance: 1768,
        deces: 1803,
        pereId: "I500913",
        mereId: "I500914"
      },
      "I500913": {
        id: "I500913",
        prenom: "Ollivier",
        nom: "DERRIEN",
        naissance: 1733,
        deces: 1780,
        pereId: null,
        mereId: null
      },
      "I500914": {
        id: "I500914",
        prenom: "Marie Mathurine",
        nom: "LE GALL",
        naissance: 1739,
        deces: 1798,
        pereId: null,
        mereId: null
      },
      "I500063": {
        id: "I500063",
        prenom: "Joséphine",
        nom: "DOUENNE",
        naissance: 1815,
        deces: 1900,
        pereId: "I500465",
        mereId: "I500466"
      },
      "I500465": {
        id: "I500465",
        prenom: "Nicolas",
        nom: "DOUENNE",
        naissance: 1787,
        deces: 1861,
        pereId: "I500467",
        mereId: "I500468"
      },
      "I500467": {
        id: "I500467",
        prenom: "Nicolas Pancrace ( La Grandeur)",
        nom: "DOUENNE",
        naissance: 1752,
        deces: 1830,
        pereId: "I500826",
        mereId: "I500827"
      },
      "I500826": {
        id: "I500826",
        prenom: "Pancrace",
        nom: "DOUENNE",
        naissance: 1719,
        deces: 1792,
        pereId: null,
        mereId: null
      },
      "I500827": {
        id: "I500827",
        prenom: "Geneviève",
        nom: "BERTIN",
        naissance: 1727,
        deces: 1771,
        pereId: null,
        mereId: null
      },
      "I500468": {
        id: "I500468",
        prenom: "Anne Annette",
        nom: "LEMEUR",
        naissance: 1766,
        deces: 1850,
        pereId: "I500937",
        mereId: "I500938"
      },
      "I500937": {
        id: "I500937",
        prenom: "Pierre",
        nom: "LEMEUR",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500938": {
        id: "I500938",
        prenom: "Marie",
        nom: "LE COZIC /Le Coffic",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500466": {
        id: "I500466",
        prenom: "Renée",
        nom: "LE MEAU",
        naissance: 1793,
        deces: 1852,
        pereId: "I500898",
        mereId: "I500899"
      },
      "I500898": {
        id: "I500898",
        prenom: "Jean",
        nom: "LE MAU",
        naissance: 1770,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500899": {
        id: "I500899",
        prenom: "Françoise",
        nom: "LE MERRER",
        naissance: 1772,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500056": {
        id: "I500056",
        prenom: "Aline Louise",
        nom: "LE TROADEC",
        naissance: 1844,
        deces: 1895,
        pereId: "I500744",
        mereId: "I500719"
      },
      "I500744": {
        id: "I500744",
        prenom: "Guillaume Marie",
        nom: "LE TROADEC",
        naissance: 1795,
        deces: 1845,
        pereId: "I500828",
        mereId: "I500829"
      },
      "I500828": {
        id: "I500828",
        prenom: "Joseph",
        nom: "LE TROADEC",
        naissance: 1766,
        deces: 1829,
        pereId: "I500900",
        mereId: "I500901"
      },
      "I500900": {
        id: "I500900",
        prenom: "Guillaume",
        nom: "LE TROADEC",
        naissance: 1728,
        deces: 1792,
        pereId: null,
        mereId: null
      },
      "I500901": {
        id: "I500901",
        prenom: "Marie Gabrielle",
        nom: "LE VAILLANT",
        naissance: 1731,
        deces: 1785,
        pereId: null,
        mereId: null
      },
      "I500829": {
        id: "I500829",
        prenom: "Marie Catherine",
        nom: "LE JUIF",
        naissance: 1768,
        deces: 1836,
        pereId: "I500902",
        mereId: "I500903"
      },
      "I500902": {
        id: "I500902",
        prenom: "Yves",
        nom: "LE JUIF (Le Guideo)",
        naissance: 1742,
        deces: 1786,
        pereId: null,
        mereId: null
      },
      "I500903": {
        id: "I500903",
        prenom: "Catherine",
        nom: "LABASQUE",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500719": {
        id: "I500719",
        prenom: "Aline Caroline",
        nom: "",
        naissance: 1815,
        deces: 1888,
        pereId: "I500786",
        mereId: "I500787"
      },
      "I500786": {
        id: "I500786",
        prenom: "Joseph Allain",
        nom: "THORAVAL",
        naissance: 1786,
        deces: null,
        pereId: "I501289",
        mereId: "I501290"
      },
      "I501289": {
        id: "I501289",
        prenom: "Allain",
        nom: "THORAVAL",
        naissance: 1753,
        deces: 1824,
        pereId: "I501409",
        mereId: "I501410"
      },
      "I501409": {
        id: "I501409",
        prenom: "Jean",
        nom: "THORAVAL",
        naissance: 1702,
        deces: 1761,
        pereId: null,
        mereId: null
      },
      "I501410": {
        id: "I501410",
        prenom: "Françoise",
        nom: "SERANDOUR",
        naissance: 1710,
        deces: 1781,
        pereId: null,
        mereId: null
      },
      "I501290": {
        id: "I501290",
        prenom: "Marie Louise",
        nom: "GARRIN",
        naissance: 1752,
        deces: 1828,
        pereId: null,
        mereId: null
      },
      "I500787": {
        id: "I500787",
        prenom: "Marguerite Antoinette",
        nom: "VOISY",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500007"
  },
  baranowski_pere: {
    label: "Baranowski De Rawiez",
    personnes: {
      "I500006": {
        id: "I500006",
        prenom: "Louise Esther Léontine",
        nom: "BARANOWSKI DE RAWIEZ",
        naissance: 1912,
        deces: 1992,
        pereId: "I500031",
        mereId: null
      },
      "I500031": {
        id: "I500031",
        prenom: "Etienne François",
        nom: "BARANOWSKI DE RAWIEZ",
        naissance: 1875,
        deces: 1914,
        pereId: "I500035",
        mereId: "I500036"
      },
      "I500035": {
        id: "I500035",
        prenom: "François Eustache",
        nom: "BARANOWSKI DE RAWIEZ",
        naissance: 1822,
        deces: 1904,
        pereId: "I500426",
        mereId: "I500428"
      },
      "I500426": {
        id: "I500426",
        prenom: "Bazyli",
        nom: "BARANOWSKI herb RAWICZ",
        naissance: null,
        deces: 1821,
        pereId: null,
        mereId: null
      },
      "I500428": {
        id: "I500428",
        prenom: "Tekla",
        nom: "Gąsecka",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500036": {
        id: "I500036",
        prenom: "Joséphine Barbe Françoise",
        nom: "GROSSI",
        naissance: 1839,
        deces: 1918,
        pereId: "I500429",
        mereId: "I500430"
      },
      "I500429": {
        id: "I500429",
        prenom: "Joseph Jean Batiste",
        nom: "GROSSI",
        naissance: 1800,
        deces: 1877,
        pereId: "I501548",
        mereId: "I501547"
      },
      "I501548": {
        id: "I501548",
        prenom: "Joseph",
        nom: "GROSSI",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501547": {
        id: "I501547",
        prenom: "Ténégonde",
        nom: "RATZINGER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500430": {
        id: "I500430",
        prenom: "Anna Barbara",
        nom: "KAUFMANN",
        naissance: 1806,
        deces: null,
        pereId: "I501549",
        mereId: "I501550"
      },
      "I501549": {
        id: "I501549",
        prenom: "Jean Michel",
        nom: "KAUFMANN",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501550": {
        id: "I501550",
        prenom: "Marie",
        nom: "HEINDEL",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500006"
  },
  baranowski_mere: {
    label: "Moine",
    personnes: {
      "I500006": {
        id: "I500006",
        prenom: "Louise Esther Léontine",
        nom: "BARANOWSKI DE RAWIEZ",
        naissance: 1912,
        deces: 1992,
        pereId: null,
        mereId: "I500010"
      },
      "I500010": {
        id: "I500010",
        prenom: "Louise Philomene",
        nom: "MOINE",
        naissance: 1878,
        deces: 1940,
        pereId: "I500038",
        mereId: "I500039"
      },
      "I500038": {
        id: "I500038",
        prenom: "Jean Baptiste Léonard",
        nom: "MOINE",
        naissance: 1826,
        deces: 1901,
        pereId: "I500386",
        mereId: "I500387"
      },
      "I500386": {
        id: "I500386",
        prenom: "François Joseph",
        nom: "MOINE",
        naissance: 1798,
        deces: 1853,
        pereId: "I500830",
        mereId: "I500831"
      },
      "I500830": {
        id: "I500830",
        prenom: "Jean Baptiste",
        nom: "MOINE",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500831": {
        id: "I500831",
        prenom: "Marie Joseph",
        nom: "MARCHAND",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500387": {
        id: "I500387",
        prenom: "Marie Véronique",
        nom: "ROY",
        naissance: 1798,
        deces: 1867,
        pereId: "I500835",
        mereId: "I500836"
      },
      "I500835": {
        id: "I500835",
        prenom: "Jean Claude Xavier",
        nom: "ROY",
        naissance: 1759,
        deces: 1820,
        pereId: "I501422",
        mereId: "I501423"
      },
      "I501422": {
        id: "I501422",
        prenom: "Pierre Claude",
        nom: "ROY",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501423": {
        id: "I501423",
        prenom: "Jeanne Françoise",
        nom: "GIRARDOT",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500836": {
        id: "I500836",
        prenom: "Marie Généreuse",
        nom: "SIMONIN",
        naissance: 1763,
        deces: 1834,
        pereId: "I500862",
        mereId: "I500863"
      },
      "I500862": {
        id: "I500862",
        prenom: "Pierre Joseph",
        nom: "SIMONIN",
        naissance: 1721,
        deces: 1797,
        pereId: "I501424",
        mereId: "I501425"
      },
      "I501424": {
        id: "I501424",
        prenom: "Joseph",
        nom: "SIMONIN",
        naissance: 1684,
        deces: 1752,
        pereId: null,
        mereId: null
      },
      "I501425": {
        id: "I501425",
        prenom: "Blaise",
        nom: "RECEVEUR",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500863": {
        id: "I500863",
        prenom: "Jeanne Françoise",
        nom: "BREUILLOT",
        naissance: 1727,
        deces: 1772,
        pereId: null,
        mereId: null
      },
      "I500039": {
        id: "I500039",
        prenom: "Marie Adélaïde Euphémie",
        nom: "CHARMOILLAUX",
        naissance: 1840,
        deces: 1908,
        pereId: "I500712",
        mereId: "I500713"
      },
      "I500712": {
        id: "I500712",
        prenom: "François Xavier",
        nom: "CHARMOILLAUX",
        naissance: 1814,
        deces: 1887,
        pereId: "I500837",
        mereId: "I500838"
      },
      "I500837": {
        id: "I500837",
        prenom: "Antoine Joseph",
        nom: "CHARMOILLAUX",
        naissance: 1785,
        deces: 1857,
        pereId: "I500852",
        mereId: "I500853"
      },
      "I500852": {
        id: "I500852",
        prenom: "Pierre Joseph",
        nom: "CHARMOILLAUX",
        naissance: 1738,
        deces: 1814,
        pereId: "I501093",
        mereId: "I501094"
      },
      "I501093": {
        id: "I501093",
        prenom: "Etienne",
        nom: "Charmoillaux",
        naissance: 1699,
        deces: 1775,
        pereId: null,
        mereId: null
      },
      "I501094": {
        id: "I501094",
        prenom: "Anne Claude Françoise",
        nom: "Roy",
        naissance: 1699,
        deces: 1739,
        pereId: null,
        mereId: null
      },
      "I500853": {
        id: "I500853",
        prenom: "Jeanne Agnès",
        nom: "PERROT",
        naissance: 1748,
        deces: 1817,
        pereId: "I501099",
        mereId: "I501100"
      },
      "I501099": {
        id: "I501099",
        prenom: "Jean Pierre",
        nom: "PERROT",
        naissance: 1719,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501100": {
        id: "I501100",
        prenom: "Anne",
        nom: "EMONIN",
        naissance: 1720,
        deces: 1781,
        pereId: null,
        mereId: null
      },
      "I500838": {
        id: "I500838",
        prenom: "Marie Josephe",
        nom: "FOILLON",
        naissance: 1784,
        deces: 1864,
        pereId: "I500846",
        mereId: "I500847"
      },
      "I500846": {
        id: "I500846",
        prenom: "Jean François",
        nom: "FOILLON",
        naissance: 1736,
        deces: 1794,
        pereId: null,
        mereId: null
      },
      "I500847": {
        id: "I500847",
        prenom: "Marie Blaise",
        nom: "DEVILLERS",
        naissance: 1745,
        deces: 1820,
        pereId: null,
        mereId: null
      },
      "I500713": {
        id: "I500713",
        prenom: "Marie Véronique",
        nom: "BARBETTE",
        naissance: 1817,
        deces: 1887,
        pereId: "I500840",
        mereId: "I500841"
      },
      "I500840": {
        id: "I500840",
        prenom: "Pierre Victor",
        nom: "BARBETTE",
        naissance: 1779,
        deces: 1853,
        pereId: "I500845",
        mereId: "I500844"
      },
      "I500845": {
        id: "I500845",
        prenom: "Pierre Claude",
        nom: "BARBETTE",
        naissance: 1739,
        deces: 1797,
        pereId: null,
        mereId: null
      },
      "I500844": {
        id: "I500844",
        prenom: "Jeanne Marie",
        nom: "GROSGIRARD",
        naissance: 1737,
        deces: null,
        pereId: "I501437",
        mereId: null
      },
      "I501437": {
        id: "I501437",
        prenom: "Claude",
        nom: "GROSGIRARD",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500841": {
        id: "I500841",
        prenom: "Marie Agnès",
        nom: "MÉDECIN",
        naissance: 1784,
        deces: 1863,
        pereId: "I500843",
        mereId: "I500842"
      },
      "I500843": {
        id: "I500843",
        prenom: "Désiré",
        nom: "MEDECIN",
        naissance: 1760,
        deces: 1799,
        pereId: "I500904",
        mereId: "I500905"
      },
      "I500904": {
        id: "I500904",
        prenom: "Jean Jacques",
        nom: "MEDECIN",
        naissance: 1731,
        deces: 1784,
        pereId: null,
        mereId: null
      },
      "I500905": {
        id: "I500905",
        prenom: "Jeanne Antoine",
        nom: "PRELAT",
        naissance: null,
        deces: 1802,
        pereId: null,
        mereId: null
      },
      "I500842": {
        id: "I500842",
        prenom: "Anne Thérèse",
        nom: "TRUCHOT",
        naissance: 1760,
        deces: null,
        pereId: "I501031",
        mereId: "I501032"
      },
      "I501031": {
        id: "I501031",
        prenom: "Jean Joseph",
        nom: "TRUCHOT",
        naissance: 1715,
        deces: 1768,
        pereId: null,
        mereId: null
      },
      "I501032": {
        id: "I501032",
        prenom: "Marie Thérèse",
        nom: "ROUSSE",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500006"
  },
  monsigny_pere: {
    label: "Monsigny",
    personnes: {
      "I500005": {
        id: "I500005",
        prenom: "Roger Alexandre Desiré",
        nom: "MONSIGNY",
        naissance: 1911,
        deces: 1985,
        pereId: "I500016",
        mereId: null
      },
      "I500016": {
        id: "I500016",
        prenom: "Victor Julien",
        nom: "MONSIGNY",
        naissance: 1877,
        deces: 1936,
        pereId: "I500048",
        mereId: "I500049"
      },
      "I500048": {
        id: "I500048",
        prenom: "Henri Aimable",
        nom: "MONSIGNY",
        naissance: 1831,
        deces: 1898,
        pereId: "I500057",
        mereId: "I500058"
      },
      "I500057": {
        id: "I500057",
        prenom: "Jean Baptiste Louis",
        nom: "MONSIGNY",
        naissance: 1799,
        deces: 1862,
        pereId: "I500109",
        mereId: "I500110"
      },
      "I500109": {
        id: "I500109",
        prenom: "Antoine Joseph",
        nom: "MONSIGNY",
        naissance: 1769,
        deces: 1839,
        pereId: "I500168",
        mereId: "I500169"
      },
      "I500168": {
        id: "I500168",
        prenom: "Claude, Antoine",
        nom: "DE MONSIGNY",
        naissance: 1724,
        deces: 1790,
        pereId: "I500170",
        mereId: "I500171"
      },
      "I500170": {
        id: "I500170",
        prenom: "Daniel",
        nom: "DE MONSIGNY",
        naissance: 1682,
        deces: 1747,
        pereId: null,
        mereId: null
      },
      "I500171": {
        id: "I500171",
        prenom: "Marie Françoise Marguerite",
        nom: "DENQUIN",
        naissance: 1686,
        deces: 1741,
        pereId: null,
        mereId: null
      },
      "I500169": {
        id: "I500169",
        prenom: "Françoise Marie Colombe",
        nom: "DETHE",
        naissance: 1732,
        deces: 1780,
        pereId: "I500172",
        mereId: "I500173"
      },
      "I500172": {
        id: "I500172",
        prenom: "Jean",
        nom: "DETHE",
        naissance: 1694,
        deces: 1760,
        pereId: null,
        mereId: null
      },
      "I500173": {
        id: "I500173",
        prenom: "Marie-Antoinette",
        nom: "PRUVOST",
        naissance: 1706,
        deces: 1760,
        pereId: null,
        mereId: null
      },
      "I500110": {
        id: "I500110",
        prenom: "Augustine Josephe",
        nom: "ROUSSEL",
        naissance: 1767,
        deces: 1821,
        pereId: "I500174",
        mereId: "I500175"
      },
      "I500174": {
        id: "I500174",
        prenom: "Jean Baptiste Joseph",
        nom: "ROUSSEL",
        naissance: 1735,
        deces: 1801,
        pereId: "I500188",
        mereId: "I500189"
      },
      "I500188": {
        id: "I500188",
        prenom: "Jean",
        nom: "ROUSSEL",
        naissance: null,
        deces: 1756,
        pereId: null,
        mereId: null
      },
      "I500189": {
        id: "I500189",
        prenom: "Marie-Claire, Alexis",
        nom: "GRESSIER",
        naissance: null,
        deces: 1756,
        pereId: null,
        mereId: null
      },
      "I500175": {
        id: "I500175",
        prenom: "Jeanne, Louise, Thérèse",
        nom: "LEMAIRE",
        naissance: 1733,
        deces: 1789,
        pereId: "I500190",
        mereId: "I500191"
      },
      "I500190": {
        id: "I500190",
        prenom: "Louis",
        nom: "LEMAIRE",
        naissance: null,
        deces: 1756,
        pereId: null,
        mereId: null
      },
      "I500191": {
        id: "I500191",
        prenom: "Catherine, Thérèse",
        nom: "HARDY",
        naissance: null,
        deces: 1756,
        pereId: null,
        mereId: null
      },
      "I500058": {
        id: "I500058",
        prenom: "Catherine Louise",
        nom: "Michel",
        naissance: 1802,
        deces: 1868,
        pereId: "I500125",
        mereId: "I500124"
      },
      "I500125": {
        id: "I500125",
        prenom: "Gaspard Joseph",
        nom: "MICHEL",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500124": {
        id: "I500124",
        prenom: "Florentine",
        nom: "DUBOR",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500049": {
        id: "I500049",
        prenom: "Désirée Esther",
        nom: "FEUGUEUR",
        naissance: 1838,
        deces: 1895,
        pereId: "I500126",
        mereId: "I500127"
      },
      "I500126": {
        id: "I500126",
        prenom: "Prosper André",
        nom: "FEUGUEUR",
        naissance: 1800,
        deces: 1855,
        pereId: "I500518",
        mereId: "I500519"
      },
      "I500518": {
        id: "I500518",
        prenom: "Pierre Francois",
        nom: "Feugueur",
        naissance: 1768,
        deces: 1825,
        pereId: "I500526",
        mereId: "I500527"
      },
      "I500526": {
        id: "I500526",
        prenom: "joseph",
        nom: "FEUGUEUR",
        naissance: 1732,
        deces: 1810,
        pereId: "I500536",
        mereId: "I500537"
      },
      "I500536": {
        id: "I500536",
        prenom: "Jacques",
        nom: "FEUGUEUR",
        naissance: 1701,
        deces: 1761,
        pereId: null,
        mereId: null
      },
      "I500537": {
        id: "I500537",
        prenom: "Anne",
        nom: "DUHAMEL",
        naissance: 1695,
        deces: 1762,
        pereId: null,
        mereId: null
      },
      "I500527": {
        id: "I500527",
        prenom: "Marie, Magdeleine",
        nom: "FÉRON",
        naissance: 1733,
        deces: 1808,
        pereId: null,
        mereId: null
      },
      "I500519": {
        id: "I500519",
        prenom: "Marie Aimée Julie",
        nom: "Florent",
        naissance: 1770,
        deces: 1818,
        pereId: "I500523",
        mereId: "I500524"
      },
      "I500523": {
        id: "I500523",
        prenom: "Simon",
        nom: "FLORENT",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500524": {
        id: "I500524",
        prenom: "Geneviève",
        nom: "VAULTIER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500127": {
        id: "I500127",
        prenom: "Therese Agathe Joséphine",
        nom: "LELEU",
        naissance: 1799,
        deces: 1869,
        pereId: "I500521",
        mereId: "I500522"
      },
      "I500521": {
        id: "I500521",
        prenom: "Jean Charles",
        nom: "LELEU",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500522": {
        id: "I500522",
        prenom: "Marie Catherine Joséphine",
        nom: "SENCE",
        naissance: 1761,
        deces: 1842,
        pereId: "I500572",
        mereId: "I500571"
      },
      "I500572": {
        id: "I500572",
        prenom: "Jean",
        nom: "SENCE",
        naissance: 1722,
        deces: 1781,
        pereId: "I500573",
        mereId: "I500574"
      },
      "I500573": {
        id: "I500573",
        prenom: "Nicolas",
        nom: "SENCE",
        naissance: 1667,
        deces: 1727,
        pereId: null,
        mereId: null
      },
      "I500574": {
        id: "I500574",
        prenom: "Marguerite Geneviève",
        nom: "BROCHE",
        naissance: 1696,
        deces: 1728,
        pereId: null,
        mereId: null
      },
      "I500571": {
        id: "I500571",
        prenom: "Marie Madeleine Nicole",
        nom: "Goulle",
        naissance: null,
        deces: null,
        pereId: "I500587",
        mereId: "I500588"
      },
      "I500587": {
        id: "I500587",
        prenom: "Claude",
        nom: "Goulle",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500588": {
        id: "I500588",
        prenom: "Marie",
        nom: "Le Long",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500005"
  },
  monsigny_mere: {
    label: "Rotereau",
    personnes: {
      "I500005": {
        id: "I500005",
        prenom: "Roger Alexandre Desiré",
        nom: "MONSIGNY",
        naissance: 1911,
        deces: 1985,
        pereId: null,
        mereId: "I500017"
      },
      "I500017": {
        id: "I500017",
        prenom: "Marie Louise",
        nom: "ROTEREAU",
        naissance: 1870,
        deces: 1938,
        pereId: "I500313",
        mereId: "I500312"
      },
      "I500313": {
        id: "I500313",
        prenom: "Charles Paul",
        nom: "Rotereau",
        naissance: 1859,
        deces: 1919,
        pereId: "I500314",
        mereId: "I500315"
      },
      "I500314": {
        id: "I500314",
        prenom: "Pierre Alexandre",
        nom: "ROTEREAU",
        naissance: 1818,
        deces: 1869,
        pereId: "I500452",
        mereId: "I500453"
      },
      "I500452": {
        id: "I500452",
        prenom: "Jean François",
        nom: "ROTEREAU",
        naissance: 1783,
        deces: 1860,
        pereId: "I500590",
        mereId: "I500591"
      },
      "I500590": {
        id: "I500590",
        prenom: "Jean",
        nom: "ROTEREAU",
        naissance: 1742,
        deces: 1801,
        pereId: "I500598",
        mereId: "I500599"
      },
      "I500598": {
        id: "I500598",
        prenom: "Jean",
        nom: "ROTEREAU",
        naissance: 1720,
        deces: 1757,
        pereId: null,
        mereId: null
      },
      "I500599": {
        id: "I500599",
        prenom: "Marie",
        nom: "BALLU",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500591": {
        id: "I500591",
        prenom: "Marie Jeanne",
        nom: "CHEVECIER",
        naissance: 1747,
        deces: 1830,
        pereId: "I500606",
        mereId: "I500607"
      },
      "I500606": {
        id: "I500606",
        prenom: "Jean",
        nom: "CHEVESSIER /CHEVECIER",
        naissance: 1717,
        deces: 1792,
        pereId: null,
        mereId: null
      },
      "I500607": {
        id: "I500607",
        prenom: "Marie",
        nom: "DUGAST",
        naissance: 1718,
        deces: 1785,
        pereId: null,
        mereId: null
      },
      "I500453": {
        id: "I500453",
        prenom: "Renée Françoise Jeanne",
        nom: "CHARPENTIER",
        naissance: 1785,
        deces: 1826,
        pereId: "I500593",
        mereId: "I500594"
      },
      "I500593": {
        id: "I500593",
        prenom: "Jean",
        nom: "CHARPENTIER",
        naissance: 1732,
        deces: 1785,
        pereId: "I500614",
        mereId: "I500615"
      },
      "I500614": {
        id: "I500614",
        prenom: "Julien",
        nom: "CHARPENTIER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500615": {
        id: "I500615",
        prenom: "Marie",
        nom: "FETIVEAU",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500594": {
        id: "I500594",
        prenom: "Renée",
        nom: "ARCHAMBAUD",
        naissance: null,
        deces: null,
        pereId: "I500612",
        mereId: "I500613"
      },
      "I500612": {
        id: "I500612",
        prenom: "Jean",
        nom: "ARCHAMBAUD",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500613": {
        id: "I500613",
        prenom: "Charlotte",
        nom: "MORICET",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500315": {
        id: "I500315",
        prenom: "Rose Victorine",
        nom: "BROUILLET",
        naissance: 1834,
        deces: 1879,
        pereId: "I500316",
        mereId: "I500317"
      },
      "I500316": {
        id: "I500316",
        prenom: "Jean Evre",
        nom: "BROUILLET",
        naissance: 1807,
        deces: 1864,
        pereId: "I500618",
        mereId: "I500619"
      },
      "I500618": {
        id: "I500618",
        prenom: "Nicolas",
        nom: "BROUILLET",
        naissance: 1769,
        deces: 1833,
        pereId: "I500620",
        mereId: "I500621"
      },
      "I500620": {
        id: "I500620",
        prenom: "Pierre",
        nom: "BROUILLET",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500621": {
        id: "I500621",
        prenom: "Barbe",
        nom: "GOERY",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500619": {
        id: "I500619",
        prenom: "Anne Catherine",
        nom: "Tinlef",
        naissance: 1765,
        deces: 1822,
        pereId: "I500624",
        mereId: "I500625"
      },
      "I500624": {
        id: "I500624",
        prenom: "Jean",
        nom: "TINLEF",
        naissance: 1732,
        deces: 1781,
        pereId: null,
        mereId: null
      },
      "I500625": {
        id: "I500625",
        prenom: "Anne",
        nom: "ROMARY",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500317": {
        id: "I500317",
        prenom: "Marie",
        nom: "WATHELIEUX",
        naissance: 1798,
        deces: 1877,
        pereId: "I500641",
        mereId: "I500642"
      },
      "I500641": {
        id: "I500641",
        prenom: "Jacques",
        nom: "WATHELIEUX",
        naissance: 1762,
        deces: 1824,
        pereId: "I500645",
        mereId: "I500646"
      },
      "I500645": {
        id: "I500645",
        prenom: "jacques",
        nom: "WATHELIEUX",
        naissance: 1728,
        deces: 1774,
        pereId: null,
        mereId: null
      },
      "I500646": {
        id: "I500646",
        prenom: "Marie Madeleine",
        nom: "PRUVOT",
        naissance: 1734,
        deces: 1765,
        pereId: null,
        mereId: null
      },
      "I500642": {
        id: "I500642",
        prenom: "Denise",
        nom: "THOUVENEL",
        naissance: 1777,
        deces: 1833,
        pereId: "I500643",
        mereId: "I500644"
      },
      "I500643": {
        id: "I500643",
        prenom: "Ignace",
        nom: "THOUVENEL",
        naissance: 1736,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500644": {
        id: "I500644",
        prenom: "Marie",
        nom: "PERICARD",
        naissance: 1738,
        deces: 1818,
        pereId: null,
        mereId: null
      },
      "I500312": {
        id: "I500312",
        prenom: "Marie Alexandrine",
        nom: "Girardin",
        naissance: 1852,
        deces: 1909,
        pereId: "I500318",
        mereId: "I500319"
      },
      "I500318": {
        id: "I500318",
        prenom: "Jean Baptiste",
        nom: "GIRARDIN",
        naissance: 1830,
        deces: 1861,
        pereId: "I500655",
        mereId: "I500656"
      },
      "I500655": {
        id: "I500655",
        prenom: "Louis",
        nom: "GIRARDIN",
        naissance: 1782,
        deces: 1857,
        pereId: "I500657",
        mereId: "I500658"
      },
      "I500657": {
        id: "I500657",
        prenom: "Pierre Jacques",
        nom: "GIRARDIN",
        naissance: 1734,
        deces: 1782,
        pereId: "I500668",
        mereId: "I500669"
      },
      "I500668": {
        id: "I500668",
        prenom: "Pierre",
        nom: "GIRARDIN",
        naissance: 1704,
        deces: 1777,
        pereId: null,
        mereId: null
      },
      "I500669": {
        id: "I500669",
        prenom: "Marguerite",
        nom: "POUPART",
        naissance: 1710,
        deces: 1772,
        pereId: null,
        mereId: null
      },
      "I500658": {
        id: "I500658",
        prenom: "Magdelaine",
        nom: "ROUHAULT",
        naissance: 1750,
        deces: 1796,
        pereId: null,
        mereId: null
      },
      "I500656": {
        id: "I500656",
        prenom: "Marie Madelaine",
        nom: "COGNAC",
        naissance: 1791,
        deces: 1877,
        pereId: "I500670",
        mereId: "I500671"
      },
      "I500670": {
        id: "I500670",
        prenom: "Pierre",
        nom: "COGNAC",
        naissance: 1754,
        deces: 1807,
        pereId: null,
        mereId: null
      },
      "I500671": {
        id: "I500671",
        prenom: "Marieanne",
        nom: "DROUHAULT",
        naissance: 1762,
        deces: 1831,
        pereId: null,
        mereId: null
      },
      "I500319": {
        id: "I500319",
        prenom: "Louise",
        nom: "NERNUY",
        naissance: 1834,
        deces: 1857,
        pereId: "I500448",
        mereId: "I500449"
      },
      "I500448": {
        id: "I500448",
        prenom: "Barthélémy",
        nom: "NERNUY",
        naissance: 1791,
        deces: 1855,
        pereId: null,
        mereId: null
      },
      "I500449": {
        id: "I500449",
        prenom: "Marie",
        nom: "MALTON",
        naissance: 1801,
        deces: 1869,
        pereId: "I501570",
        mereId: "I501571"
      },
      "I501570": {
        id: "I501570",
        prenom: "Alexis",
        nom: "MALTON",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501571": {
        id: "I501571",
        prenom: "Geneviève",
        nom: "CARTAND",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500005"
  },
  pillon_pere: {
    label: "Pillon",
    personnes: {
      "I500004": {
        id: "I500004",
        prenom: "Marie-Louise",
        nom: "PILLON",
        naissance: 1913,
        deces: 2009,
        pereId: "I500013",
        mereId: null
      },
      "I500013": {
        id: "I500013",
        prenom: "Arthur Alphonse",
        nom: "PILLON",
        naissance: 1881,
        deces: 1934,
        pereId: "I500128",
        mereId: "I500129"
      },
      "I500128": {
        id: "I500128",
        prenom: "Hippolyte Edouard",
        nom: "PILLON",
        naissance: 1833,
        deces: 1904,
        pereId: "I500258",
        mereId: "I500259"
      },
      "I500258": {
        id: "I500258",
        prenom: "Raphaël Victor",
        nom: "PILLON",
        naissance: 1785,
        deces: 1859,
        pereId: "I500260",
        mereId: "I500261"
      },
      "I500260": {
        id: "I500260",
        prenom: "Raphaël",
        nom: "PILLON",
        naissance: 1712,
        deces: 1798,
        pereId: "I500267",
        mereId: "I500270"
      },
      "I500267": {
        id: "I500267",
        prenom: "Jean",
        nom: "PILLON",
        naissance: 1676,
        deces: 1726,
        pereId: "I500268",
        mereId: "I500269"
      },
      "I500268": {
        id: "I500268",
        prenom: "Nicolas",
        nom: "PILLON",
        naissance: 1634,
        deces: 1704,
        pereId: null,
        mereId: null
      },
      "I500269": {
        id: "I500269",
        prenom: "Jeanne",
        nom: "Langlois",
        naissance: null,
        deces: 1706,
        pereId: null,
        mereId: null
      },
      "I500270": {
        id: "I500270",
        prenom: "Barbe",
        nom: "HAMELIN",
        naissance: 1671,
        deces: 1746,
        pereId: null,
        mereId: null
      },
      "I500261": {
        id: "I500261",
        prenom: "Marie Suzanne Elisabeth",
        nom: "LESAGE",
        naissance: 1755,
        deces: 1819,
        pereId: "I500263",
        mereId: "I500264"
      },
      "I500263": {
        id: "I500263",
        prenom: "Isidore",
        nom: "LESAGE",
        naissance: 1722,
        deces: 1776,
        pereId: "I500361",
        mereId: "I500362"
      },
      "I500361": {
        id: "I500361",
        prenom: "Isidore",
        nom: "LESAGE",
        naissance: 1695,
        deces: 1755,
        pereId: null,
        mereId: null
      },
      "I500362": {
        id: "I500362",
        prenom: "Catherine, Suzanne",
        nom: "BIGOT",
        naissance: 1687,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500264": {
        id: "I500264",
        prenom: "Anne",
        nom: "Le Gand",
        naissance: 1722,
        deces: 1800,
        pereId: "I500567",
        mereId: "I500570"
      },
      "I500567": {
        id: "I500567",
        prenom: "François",
        nom: "LE GAND",
        naissance: 1703,
        deces: 1755,
        pereId: null,
        mereId: null
      },
      "I500570": {
        id: "I500570",
        prenom: "Anne",
        nom: "LOZOUET",
        naissance: 1698,
        deces: 1755,
        pereId: null,
        mereId: null
      },
      "I500259": {
        id: "I500259",
        prenom: "Françoise Catherine Sophie",
        nom: "LELOUP",
        naissance: 1791,
        deces: 1869,
        pereId: "I500265",
        mereId: "I500266"
      },
      "I500265": {
        id: "I500265",
        prenom: "Gilles",
        nom: "LELOUP",
        naissance: 1741,
        deces: 1842,
        pereId: null,
        mereId: null
      },
      "I500266": {
        id: "I500266",
        prenom: "Marie Anne Catherine",
        nom: "CAILLEMER",
        naissance: 1759,
        deces: 1831,
        pereId: "I500944",
        mereId: "I500945"
      },
      "I500944": {
        id: "I500944",
        prenom: "Nicolas",
        nom: "CAILLEMER",
        naissance: 1736,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500945": {
        id: "I500945",
        prenom: "Catherine",
        nom: "LEDENTU",
        naissance: 1736,
        deces: 1781,
        pereId: null,
        mereId: null
      },
      "I500129": {
        id: "I500129",
        prenom: "Caroline Emée",
        nom: "RICHARD / MARIE",
        naissance: 1847,
        deces: 1904,
        pereId: null,
        mereId: "I500941"
      },
      "I500941": {
        id: "I500941",
        prenom: "Marie Emée",
        nom: "RICHARD",
        naissance: 1822,
        deces: null,
        pereId: "I501631",
        mereId: "I501632"
      },
      "I501631": {
        id: "I501631",
        prenom: "Pierre Louis Michel",
        nom: "RICHARD",
        naissance: 1793,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I501632": {
        id: "I501632",
        prenom: "Aimée Victoire Henriette",
        nom: "LETELLIER",
        naissance: 1799,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500004"
  },
  pillon_mere: {
    label: "Wernert",
    personnes: {
      "I500004": {
        id: "I500004",
        prenom: "Marie-Louise",
        nom: "PILLON",
        naissance: 1913,
        deces: 2009,
        pereId: null,
        mereId: "I500014"
      },
      "I500014": {
        id: "I500014",
        prenom: "Marie-Louise Léontine",
        nom: "WERNERT",
        naissance: 1881,
        deces: 1971,
        pereId: "I500037",
        mereId: "I500051"
      },
      "I500037": {
        id: "I500037",
        prenom: "",
        nom: "MARTINI",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500051": {
        id: "I500051",
        prenom: "Adèle Julie",
        nom: "RAYNAL / WERNERT",
        naissance: 1861,
        deces: 1899,
        pereId: "I500345",
        mereId: "I500344"
      },
      "I500345": {
        id: "I500345",
        prenom: "Aloïse",
        nom: "WERNERT",
        naissance: 1819,
        deces: 1893,
        pereId: "I500346",
        mereId: "I500347"
      },
      "I500346": {
        id: "I500346",
        prenom: "Aloïse",
        nom: "WERNERT",
        naissance: 1786,
        deces: 1856,
        pereId: "I500440",
        mereId: "I500441"
      },
      "I500440": {
        id: "I500440",
        prenom: "Antoine",
        nom: "WERNERT",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500441": {
        id: "I500441",
        prenom: "Marguerite",
        nom: "KIRST",
        naissance: null,
        deces: 1812,
        pereId: null,
        mereId: null
      },
      "I500347": {
        id: "I500347",
        prenom: "Catherine Genevieve",
        nom: "BOEUMLER",
        naissance: 1786,
        deces: null,
        pereId: "I500348",
        mereId: "I500349"
      },
      "I500348": {
        id: "I500348",
        prenom: "Jean George Valentin (dit Ignace)",
        nom: "BAEUMLER",
        naissance: 1752,
        deces: 1829,
        pereId: "I500443",
        mereId: "I500444"
      },
      "I500443": {
        id: "I500443",
        prenom: "Jean Conrad",
        nom: "BAEUMLER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500444": {
        id: "I500444",
        prenom: "Barbe",
        nom: "NIDERMEYER",
        naissance: null,
        deces: 1797,
        pereId: null,
        mereId: null
      },
      "I500349": {
        id: "I500349",
        prenom: "Marguerite",
        nom: "BORN",
        naissance: null,
        deces: 1794,
        pereId: null,
        mereId: null
      },
      "I500344": {
        id: "I500344",
        prenom: "Nathalie",
        nom: "RAYNAL",
        naissance: 1837,
        deces: 1893,
        pereId: "I500491",
        mereId: "I500497"
      },
      "I500491": {
        id: "I500491",
        prenom: "Antoine",
        nom: "RAYNAL",
        naissance: 1804,
        deces: 1885,
        pereId: "I500495",
        mereId: "I500496"
      },
      "I500495": {
        id: "I500495",
        prenom: "Valentin",
        nom: "RAYNAL",
        naissance: 1770,
        deces: 1845,
        pereId: "I500947",
        mereId: "I500948"
      },
      "I500947": {
        id: "I500947",
        prenom: "Jean Antoine",
        nom: "RAYNAL",
        naissance: 1729,
        deces: null,
        pereId: null,
        mereId: null
      },
      "I500948": {
        id: "I500948",
        prenom: "Elisabeth",
        nom: "Gaben",
        naissance: 1720,
        deces: 1810,
        pereId: null,
        mereId: null
      },
      "I500496": {
        id: "I500496",
        prenom: "Catherine",
        nom: "BERNAT",
        naissance: 1770,
        deces: 1845,
        pereId: null,
        mereId: null
      },
      "I500497": {
        id: "I500497",
        prenom: "Marianne",
        nom: "GAZAGNES",
        naissance: null,
        deces: null,
        pereId: "I500498",
        mereId: "I500499"
      },
      "I500498": {
        id: "I500498",
        prenom: "Jean Pierre",
        nom: "GAZAGNES",
        naissance: null,
        deces: 1814,
        pereId: null,
        mereId: null
      },
      "I500499": {
        id: "I500499",
        prenom: "Marianne",
        nom: "MERCIER",
        naissance: null,
        deces: null,
        pereId: null,
        mereId: null
      }
    },
    racineId: "I500004"
  }
};

// Liste plate de toutes les personnes des quatre branches, pour la recherche par nom
const TOUTES_PERSONNES = Object.entries(ARBRES).flatMap(([cle, a]) => a.personnes.map(p => ({
  ...p,
  _arbreKey: cle,
  _arbreNom: a.nom
})));
function sansAccents(txt) {
  return (txt || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const FARBEN = {
  1: "#6B5FA0",
  2: "#2E6E6E",
  3: "#9C5B3C",
  4: "#5B4636",
  5: "#8B3A3A",
  6: "#3F5C4E",
  7: "#A87F2E"
};
const PAPER = "#F1E8D6";
const PAPER_DARK = "#E4D6B8";
const INK = "#2E2318";
const INK_SOFT = "#6B5A47";
function initials(p) {
  return `${p.prenom[0]}${p.nom[0]}`;
}
function trouver(personnes, id) {
  return personnes.find(p => p.id === id) || null;
}
function enfantsDe(personnes, p) {
  return personnes.filter(k => k.pereId === p.id || k.mereId === p.id);
}
function fratrieDe(personnes, p) {
  if (!p.pereId && !p.mereId) return [];
  return personnes.filter(g => g.id !== p.id && (g.pereId && g.pereId === p.pereId || g.mereId && g.mereId === p.mereId));
}
// Racine d'origine de chaque branche (fixée une fois pour toutes, ne change
// jamais même si des personnes sont ajoutées plus tard).
const RACINES_ORIGINALES = {
  bareau: "I500007",
  baranowski: "I500006",
  monsigny: "I500005",
  pillon: "I500004"
};
function trouverRacine(personnes) {
  const directs = personnes.filter(p => !p.estFratrie);
  if (directs.length === 0) return personnes[0]?.id;
  const maxGen = Math.max(...directs.map(p => p.generation));
  const racine = directs.find(p => p.generation === maxGen);
  return (racine || directs[0]).id;
}
function App() {
  const [arbreKey, setArbreKey] = useState(null);
  const [ecran, setEcran] = useState("accueil"); // "accueil" | "graphique" | "fiche"
  const [cleGraphiqueActuelle, setCleGraphiqueActuelle] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [fontScale, setFontScale] = useState(1);
  const [notes, setNotes] = useState({});
  const [notesChargees, setNotesChargees] = useState(false);
  const [modifiable, setModifiable] = useState(false);
  const [pinExistant, setPinExistant] = useState(undefined); // undefined = pas encore chargé, null = aucun code défini
  const [pinModal, setPinModal] = useState(false);
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const [parametresOuverts, setParametresOuverts] = useState(false);
  const [modifications, setModifications] = useState({});
  const [ajouts, setAjouts] = useState({});
  const sauvegardeTimer = useRef(null);
  const sauvegardeTimerPersonnes = useRef(null);
  const sauvegardeTimerAjouts = useRef(null);

  // Chargement initial depuis la mémoire partagée de l'application
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("biographies", true);
        if (res && res.value) setNotes(JSON.parse(res.value));
      } catch (e) {
        // rien d'enregistré pour l'instant
      }
      setNotesChargees(true);
      try {
        const res = await window.storage.get("pin_code", true);
        setPinExistant(res && res.value ? res.value : null);
      } catch (e) {
        setPinExistant(null);
      }
      try {
        const res = await window.storage.get("modifications", true);
        if (res && res.value) setModifications(JSON.parse(res.value));
      } catch (e) {
        // aucune modification enregistrée pour l'instant
      }
      try {
        const res = await window.storage.get("personnes_ajoutees", true);
        if (res && res.value) setAjouts(JSON.parse(res.value));
      } catch (e) {
        // aucune personne ajoutée pour l'instant
      }
    })();
  }, []);
  const modifierNotes = majFn => {
    if (!modifiable) return;
    setNotes(prev => {
      const nouvelles = majFn(prev);
      clearTimeout(sauvegardeTimer.current);
      sauvegardeTimer.current = setTimeout(async () => {
        try {
          await window.storage.set("biographies", JSON.stringify(nouvelles), true);
        } catch (e) {
          console.error("Erreur de sauvegarde", e);
        }
      }, 700);
      return nouvelles;
    });
  };
  const enregistrerModificationPersonne = (id, donnees) => {
    if (!modifiable) return;
    setModifications(prev => {
      const nouvelles = {
        ...prev,
        [id]: donnees
      };
      clearTimeout(sauvegardeTimerPersonnes.current);
      sauvegardeTimerPersonnes.current = setTimeout(async () => {
        try {
          await window.storage.set("modifications", JSON.stringify(nouvelles), true);
        } catch (e) {
          console.error("Erreur de sauvegarde", e);
        }
      }, 300);
      return nouvelles;
    });
  };

  // Fusionne quelques champs dans une personne existante (ex. ajouter un pereId)
  // sans écraser d'éventuelles autres modifications déjà enregistrées pour elle.
  const fusionnerChampsPersonne = (id, champsPartiels) => {
    if (!modifiable) return;
    setModifications(prev => {
      const nouvelles = {
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          ...champsPartiels
        }
      };
      clearTimeout(sauvegardeTimerPersonnes.current);
      sauvegardeTimerPersonnes.current = setTimeout(async () => {
        try {
          await window.storage.set("modifications", JSON.stringify(nouvelles), true);
        } catch (e) {
          console.error("Erreur de sauvegarde", e);
        }
      }, 300);
      return nouvelles;
    });
  };
  const ajouterPersonne = donnees => {
    if (!modifiable) return null;
    const id = `ajout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const nouvellePersonne = {
      id,
      estFratrie: false,
      ...donnees
    };
    setAjouts(prev => {
      const nouveaux = {
        ...prev,
        [id]: nouvellePersonne
      };
      clearTimeout(sauvegardeTimerAjouts.current);
      sauvegardeTimerAjouts.current = setTimeout(async () => {
        try {
          await window.storage.set("personnes_ajoutees", JSON.stringify(nouveaux), true);
        } catch (e) {
          console.error("Erreur de sauvegarde", e);
        }
      }, 300);
      return nouveaux;
    });
    return id;
  };
  const appliquerModifications = liste => liste.map(p => modifications[p.id] ? {
    ...p,
    ...modifications[p.id]
  } : p);
  const fs = px => `${Math.round(px * fontScale)}px`;
  const arbre = arbreKey ? ARBRES[arbreKey] : null;
  const personnesEffectives = useMemo(() => {
    if (!arbre) return [];
    const base = appliquerModifications(arbre.personnes);
    const ajoutsDeCetArbre = appliquerModifications(Object.values(ajouts).filter(p => p._arbreKey === arbreKey));
    return [...base, ...ajoutsDeCetArbre];
  }, [arbre, arbreKey, modifications, ajouts]);
  const toutesPersonnesEffectives = useMemo(() => {
    const base = appliquerModifications(TOUTES_PERSONNES);
    const tousAjouts = appliquerModifications(Object.values(ajouts).map(p => ({
      ...p,
      _arbreNom: ARBRES[p._arbreKey]?.nom || p._arbreKey
    })));
    return [...base, ...tousAjouts];
  }, [modifications, ajouts]);
  const arbreKeyDeCle = cle => (cle || "").replace(/_pere$|_mere$/, "");
  const ouvrirGraphique = cle => {
    setCleGraphiqueActuelle(cle);
    setEcran("graphique");
  };
  const ouvrirFicheDepuisGraphique = id => {
    setArbreKey(arbreKeyDeCle(cleGraphiqueActuelle));
    setCurrentId(id);
    setEcran("fiche");
  };
  const allerA = id => {
    setCurrentId(id);
    setEcran("fiche");
  };
  const choisirDepuisRecherche = personne => {
    setArbreKey(personne._arbreKey);
    setCurrentId(personne.id);
    setEcran("fiche");
    setRechercheOuverte(false);
  };
  const retourDepuisFiche = () => {
    setEcran(cleGraphiqueActuelle ? "graphique" : "accueil");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: PAPER,
      color: INK,
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif"
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Atkinson+Hyperlegible:wght@400;700&display=swap');
        .btn-big { min-height: 60px; border-radius: 14px; border: 2px solid ${INK}; background: ${PAPER}; color: ${INK};
          font-family: 'Atkinson Hyperlegible', Verdana, sans-serif; font-weight: 700; cursor: pointer;
          transition: transform 0.08s ease, background 0.15s ease; }
        .btn-big:hover { background: ${PAPER_DARK}; }
        .btn-big:active { transform: scale(0.97); }
        .btn-primary { background: ${INK}; color: ${PAPER}; border-color: ${INK}; }
        .btn-primary:hover { background: #443626; }
        .person-chip { cursor: pointer; border: none; font-family: 'Atkinson Hyperlegible', Verdana, sans-serif; transition: transform 0.1s ease; background: transparent; }
        .person-chip:hover { transform: translateY(-3px); }
        .arbre-card { cursor: pointer; border: 3px solid ${INK}; border-radius: 18px; background: ${PAPER_DARK};
          padding: 26px; text-align: center; transition: transform 0.1s ease; }
        .arbre-card:hover { transform: translateY(-4px); }
      `), /*#__PURE__*/React.createElement("header", {
    style: {
      padding: "18px 20px",
      borderBottom: `3px solid ${INK}`,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      background: PAPER_DARK
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 700,
      fontSize: fs(30),
      margin: 0
    }
  }, ecran === "graphique" && cleGraphiqueActuelle ? ARBRES_GRAPHIQUES[cleGraphiqueActuelle]?.label : "Nos arbres généalogiques"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 20px",
      fontSize: fs(18)
    },
    onClick: () => setRechercheOuverte(true)
  }, "🔍 Rechercher"), ecran !== "accueil" && /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 20px",
      fontSize: fs(18)
    },
    onClick: () => {
      setEcran("accueil");
      setCleGraphiqueActuelle(null);
    }
  }, "🏠 Accueil"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 52,
      height: 52,
      fontSize: fs(20)
    },
    onClick: () => setParametresOuverts(v => !v),
    "aria-label": "Paramètres"
  }, "⚙️"), parametresOuverts && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: "60px",
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 14,
      padding: 16,
      zIndex: 40,
      minWidth: 240,
      boxShadow: "0 6px 18px rgba(0,0,0,0.18)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 8
    }
  }, "Taille du texte"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 48,
      height: 48,
      fontSize: fs(18)
    },
    onClick: () => setFontScale(s => Math.max(1, +(s - 0.15).toFixed(2))),
    "aria-label": "Réduire le texte"
  }, "A–"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 48,
      height: 48,
      fontSize: fs(18)
    },
    onClick: () => setFontScale(s => Math.min(1.6, +(s + 0.15).toFixed(2))),
    "aria-label": "Agrandir le texte"
  }, "A+")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 8
    }
  }, "Modification"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: "100%",
      padding: "10px 16px",
      fontSize: fs(16),
      opacity: pinExistant === undefined ? 0.5 : 1
    },
    onClick: () => {
      if (pinExistant === undefined) return;
      if (modifiable) setModifiable(false);else setPinModal(true);
    }
  }, modifiable ? "🔓 Modification activée" : "🔒 Verrouillé"))))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: ecran === "graphique" ? 0 : "26px 20px 60px"
    }
  }, ecran === "accueil" && /*#__PURE__*/React.createElement(SelecteurArbresGraphiques, {
    fs: fs,
    onChoisir: ouvrirGraphique
  }), ecran === "graphique" && /*#__PURE__*/React.createElement(ArbreGraphiqueSVG, {
    fs: fs,
    cle: cleGraphiqueActuelle,
    onFermer: () => {
      setEcran("accueil");
      setCleGraphiqueActuelle(null);
    },
    modifiable: modifiable,
    personnesCompletes: toutesPersonnesEffectives,
    onEnregistrerPersonne: enregistrerModificationPersonne,
    onOuvrirFiche: ouvrirFicheDepuisGraphique,
    ajouts: ajouts,
    onAjouterPersonne: ajouterPersonne,
    onFusionnerChamps: fusionnerChampsPersonne
  }), ecran === "fiche" && arbreKey && /*#__PURE__*/React.createElement(CardView, {
    fs: fs,
    personnes: personnesEffectives,
    currentId: currentId,
    setCurrentId: setCurrentId,
    notes: notes,
    modifierNotes: modifierNotes,
    modifiable: modifiable,
    arbreKey: arbreKey,
    onEnregistrerPersonne: enregistrerModificationPersonne,
    onAjouterPersonne: ajouterPersonne,
    onVoirArbre: retourDepuisFiche
  })), rechercheOuverte && /*#__PURE__*/React.createElement(Recherche, {
    fs: fs,
    personnes: toutesPersonnesEffectives,
    onFermer: () => setRechercheOuverte(false),
    onChoisir: choisirDepuisRecherche
  }), pinModal && /*#__PURE__*/React.createElement(PinModal, {
    fs: fs,
    pinExistant: pinExistant,
    onFermer: () => setPinModal(false),
    onDefinir: async code => {
      try {
        await window.storage.set("pin_code", code, true);
        setPinExistant(code);
        setModifiable(true);
        setPinModal(false);
      } catch (e) {
        console.error("Erreur d'enregistrement du code", e);
      }
    },
    onValider: code => {
      if (code === pinExistant) {
        setModifiable(true);
        setPinModal(false);
        return true;
      }
      return false;
    }
  }));
}

// ---------- Écran d'accueil : choix de la lignée ----------
function ArbreSelecteur({
  fs,
  onChoisir
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: fs(17),
      color: INK_SOFT,
      marginBottom: 30
    }
  }, "Choisissez une lignée familiale à consulter."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 24
    }
  }, Object.entries(ARBRES).map(([key, a]) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: "arbre-card",
    onClick: () => onChoisir(key)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 700,
      fontSize: fs(24),
      marginBottom: 6
    }
  }, a.nom), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(15),
      color: INK_SOFT,
      marginBottom: 10
    }
  }, a.description), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(14),
      color: INK_SOFT
    }
  }, a.personnes.length, " personnes")))));
}

// ---------- Belle vue d'ensemble : 8 arbres graphiques (ligne père / ligne mère) ----------
function calculerLayoutArbre(personnes, racineId) {
  const largeur = {};
  let profondeurMax = 0;
  function calcLargeur(id) {
    if (largeur[id] !== undefined) return largeur[id];
    const n = personnes[id];
    if (!n) return 0;
    const gauche = n.pereId && personnes[n.pereId] ? calcLargeur(n.pereId) : 0;
    const droite = n.mereId && personnes[n.mereId] ? calcLargeur(n.mereId) : 0;
    const total = gauche + droite || 1;
    largeur[id] = total;
    return total;
  }
  const largeurTotale = calcLargeur(racineId);
  const positions = {};
  function placer(id, xGauche, xDroite, profondeur) {
    const n = personnes[id];
    if (!n) return;
    profondeurMax = Math.max(profondeurMax, profondeur);
    positions[id] = {
      colonne: (xGauche + xDroite) / 2,
      profondeur
    };
    const aPere = n.pereId && personnes[n.pereId];
    const aMere = n.mereId && personnes[n.mereId];
    if (aPere && aMere) {
      const lg = calcLargeur(n.pereId);
      const ld = calcLargeur(n.mereId);
      const frontiere = xGauche + (xDroite - xGauche) * (lg / (lg + ld));
      placer(n.pereId, xGauche, frontiere, profondeur + 1);
      placer(n.mereId, frontiere, xDroite, profondeur + 1);
    } else if (aPere) {
      placer(n.pereId, xGauche, xDroite, profondeur + 1);
    } else if (aMere) {
      placer(n.mereId, xGauche, xDroite, profondeur + 1);
    }
  }
  placer(racineId, 0, largeurTotale, 0);
  return {
    positions,
    largeurTotale,
    profondeurMax
  };
}
function SelecteurArbresGraphiques({
  fs,
  onChoisir
}) {
  const groupes = [["bareau_pere", "bareau_mere"], ["baranowski_pere", "baranowski_mere"], ["monsigny_pere", "monsigny_mere"], ["pillon_pere", "pillon_mere"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: fs(16),
      color: INK_SOFT,
      marginBottom: 26
    }
  }, "Chaque branche est séparée en deux : la ligne du père et la ligne de la mère."), groupes.map((paire, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "center",
      marginBottom: 20
    }
  }, paire.map(cle => {
    const t = ARBRES_GRAPHIQUES[cle];
    if (!t) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: cle,
      className: "arbre-card",
      style: {
        minWidth: 220
      },
      onClick: () => onChoisir(cle)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Fraunces', Georgia, serif",
        fontWeight: 700,
        fontSize: fs(22),
        marginBottom: 6
      }
    }, t.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: fs(14),
        color: INK_SOFT
      }
    }, Object.keys(t.personnes).length, " personnes"));
  }))));
}
function ArbreGraphiqueSVG({
  fs,
  cle,
  onFermer,
  modifiable,
  personnesCompletes,
  onEnregistrerPersonne,
  onOuvrirFiche,
  ajouts,
  onAjouterPersonne,
  onFusionnerChamps
}) {
  const tree = ARBRES_GRAPHIQUES[cle];
  const [idEnEdition, setIdEnEdition] = useState(null);
  const [ajoutParent, setAjoutParent] = useState(null); // { personneId, role } | null
  if (!tree) return null;
  const arbreKeyBase = (cle || "").replace(/_pere$|_mere$/, "");
  const personnesFusionnees = {
    ...tree.personnes
  };
  Object.values(ajouts || {}).forEach(p => {
    if (p._arbreKey !== arbreKeyBase) return;
    personnesFusionnees[p.id] = {
      id: p.id,
      prenom: p.prenom,
      nom: p.nom,
      naissance: p.naissance?.annee ?? null,
      deces: p.deces?.annee ?? null,
      pereId: p.pereId || null,
      mereId: p.mereId || null
    };
  });
  const {
    positions,
    largeurTotale,
    profondeurMax
  } = calculerLayoutArbre(personnesFusionnees, tree.racineId);
  const carteCompletes = new Map(personnesCompletes.map(p => [p.id, p]));
  const resoudre = n => {
    const complet = carteCompletes.get(n.id);
    if (complet) return complet;
    return {
      id: n.id,
      prenom: n.prenom,
      nom: n.nom,
      naissance: {
        annee: n.naissance,
        lieu: ""
      },
      deces: n.deces ? {
        annee: n.deces,
        lieu: "",
        cimetiere: ""
      } : null,
      profession: {
        metier: "",
        lieu: ""
      },
      mariage: null
    };
  };
  const uniteX = 170;
  const uniteY = 130;
  const marge = 80;
  const largeurPx = largeurTotale * uniteX + marge * 2;
  const hauteurPx = profondeurMax * uniteY + marge * 2 + 40;
  const px = id => marge + positions[id].colonne * uniteX;
  const py = id => hauteurPx - marge - positions[id].profondeur * uniteY;
  const enregistrerNouveauParent = donnees => {
    const {
      personneId,
      role
    } = ajoutParent;
    const parentActuel = carteCompletes.get(personneId);
    const nouvelId = onAjouterPersonne({
      ...donnees,
      generation: parentActuel ? parentActuel.generation - 1 : 1,
      estFratrie: false,
      _arbreKey: arbreKeyBase
    });
    if (nouvelId) onFusionnerChamps(personneId, {
      [role === "Père" ? "pereId" : "mereId"]: nouvelId
    });
    setAjoutParent(null);
  };
  const branches = [];
  Object.values(personnesFusionnees).forEach(n => {
    if (!positions[n.id]) return;
    [n.pereId, n.mereId].forEach(parentId => {
      if (!parentId || !positions[parentId]) return;
      const cx = px(n.id),
        cy = py(n.id);
      const pxp = px(parentId),
        pyp = py(parentId);
      const largeurTrait = Math.max(1.5, 5 - positions[n.id].profondeur * 0.6);
      branches.push(/*#__PURE__*/React.createElement("path", {
        key: `${n.id}-${parentId}`,
        d: `M ${cx} ${cy} C ${cx} ${(cy + pyp) / 2}, ${pxp} ${(cy + pyp) / 2}, ${pxp} ${pyp}`,
        fill: "none",
        stroke: "#BA7517",
        strokeWidth: largeurTrait,
        strokeLinecap: "round"
      }));
    });
  });
  const personneEdition = idEnEdition ? carteCompletes.get(idEnEdition) || resoudre(personnesFusionnees[idEnEdition]) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: PAPER,
      zIndex: 45,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      borderBottom: `3px solid ${INK}`,
      background: PAPER_DARK
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(24),
      fontWeight: 700
    }
  }, tree.label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fs(14),
      color: INK_SOFT,
      fontWeight: 400
    }
  }, "— touchez une personne pour ", modifiable ? "la modifier" : "voir sa fiche")), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 18px",
      fontSize: fs(16)
    },
    onClick: onFermer
  }, "✕ Fermer")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "auto",
      flex: 1,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: largeurPx,
    height: hauteurPx,
    style: {
      display: "block"
    }
  }, branches, Object.values(personnesFusionnees).map(n => {
    if (!positions[n.id]) return null;
    const complet = carteCompletes.get(n.id);
    const prenomAff = complet ? complet.prenom : n.prenom;
    const nomAff = complet ? complet.nom : n.nom;
    const anneeNaiss = complet ? complet.naissance?.annee : n.naissance;
    const anneeDeces = complet ? complet.deces?.annee : n.deces;
    const cx = px(n.id),
      cy = py(n.id);
    const rayon = Math.max(9, 20 - positions[n.id].profondeur * 2);
    const annees = anneeNaiss ? anneeDeces ? `${anneeNaiss}–${anneeDeces}` : `né(e) ${anneeNaiss}` : "";
    const taillePrenom = parseInt(fs(12), 10);
    const tailleAnnees = parseInt(fs(11), 10);
    const largeurFond = (txt, taille) => Math.max(24, txt.length * taille * 0.6 + 14);
    const peutEtendre = modifiable && positions[n.id].profondeur < 6;
    return /*#__PURE__*/React.createElement("g", {
      key: n.id
    }, /*#__PURE__*/React.createElement("g", {
      style: {
        cursor: modifiable ? "pointer" : "default"
      },
      onClick: () => modifiable ? setIdEnEdition(n.id) : onOuvrirFiche && onOuvrirFiche(n.id)
    }, /*#__PURE__*/React.createElement("rect", {
      x: cx - largeurFond(prenomAff, taillePrenom) / 2,
      y: cy + rayon + 4,
      width: largeurFond(prenomAff, taillePrenom),
      height: taillePrenom + 4,
      rx: "4",
      fill: PAPER
    }), /*#__PURE__*/React.createElement("rect", {
      x: cx - largeurFond(nomAff, taillePrenom) / 2,
      y: cy + rayon + 18,
      width: largeurFond(nomAff, taillePrenom),
      height: taillePrenom + 4,
      rx: "4",
      fill: PAPER
    }), annees && /*#__PURE__*/React.createElement("rect", {
      x: cx - largeurFond(annees, tailleAnnees) / 2,
      y: cy + rayon + 32,
      width: largeurFond(annees, tailleAnnees),
      height: tailleAnnees + 4,
      rx: "4",
      fill: PAPER
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: rayon,
      fill: FARBEN[positions[n.id].profondeur % 7 + 1],
      stroke: INK,
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + rayon + 15,
      textAnchor: "middle",
      fontSize: fs(12),
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif",
      fill: INK,
      fontWeight: "700"
    }, prenomAff), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + rayon + 29,
      textAnchor: "middle",
      fontSize: fs(12),
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif",
      fill: INK,
      fontWeight: "700"
    }, nomAff), annees && /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + rayon + 43,
      textAnchor: "middle",
      fontSize: fs(11),
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif",
      fill: INK_SOFT
    }, annees)), peutEtendre && !n.pereId && /*#__PURE__*/React.createElement("g", {
      style: {
        cursor: "pointer"
      },
      onClick: () => setAjoutParent({
        personneId: n.id,
        role: "Père"
      })
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx - 34,
      cy: cy - uniteY * 0.55,
      r: "13",
      fill: PAPER_DARK,
      stroke: INK,
      strokeWidth: "2",
      strokeDasharray: "3,2"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx - 34,
      y: cy - uniteY * 0.55 + 5,
      textAnchor: "middle",
      fontSize: fs(15),
      fontWeight: "700",
      fill: INK
    }, "+")), peutEtendre && !n.mereId && /*#__PURE__*/React.createElement("g", {
      style: {
        cursor: "pointer"
      },
      onClick: () => setAjoutParent({
        personneId: n.id,
        role: "Mère"
      })
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx + 34,
      cy: cy - uniteY * 0.55,
      r: "13",
      fill: PAPER_DARK,
      stroke: INK,
      strokeWidth: "2",
      strokeDasharray: "3,2"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx + 34,
      y: cy - uniteY * 0.55 + 5,
      textAnchor: "middle",
      fontSize: fs(15),
      fontWeight: "700",
      fill: INK
    }, "+")));
  }))), personneEdition && /*#__PURE__*/React.createElement(EditModal, {
    fs: fs,
    personne: personneEdition,
    onFermer: () => setIdEnEdition(null),
    onEnregistrer: donnees => {
      onEnregistrerPersonne(idEnEdition, donnees);
      setIdEnEdition(null);
    }
  }), ajoutParent && /*#__PURE__*/React.createElement(AjoutModal, {
    fs: fs,
    titre: `Ajouter le/la ${ajoutParent.role.toLowerCase()} de ${resoudre(personnesFusionnees[ajoutParent.personneId]).prenom}`,
    onFermer: () => setAjoutParent(null),
    onEnregistrer: enregistrerNouveauParent
  }));
}
function PanneauGraphique({
  fs,
  onFermer,
  modifiable,
  personnesCompletes,
  onEnregistrerPersonne
}) {
  const [cleChoisie, setCleChoisie] = useState(null);
  if (cleChoisie) {
    return /*#__PURE__*/React.createElement(ArbreGraphiqueSVG, {
      fs: fs,
      cle: cleChoisie,
      onFermer: () => setCleChoisie(null),
      modifiable: modifiable,
      personnesCompletes: personnesCompletes,
      onEnregistrerPersonne: onEnregistrerPersonne
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: PAPER,
      zIndex: 45,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      borderBottom: `3px solid ${INK}`,
      background: PAPER_DARK
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(24),
      fontWeight: 700
    }
  }, "Belle vue d'ensemble"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 18px",
      fontSize: fs(16)
    },
    onClick: onFermer
  }, "✕ Fermer")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px 20px"
    }
  }, /*#__PURE__*/React.createElement(SelecteurArbresGraphiques, {
    fs: fs,
    onChoisir: setCleChoisie
  })));
}
function Recherche({
  fs,
  personnes,
  onFermer,
  onChoisir
}) {
  const [texte, setTexte] = useState("");
  const requete = sansAccents(texte.trim());
  const resultats = requete.length < 2 ? [] : personnes.filter(p => sansAccents(`${p.prenom} ${p.nom}`).includes(requete)).slice(0, 30);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(46,35,24,0.55)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 16px",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 480,
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(24),
      margin: 0
    }
  }, "Rechercher"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 44,
      height: 44,
      fontSize: fs(18)
    },
    onClick: onFermer,
    "aria-label": "Fermer"
  }, "✕")), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: texte,
    onChange: e => setTexte(e.target.value),
    placeholder: "Prénom ou nom de famille…",
    style: {
      width: "100%",
      fontSize: fs(18),
      padding: "12px 14px",
      borderRadius: 12,
      border: `2px solid ${INK}`,
      marginBottom: 16,
      boxSizing: "border-box",
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto"
    }
  }, requete.length >= 2 && resultats.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: INK_SOFT,
      fontSize: fs(15)
    }
  }, "Aucune personne trouvée."), resultats.map(p => /*#__PURE__*/React.createElement("button", {
    key: `${p._arbreKey}-${p.id}`,
    className: "btn-big",
    style: {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "12px 16px",
      marginBottom: 8,
      fontSize: fs(16)
    },
    onClick: () => onChoisir(p)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, p.prenom, " ", p.nom), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      fontWeight: 400
    }
  }, AnneesTxt(p), " — branche ", p._arbreNom))))));
}

// ---------- Verrou par code PIN ----------
function PinModal({
  fs,
  pinExistant,
  onFermer,
  onDefinir,
  onValider
}) {
  const [saisie, setSaisie] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");
  const modeDefinition = pinExistant === null;
  const valider = () => {
    if (modeDefinition) {
      if (saisie.length < 4) {
        setErreur("Le code doit contenir au moins 4 chiffres.");
        return;
      }
      if (saisie !== confirmation) {
        setErreur("Les deux codes ne correspondent pas.");
        return;
      }
      onDefinir(saisie);
    } else {
      const ok = onValider(saisie);
      if (!ok) setErreur("Code incorrect.");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(46,35,24,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 26,
      width: "100%",
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(24),
      marginTop: 0
    }
  }, modeDefinition ? "Créer votre code" : "Entrer votre code"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: fs(14),
      color: INK_SOFT
    }
  }, modeDefinition ? "Ce code protège la modification des biographies. Les autres personnes pourront toujours consulter l'arbre, mais pas le modifier." : "Entrez votre code pour activer la modification."), /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: saisie,
    onChange: e => setSaisie(e.target.value),
    placeholder: "Code",
    style: {
      width: "100%",
      fontSize: fs(18),
      padding: "10px 14px",
      borderRadius: 12,
      border: `2px solid ${INK}`,
      marginBottom: 10,
      boxSizing: "border-box"
    }
  }), modeDefinition && /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    value: confirmation,
    onChange: e => setConfirmation(e.target.value),
    placeholder: "Confirmer le code",
    style: {
      width: "100%",
      fontSize: fs(18),
      padding: "10px 14px",
      borderRadius: 12,
      border: `2px solid ${INK}`,
      marginBottom: 10,
      boxSizing: "border-box"
    }
  }), erreur && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#8B3A3A",
      fontSize: fs(14)
    }
  }, erreur), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: onFermer
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big btn-primary",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: valider
  }, modeDefinition ? "Créer" : "Valider"))));
}

// ---------- Formulaire de modification d'une personne (mode déverrouillé) ----------
// ---------- Éditeur de plusieurs domiciles (une personne a pu déménager) ----------
function EditeurDomiciles({
  fs,
  domiciles,
  setDomiciles,
  champStyle,
  etiquetteStyle
}) {
  const modifier = (i, champ, valeur) => {
    setDomiciles(prev => prev.map((d, idx) => idx === i ? {
      ...d,
      [champ]: valeur
    } : d));
  };
  const supprimer = i => setDomiciles(prev => prev.filter((_, idx) => idx !== i));
  const ajouter = () => setDomiciles(prev => [...prev, {
    date: "",
    lieu: ""
  }]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Domiciles (un par ligne, du plus ancien au plus récent)"), domiciles.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...champStyle,
      marginBottom: 0,
      flex: 2
    },
    value: d.lieu,
    onChange: e => modifier(i, "lieu", e.target.value),
    placeholder: "Lieu"
  }), /*#__PURE__*/React.createElement("input", {
    style: {
      ...champStyle,
      marginBottom: 0,
      flex: 1
    },
    value: d.date,
    onChange: e => modifier(i, "date", e.target.value),
    placeholder: "Année"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-big",
    style: {
      padding: "8px 12px",
      fontSize: fs(14)
    },
    onClick: () => supprimer(i),
    "aria-label": "Supprimer ce domicile"
  }, "✕"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-big",
    style: {
      padding: "8px 14px",
      fontSize: fs(14),
      marginBottom: 12
    },
    onClick: ajouter
  }, "+ Ajouter un domicile"));
}
function EditModal({
  fs,
  personne,
  onFermer,
  onEnregistrer
}) {
  const [prenom, setPrenom] = useState(personne.prenom || "");
  const [nom, setNom] = useState(personne.nom || "");
  const [dateNaissance, setDateNaissance] = useState(personne.naissance?.date || (personne.naissance?.annee ?? ""));
  const [lieuNaissance, setLieuNaissance] = useState(personne.naissance?.lieu || "");
  const [dateDeces, setDateDeces] = useState(personne.deces?.date || (personne.deces?.annee ?? ""));
  const [lieuDeces, setLieuDeces] = useState(personne.deces?.lieu || "");
  const [cimetiere, setCimetiere] = useState(personne.deces?.cimetiere || "");
  const [metier, setMetier] = useState(personne.profession?.metier || "");
  const [lieuProfession, setLieuProfession] = useState(personne.profession?.lieu || "");
  const [domiciles, setDomiciles] = useState(personne.domiciles && personne.domiciles.length ? personne.domiciles : []);
  const [dateMariage, setDateMariage] = useState(personne.mariage?.date || "");
  const [lieuMariage, setLieuMariage] = useState(personne.mariage?.lieu || "");
  const [sourceUrl, setSourceUrl] = useState(personne.sourceUrl || "");
  const champStyle = {
    width: "100%",
    fontSize: fs(16),
    padding: "10px 12px",
    borderRadius: 10,
    border: `2px solid ${INK}`,
    marginBottom: 12,
    boxSizing: "border-box",
    fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif"
  };
  const etiquetteStyle = {
    fontSize: fs(13),
    color: INK_SOFT,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: 4,
    display: "block"
  };
  const enregistrer = () => {
    const extraireAnnee = txt => {
      const m = (txt || "").match(/(\d{4})/);
      return m ? parseInt(m[1], 10) : null;
    };
    const annNaissNum = extraireAnnee(dateNaissance);
    const annDecesNum = extraireAnnee(dateDeces);
    const donnees = {
      prenom: prenom.trim(),
      nom: nom.trim(),
      naissance: {
        date: dateNaissance.trim(),
        annee: annNaissNum,
        lieu: lieuNaissance.trim()
      },
      deces: annDecesNum || dateDeces.trim() || lieuDeces.trim() || cimetiere.trim() ? {
        date: dateDeces.trim(),
        annee: annDecesNum,
        lieu: lieuDeces.trim(),
        cimetiere: cimetiere.trim()
      } : null,
      profession: {
        metier: metier.trim(),
        lieu: lieuProfession.trim()
      },
      domiciles: domiciles.filter(d => d.lieu.trim()).map(d => ({
        date: d.date.trim(),
        lieu: d.lieu.trim()
      })),
      mariage: dateMariage.trim() || lieuMariage.trim() ? {
        date: dateMariage.trim(),
        lieu: lieuMariage.trim()
      } : null,
      sourceUrl: sourceUrl.trim()
    };
    onEnregistrer(donnees);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(46,35,24,0.55)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "30px 16px",
      zIndex: 55,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 26,
      width: "100%",
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(24),
      margin: 0
    }
  }, "Modifier la fiche"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 44,
      height: 44,
      fontSize: fs(18)
    },
    onClick: onFermer,
    "aria-label": "Fermer"
  }, "✕")), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Prénom"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: prenom,
    onChange: e => setPrenom(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Nom"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: nom,
    onChange: e => setNom(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de naissance"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateNaissance,
    onChange: e => setDateNaissance(e.target.value),
    placeholder: "ex. 26 septembre 1910, ou juste 1910"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de naissance"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuNaissance,
    onChange: e => setLieuNaissance(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de décès"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateDeces,
    onChange: e => setDateDeces(e.target.value),
    placeholder: "laisser vide si en vie"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de décès"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuDeces,
    onChange: e => setLieuDeces(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Cimetière"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: cimetiere,
    onChange: e => setCimetiere(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Profession"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: metier,
    onChange: e => setMetier(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de la profession"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuProfession,
    onChange: e => setLieuProfession(e.target.value)
  }), /*#__PURE__*/React.createElement(EditeurDomiciles, {
    fs: fs,
    domiciles: domiciles,
    setDomiciles: setDomiciles,
    champStyle: champStyle,
    etiquetteStyle: etiquetteStyle
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de mariage"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateMariage,
    onChange: e => setDateMariage(e.target.value),
    placeholder: "ex. 14 septembre 1937"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de mariage"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuMariage,
    onChange: e => setLieuMariage(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lien vers les sources (dossier OneDrive)"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: sourceUrl,
    onChange: e => setSourceUrl(e.target.value),
    placeholder: "https://onedrive.live.com/..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: onFermer
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big btn-primary",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: enregistrer
  }, "Enregistrer"))));
}

// ---------- Formulaire d'ajout d'une nouvelle personne ----------
function AjoutModal({
  fs,
  titre,
  onFermer,
  onEnregistrer,
  parentConnu
}) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [roleParentConnu, setRoleParentConnu] = useState("Père");
  const [dateNaissance, setDateNaissance] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [dateDeces, setDateDeces] = useState("");
  const [lieuDeces, setLieuDeces] = useState("");
  const [cimetiere, setCimetiere] = useState("");
  const [metier, setMetier] = useState("");
  const [lieuProfession, setLieuProfession] = useState("");
  const [domiciles, setDomiciles] = useState([]);
  const [dateMariage, setDateMariage] = useState("");
  const [lieuMariage, setLieuMariage] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const champStyle = {
    width: "100%",
    fontSize: fs(16),
    padding: "10px 12px",
    borderRadius: 10,
    border: `2px solid ${INK}`,
    marginBottom: 12,
    boxSizing: "border-box",
    fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif"
  };
  const etiquetteStyle = {
    fontSize: fs(13),
    color: INK_SOFT,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: 4,
    display: "block"
  };
  const enregistrer = () => {
    if (!prenom.trim() && !nom.trim()) return;
    const extraireAnnee = txt => {
      const m = (txt || "").match(/(\d{4})/);
      return m ? parseInt(m[1], 10) : null;
    };
    const annNaissNum = extraireAnnee(dateNaissance);
    const annDecesNum = extraireAnnee(dateDeces);
    onEnregistrer({
      prenom: prenom.trim(),
      nom: nom.trim(),
      naissance: {
        date: dateNaissance.trim(),
        annee: annNaissNum,
        lieu: lieuNaissance.trim()
      },
      deces: annDecesNum || dateDeces.trim() || lieuDeces.trim() || cimetiere.trim() ? {
        date: dateDeces.trim(),
        annee: annDecesNum,
        lieu: lieuDeces.trim(),
        cimetiere: cimetiere.trim()
      } : null,
      profession: {
        metier: metier.trim(),
        lieu: lieuProfession.trim()
      },
      domiciles: domiciles.filter(d => d.lieu.trim()).map(d => ({
        date: d.date.trim(),
        lieu: d.lieu.trim()
      })),
      mariage: dateMariage.trim() || lieuMariage.trim() ? {
        date: dateMariage.trim(),
        lieu: lieuMariage.trim()
      } : null,
      partnerId: null,
      pereId: parentConnu && roleParentConnu === "Père" ? parentConnu.id : null,
      mereId: parentConnu && roleParentConnu === "Mère" ? parentConnu.id : null,
      remarque: "",
      sourceUrl: sourceUrl.trim()
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(46,35,24,0.55)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "30px 16px",
      zIndex: 55,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 26,
      width: "100%",
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(22),
      margin: 0
    }
  }, titre), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 44,
      height: 44,
      fontSize: fs(18)
    },
    onClick: onFermer,
    "aria-label": "Fermer"
  }, "✕")), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Prénom"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: prenom,
    onChange: e => setPrenom(e.target.value),
    autoFocus: true
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Nom"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: nom,
    onChange: e => setNom(e.target.value)
  }), parentConnu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, parentConnu.prenom, " ", parentConnu.nom, " est…"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn-big ${roleParentConnu === "Père" ? "btn-primary" : ""}`,
    style: {
      flex: 1,
      padding: "10px",
      fontSize: fs(15)
    },
    onClick: () => setRoleParentConnu("Père")
  }, "le père"), /*#__PURE__*/React.createElement("button", {
    className: `btn-big ${roleParentConnu === "Mère" ? "btn-primary" : ""}`,
    style: {
      flex: 1,
      padding: "10px",
      fontSize: fs(15)
    },
    onClick: () => setRoleParentConnu("Mère")
  }, "la mère"))), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de naissance"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateNaissance,
    onChange: e => setDateNaissance(e.target.value),
    placeholder: "ex. 26 septembre 1910, ou juste 1910"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de naissance"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuNaissance,
    onChange: e => setLieuNaissance(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de décès"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateDeces,
    onChange: e => setDateDeces(e.target.value),
    placeholder: "laisser vide si en vie"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de décès"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuDeces,
    onChange: e => setLieuDeces(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Cimetière"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: cimetiere,
    onChange: e => setCimetiere(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Profession"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: metier,
    onChange: e => setMetier(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de la profession"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuProfession,
    onChange: e => setLieuProfession(e.target.value)
  }), /*#__PURE__*/React.createElement(EditeurDomiciles, {
    fs: fs,
    domiciles: domiciles,
    setDomiciles: setDomiciles,
    champStyle: champStyle,
    etiquetteStyle: etiquetteStyle
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Date de mariage"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: dateMariage,
    onChange: e => setDateMariage(e.target.value),
    placeholder: "ex. 14 septembre 1937"
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lieu de mariage"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: lieuMariage,
    onChange: e => setLieuMariage(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    style: etiquetteStyle
  }, "Lien vers les sources (dossier OneDrive)"), /*#__PURE__*/React.createElement("input", {
    style: champStyle,
    value: sourceUrl,
    onChange: e => setSourceUrl(e.target.value),
    placeholder: "https://onedrive.live.com/..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: onFermer
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big btn-primary",
    style: {
      flex: 1,
      padding: "12px",
      fontSize: fs(16)
    },
    onClick: enregistrer
  }, "Ajouter"))));
}
function AnneesTxt(p) {
  if (!p.naissance?.annee) return "années inconnues";
  return p.deces?.annee ? `${p.naissance.annee} – ${p.deces.annee}` : `né(e) ${p.naissance.annee}`;
}
function ParentSlot({
  p,
  fs,
  role,
  onClick,
  modifiable,
  onAjouter
}) {
  if (!p) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: "45%",
        textAlign: "center",
        opacity: modifiable ? 1 : 0.5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 68,
        height: 68,
        borderRadius: "50%",
        background: PAPER_DARK,
        color: INK_SOFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fs(24),
        margin: "0 auto 8px",
        border: `2px dashed ${INK_SOFT}`
      }
    }, "?"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: fs(14),
        color: INK_SOFT,
        marginBottom: modifiable ? 6 : 0
      }
    }, role, " inconnu(e)"), modifiable && /*#__PURE__*/React.createElement("button", {
      className: "btn-big",
      style: {
        padding: "6px 12px",
        fontSize: fs(13)
      },
      onClick: onAjouter
    }, "+ Ajouter"));
  }
  return /*#__PURE__*/React.createElement("button", {
    className: "person-chip",
    onClick: () => onClick(p.id),
    style: {
      width: "45%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 68,
      height: 68,
      borderRadius: "50%",
      background: FARBEN[p.generation],
      color: PAPER,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(22),
      fontWeight: 700,
      margin: "0 auto 8px",
      border: `3px solid ${INK}`
    }
  }, initials(p)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(14),
      color: INK_SOFT
    }
  }, role), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(16),
      fontWeight: 700,
      color: INK
    }
  }, p.prenom, " ", p.nom), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT
    }
  }, AnneesTxt(p)));
}
function ArbreFocus({
  fs,
  personnes,
  focusId,
  setFocusId,
  onOuvrirFiche,
  modifiable,
  arbreKey,
  onAjouterPersonne,
  onFusionnerChamps
}) {
  const [historique, setHistorique] = useState([]);
  const [ajoutRole, setAjoutRole] = useState(null); // "Père" | "Mère" | null
  const focus = trouver(personnes, focusId);
  if (!focus) return null;
  const pere = focus.pereId ? trouver(personnes, focus.pereId) : null;
  const mere = focus.mereId ? trouver(personnes, focus.mereId) : null;
  const aDesParents = pere || mere;
  const afficherRangeeParents = aDesParents || modifiable;
  const monterVers = id => {
    setHistorique(h => [...h, focusId]);
    setFocusId(id);
  };
  const redescendre = () => {
    setHistorique(h => {
      if (h.length === 0) return h;
      const copie = [...h];
      const precedent = copie.pop();
      setFocusId(precedent);
      return copie;
    });
  };
  const enregistrerNouveauParent = donnees => {
    const champ = ajoutRole === "Père" ? "pereId" : "mereId";
    const nouvelId = onAjouterPersonne({
      ...donnees,
      generation: focus.generation - 1,
      _arbreKey: arbreKey
    });
    if (nouvelId) onFusionnerChamps(focus.id, {
      [champ]: nouvelId
    });
    setAjoutRole(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: fs(16),
      color: INK_SOFT,
      marginBottom: 26
    }
  }, "Touchez un père ou une mère pour remonter dans le temps."), historique.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      display: "block",
      margin: "0 auto 24px",
      padding: "10px 18px",
      fontSize: fs(15)
    },
    onClick: redescendre
  }, "↓ Revenir à ", trouver(personnes, historique[historique.length - 1])?.prenom), afficherRangeeParents && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(ParentSlot, {
    p: pere,
    fs: fs,
    role: "Père",
    onClick: monterVers,
    modifiable: modifiable,
    onAjouter: () => setAjoutRole("Père")
  }), /*#__PURE__*/React.createElement(ParentSlot, {
    p: mere,
    fs: fs,
    role: "Mère",
    onClick: monterVers,
    modifiable: modifiable,
    onAjouter: () => setAjoutRole("Mère")
  })), aDesParents && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 40",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 40,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.5 0 V 20 H 77.5 V 0",
    fill: "none",
    stroke: INK_SOFT,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 50 20 V 40",
    fill: "none",
    stroke: INK_SOFT,
    strokeWidth: "1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER_DARK,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: "24px 20px",
      textAlign: "center",
      cursor: "pointer"
    },
    onClick: () => onOuvrirFiche(focus.id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 110,
      height: 110,
      borderRadius: "50%",
      background: FARBEN[focus.generation],
      color: PAPER,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(36),
      fontWeight: 700,
      margin: "0 auto 14px",
      border: `4px solid ${INK}`
    }
  }, initials(focus)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(26),
      fontWeight: 700
    }
  }, focus.prenom, " ", focus.nom), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(15),
      color: INK_SOFT,
      marginBottom: 10
    }
  }, AnneesTxt(focus)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(14),
      color: INK_SOFT,
      textDecoration: "underline"
    }
  }, "Voir la fiche complète")), !aDesParents && !modifiable && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: fs(14),
      color: INK_SOFT,
      marginTop: 18
    }
  }, "Aucun ancêtre supplémentaire connu pour l'instant au-delà de cette personne."), ajoutRole && /*#__PURE__*/React.createElement(AjoutModal, {
    fs: fs,
    titre: `Ajouter le/la ${ajoutRole.toLowerCase()} de ${focus.prenom}`,
    onFermer: () => setAjoutRole(null),
    onEnregistrer: enregistrerNouveauParent
  }));
}

// ---------- Vue Personne ----------
function CarteModal({
  fs,
  lieu,
  onFermer
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(46,35,24,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      zIndex: 65
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 20,
      width: "100%",
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(20),
      margin: 0
    }
  }, "🗺️ ", lieu), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      width: 44,
      height: 44,
      fontSize: fs(18),
      flexShrink: 0
    },
    onClick: onFermer,
    "aria-label": "Fermer"
  }, "✕")), /*#__PURE__*/React.createElement("iframe", {
    title: `Carte de ${lieu}`,
    src: `https://www.google.com/maps?q=${encodeURIComponent(lieu)}&output=embed`,
    style: {
      width: "100%",
      height: 400,
      border: `2px solid ${INK}`,
      borderRadius: 12,
      display: "block"
    },
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      display: "block",
      width: "100%",
      marginTop: 16,
      padding: "16px",
      fontSize: fs(18)
    },
    onClick: onFermer
  }, "✕ Fermer la carte")));
}
function LigneInfo({
  label,
  valeur,
  lieu,
  fs
}) {
  const [carteOuverte, setCarteOuverte] = useState(false);
  if (!valeur) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left",
      padding: "10px 0",
      borderBottom: `1px solid ${PAPER_DARK}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(17),
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, valeur), lieu && /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      fontSize: fs(14),
      padding: "6px 14px",
      whiteSpace: "nowrap"
    },
    onClick: () => setCarteOuverte(true)
  }, "🗺️ Voir la carte")), carteOuverte && /*#__PURE__*/React.createElement(CarteModal, {
    fs: fs,
    lieu: lieu,
    onFermer: () => setCarteOuverte(false)
  }));
}
const COULEURS_RELATIONS = {
  "Père": "#D7E3F0",
  "Mère": "#F2DCE0",
  "Conjoint(e)": "#E3D9F0",
  "Frère / Sœur": "#DCEBDD",
  "Enfant": "#F5E9C9"
};
function RelButton({
  label,
  person,
  fs,
  onClick
}) {
  if (!person) return null;
  return /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "14px 18px",
      fontSize: fs(17),
      textAlign: "left",
      width: "100%",
      background: COULEURS_RELATIONS[label] || PAPER
    },
    onClick: () => onClick(person.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: INK_SOFT,
      fontWeight: 400
    }
  }, label, " : "), person.prenom, " ", person.nom, /*#__PURE__*/React.createElement("span", {
    style: {
      color: INK_SOFT,
      fontWeight: 400,
      fontSize: fs(14)
    }
  }, " — ", AnneesTxt(person)));
}
function CardView({
  fs,
  personnes,
  currentId,
  setCurrentId,
  notes,
  modifierNotes,
  modifiable,
  arbreKey,
  onEnregistrerPersonne,
  onAjouterPersonne,
  onVoirArbre
}) {
  const p = trouver(personnes, currentId) || personnes[0];
  const [editionOuverte, setEditionOuverte] = useState(false);
  const [ajoutType, setAjoutType] = useState(null); // "fratrie" | "enfant" | null

  const pere = p.pereId ? trouver(personnes, p.pereId) : null;
  const mere = p.mereId ? trouver(personnes, p.mereId) : null;
  const partenaire = p.partnerId ? trouver(personnes, p.partnerId) : null;
  const enfants = enfantsDe(personnes, p);
  const fratrie = fratrieDe(personnes, p);
  const enregistrerNouvelleFratrie = donnees => {
    onAjouterPersonne({
      ...donnees,
      pereId: p.pereId || null,
      mereId: p.mereId || null,
      generation: p.generation,
      estFratrie: true,
      _arbreKey: arbreKey
    });
    setAjoutType(null);
  };
  const enregistrerNouvelEnfant = donnees => {
    onAjouterPersonne({
      ...donnees,
      generation: p.generation + 1,
      estFratrie: false,
      _arbreKey: arbreKey
    });
    setAjoutType(null);
  };
  const naissanceTxt = p.naissance?.date || p.naissance?.annee ? `${p.naissance.date || p.naissance.annee}${p.naissance.lieu ? `, ${p.naissance.lieu}` : ""}` : p.naissance?.lieu || null;
  const decesTxt = p.deces && (p.deces.date || p.deces.annee || p.deces.lieu) ? `${p.deces.date || p.deces.annee || "?"}${p.deces.lieu ? `, ${p.deces.lieu}` : ""}` : null;
  const professionTxt = p.profession?.metier ? `${p.profession.metier}${p.profession.lieu ? ` — ${p.profession.lieu}` : ""}` : null;
  const domiciles = p.domiciles || [];
  const mariageTxt = (() => {
    if (!p.mariage) return null;
    const morceaux = [];
    if (partenaire) morceaux.push(`avec ${partenaire.prenom} ${partenaire.nom}`);
    if (p.mariage.date) morceaux.push(`le ${p.mariage.date}`);
    if (p.mariage.lieu) morceaux.push(p.mariage.lieu);
    return morceaux.length ? morceaux.join(", ") : null;
  })();
  const texteNote = notes[p.id] !== undefined ? notes[p.id] : p.remarque || "";
  const [enLecture, setEnLecture] = useState(false);
  useEffect(() => {
    setEnLecture(false);
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  }, [p.id]);
  const basculerLecture = () => {
    if (!window.speechSynthesis) return;
    if (enLecture) {
      window.speechSynthesis.cancel();
      setEnLecture(false);
      return;
    }
    const morceaux = [`${p.prenom} ${p.nom}.`, `${AnneesTxt(p)}.`, naissanceTxt ? `Naissance : ${naissanceTxt}.` : null, decesTxt ? `Décès : ${decesTxt}.` : null, p.deces?.cimetiere ? `Cimetière : ${p.deces.cimetiere}.` : null, professionTxt ? `Profession : ${professionTxt}.` : null, mariageTxt ? `Mariage : ${mariageTxt}.` : null, texteNote ? `Biographie : ${texteNote}` : null].filter(Boolean);
    const utterance = new SpeechSynthesisUtterance(morceaux.join(" "));
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    utterance.onend = () => setEnLecture(false);
    utterance.onerror = () => setEnLecture(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setEnLecture(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      display: "block",
      width: "100%",
      padding: "16px",
      fontSize: fs(19),
      marginBottom: 20
    },
    onClick: onVoirArbre
  }, "🌳 Retour à l'arbre"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: PAPER_DARK,
      border: `3px solid ${INK}`,
      borderRadius: 20,
      padding: 30,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 140,
      height: 140,
      borderRadius: "50%",
      background: FARBEN[p.generation],
      color: PAPER,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(46),
      fontWeight: 700,
      margin: "0 auto 18px",
      border: `4px solid ${INK}`
    }
  }, initials(p)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: fs(32),
      margin: "0 0 6px"
    }
  }, p.prenom, " ", p.nom), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(16),
      color: INK_SOFT,
      marginBottom: 12
    }
  }, AnneesTxt(p)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 20px",
      fontSize: fs(16)
    },
    onClick: basculerLecture
  }, enLecture ? "⏹ Arrêter" : "🔊 Écouter la fiche"), modifiable && /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "10px 20px",
      fontSize: fs(16)
    },
    onClick: () => setEditionOuverte(true)
  }, "✏️ Modifier")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(LigneInfo, {
    label: "Naissance",
    valeur: naissanceTxt,
    lieu: p.naissance?.lieu,
    fs: fs
  }), /*#__PURE__*/React.createElement(LigneInfo, {
    label: "Décès",
    valeur: decesTxt,
    lieu: p.deces?.lieu,
    fs: fs
  }), /*#__PURE__*/React.createElement(LigneInfo, {
    label: "Cimetière",
    valeur: p.deces?.cimetiere,
    lieu: p.deces?.cimetiere,
    fs: fs
  }), /*#__PURE__*/React.createElement(LigneInfo, {
    label: "Profession",
    valeur: professionTxt,
    lieu: p.profession?.lieu,
    fs: fs
  }), domiciles.map((d, i) => /*#__PURE__*/React.createElement(LigneInfo, {
    key: i,
    label: domiciles.length > 1 ? `Domicile (${i + 1}/${domiciles.length})` : "Domicile",
    valeur: d.lieu ? `${d.lieu}${d.date ? ` (${d.date})` : ""}` : null,
    lieu: d.lieu,
    fs: fs
  })), /*#__PURE__*/React.createElement(LigneInfo, {
    label: "Mariage",
    valeur: mariageTxt,
    lieu: p.mariage?.lieu,
    fs: fs
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 6
    }
  }, "Biographie / Particularités ", !modifiable && "(verrouillé)"), /*#__PURE__*/React.createElement("textarea", {
    value: texteNote,
    readOnly: !modifiable,
    onChange: e => modifierNotes(prev => ({
      ...prev,
      [p.id]: e.target.value
    })),
    placeholder: modifiable ? "Écrivez ici ce que vous savez de cette personne…" : "Aucune biographie enregistrée pour l'instant.",
    style: {
      width: "100%",
      minHeight: 90,
      fontSize: fs(16),
      fontFamily: "'Atkinson Hyperlegible', Verdana, sans-serif",
      color: INK,
      background: modifiable ? PAPER : PAPER_DARK,
      border: `2px solid ${INK}`,
      borderRadius: 10,
      padding: 10,
      resize: "vertical",
      boxSizing: "border-box",
      cursor: modifiable ? "text" : "default"
    }
  })), p.sourceUrl && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 20,
      paddingTop: 16,
      borderTop: `1px solid ${INK}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs(13),
      color: INK_SOFT,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 10
    }
  }, "Sources (OneDrive)"), /*#__PURE__*/React.createElement("a", {
    href: p.sourceUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-big btn-primary",
    style: {
      padding: "16px 24px",
      fontSize: fs(18)
    }
  }, "📄 Ouvrir les sources")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(RelButton, {
    label: "Père",
    person: pere,
    fs: fs,
    onClick: setCurrentId
  }), /*#__PURE__*/React.createElement(RelButton, {
    label: "Mère",
    person: mere,
    fs: fs,
    onClick: setCurrentId
  }), /*#__PURE__*/React.createElement(RelButton, {
    label: "Conjoint(e)",
    person: partenaire,
    fs: fs,
    onClick: setCurrentId
  }), fratrie.map(g => /*#__PURE__*/React.createElement(RelButton, {
    key: g.id,
    label: "Frère / Sœur",
    person: g,
    fs: fs,
    onClick: setCurrentId
  })), enfants.map(k => /*#__PURE__*/React.createElement(RelButton, {
    key: k.id,
    label: "Enfant",
    person: k,
    fs: fs,
    onClick: setCurrentId
  })), modifiable && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "12px 18px",
      fontSize: fs(16)
    },
    onClick: () => setAjoutType("fratrie")
  }, "+ Ajouter un frère / une sœur"), /*#__PURE__*/React.createElement("button", {
    className: "btn-big",
    style: {
      padding: "12px 18px",
      fontSize: fs(16)
    },
    onClick: () => setAjoutType("enfant")
  }, "+ Ajouter un enfant"))), ajoutType === "fratrie" && /*#__PURE__*/React.createElement(AjoutModal, {
    fs: fs,
    titre: `Ajouter un frère ou une sœur de ${p.prenom}`,
    onFermer: () => setAjoutType(null),
    onEnregistrer: enregistrerNouvelleFratrie
  }), ajoutType === "enfant" && /*#__PURE__*/React.createElement(AjoutModal, {
    fs: fs,
    titre: `Ajouter un enfant de ${p.prenom}`,
    parentConnu: p,
    onFermer: () => setAjoutType(null),
    onEnregistrer: enregistrerNouvelEnfant
  }), editionOuverte && /*#__PURE__*/React.createElement(EditModal, {
    fs: fs,
    personne: p,
    onFermer: () => setEditionOuverte(false),
    onEnregistrer: donnees => {
      onEnregistrerPersonne(p.id, donnees);
      setEditionOuverte(false);
    }
  }));
}

// ---------- Démarrage de l'application (sans bundler, React global via CDN) ----------
const racineDOM = ReactDOM.createRoot(document.getElementById("root"));
racineDOM.render(React.createElement(App));