-- ============================================
-- MyQualio - Schema Supabase
-- À exécuter dans le SQL Editor de Supabase
-- ============================================

-- 1. Table des organismes (CFA)
CREATE TABLE IF NOT EXISTS organismes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  siret TEXT,
  adresse TEXT,
  code_postal TEXT,
  ville TEXT,
  telephone TEXT,
  email TEXT,
  responsable_nom TEXT,
  responsable_prenom TEXT,
  responsable_qualite TEXT,
  nda_numero TEXT,
  nda_statut TEXT DEFAULT 'non_demande',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Lien users <-> organismes (multi-CFA)
CREATE TABLE IF NOT EXISTS user_organismes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organisme_id UUID NOT NULL REFERENCES organismes(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, organisme_id)
);

-- 3. Suivi des indicateurs par organisme
CREATE TABLE IF NOT EXISTS indicateur_suivis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisme_id UUID NOT NULL REFERENCES organismes(id) ON DELETE CASCADE,
  indicateur_id INTEGER NOT NULL,
  statut TEXT DEFAULT 'non_evalue',
  notes TEXT,
  plan_action TEXT,
  responsable TEXT,
  date_echeance DATE,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(organisme_id, indicateur_id)
);

-- 4. Documents / preuves
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisme_id UUID NOT NULL REFERENCES organismes(id) ON DELETE CASCADE,
  indicateur_id INTEGER,
  nom TEXT NOT NULL,
  description TEXT,
  categorie TEXT DEFAULT 'preuve',
  storage_path TEXT NOT NULL,
  taille INTEGER,
  mime_type TEXT,
  date_validite DATE,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Dossiers NDA
CREATE TABLE IF NOT EXISTS nda_dossiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisme_id UUID NOT NULL REFERENCES organismes(id) ON DELETE CASCADE,
  denomination TEXT,
  forme_juridique TEXT,
  siret TEXT,
  adresse_siege TEXT,
  code_postal TEXT,
  ville TEXT,
  telephone TEXT,
  email TEXT,
  representant_nom TEXT,
  representant_qualite TEXT,
  objet_activite TEXT,
  domaines_formation JSONB,
  public_vise JSONB,
  premiere_convention_date DATE,
  premiere_convention_intitule TEXT,
  premiere_convention_duree TEXT,
  premiere_convention_effectif INTEGER,
  statut TEXT DEFAULT 'brouillon',
  date_envoi DATE,
  date_recepisse DATE,
  numero_recepisse TEXT,
  date_obtention DATE,
  nda_numero TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE organismes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organismes ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicateur_suivis ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE nda_dossiers ENABLE ROW LEVEL SECURITY;

-- Policies pour organismes
CREATE POLICY "Users can view their organismes" ON organismes
  FOR SELECT USING (
    id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their organismes" ON organismes
  FOR UPDATE USING (
    id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can insert organismes" ON organismes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policies pour user_organismes
CREATE POLICY "Users can view their links" ON user_organismes
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their links" ON user_organismes
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policies pour indicateur_suivis
CREATE POLICY "Users can view their suivis" ON indicateur_suivis
  FOR SELECT USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert suivis" ON indicateur_suivis
  FOR INSERT WITH CHECK (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update suivis" ON indicateur_suivis
  FOR UPDATE USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

-- Policies pour documents
CREATE POLICY "Users can view their docs" ON documents
  FOR SELECT USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert docs" ON documents
  FOR INSERT WITH CHECK (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete docs" ON documents
  FOR DELETE USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

-- Policies pour nda_dossiers
CREATE POLICY "Users can view their NDA" ON nda_dossiers
  FOR SELECT USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert NDA" ON nda_dossiers
  FOR INSERT WITH CHECK (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update NDA" ON nda_dossiers
  FOR UPDATE USING (
    organisme_id IN (SELECT organisme_id FROM user_organismes WHERE user_id = auth.uid())
  );

-- ============================================
-- Storage bucket pour les documents
-- ============================================
-- À créer manuellement dans Supabase Dashboard > Storage > Create bucket
-- Nom: "documents", Public: false
-- Puis ajouter la policy:
-- Authenticated users can upload to their org folder
-- Authenticated users can read from their org folder
