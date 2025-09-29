CREATE DATABASE IF NOT EXISTS sistema_medicos;


-- Criar a tabela medicos (caso não exista)
CREATE TABLE IF NOT EXISTS medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(500),
    avaliacao DECIMAL(2,1) DEFAULT 0.0,
    especialidades VARCHAR(255) NOT NULL,
    horarios TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Resetar o auto_increment da sequência
ALTER TABLE medicos AUTO_INCREMENT = 1;



-- Inserir médicos homens (DR.)
INSERT INTO medicos (nome, descricao, imagem, avaliacao, especialidades, horarios) VALUES
(
    'Dr. Carlos Mendes',
    'Cardiologista com 15 anos de experiência em cirurgias cardiovasculares e tratamento de doenças cardíacas. Especialista em cateterismo e angioplastia.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    4.8,
    'Cardiologia',
    '09:00 AM, 11:00 AM, 03:00 PM'
),
(
    'Dr. Roberto Silva',
    'Ortopedista especializado em cirurgias de joelho, quadril e traumatologia esportiva. Atende atletas profissionais e amadores.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    4.7,
    'Ortopedia',
    '08:00 AM, 02:00 PM, 04:00 PM'
),
(
    'Dr. André Costa',
    'Neurologista com expertise em doenças neurodegenerativas, epilepsia e distúrbios do sono. Formação em neurologia clínica.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    4.6,
    'Neurologia',
    '10:00 AM, 01:00 PM, 05:00 PM'
),
(
    'Dr. Fernando Lima',
    'Odontólogo especializado em cirurgias bucomaxilofaciais e implantodontia. Também atua em ortopedia da face.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    4.9,
    'Odontologia',
    '07:30 AM, 12:00 PM, 06:00 PM'
);

-- Inserir médicas mulheres (DRA.)
INSERT INTO medicos (nome, descricao, imagem, avaliacao, especialidades, horarios) VALUES
(
    'Dra. Maria Santos',
    'Odontóloga especializada em estética dental e periodontia. Expertise em implantes e clareamento dental.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    4.9,
    'Odontologia',
    '08:30 AM, 01:30 PM, 04:30 PM'
),
(
    'Dra. Ana Rodrigues',
    'Cardiologista e neurologista com 12 anos de experiência. Especialista em doenças cardiovasculares e neurológicas.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    4.8,
    'Cardiologia',
    '09:30 AM, 11:30 AM, 02:30 PM'
),
(
    'Dra. Lucia Ferreira',
    'Neurologista com 18 anos de experiência em neurologia infantil e de adultos. Especializada em epilepsia e distúrbios neurológicos.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    4.7,
    'Neurologia',
    '10:30 AM, 03:30 PM, 05:30 PM'
),
(
    'Dra. Patricia Alves',
    'Ortopedista especializada em cirurgias da coluna vertebral e articulações. Experiência em ortopedia esportiva.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    4.6,
    'Ortopedia',
    '07:00 AM, 12:30 PM, 06:30 PM'
);

-- Verificar se os dados foram inseridos corretamente
SELECT COUNT(*) as total_medicos FROM medicos;
SELECT DISTINCT especialidades FROM medicos;

