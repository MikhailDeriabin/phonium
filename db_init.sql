CREATE TABLE IF NOT EXISTS Contact (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  phone VARCHAR(31) NOT NULL,
  description VARCHAR(200)
);

INSERT INTO Contact (name, phone, description) VALUES
   ('Michael Scott', '+1 570 123 4567', 'World’s Best Boss (self-proclaimed)'),
   ('Dwight Schrute', '+1 717 987 6543', 'Beet farmer, assistant **to** the regional manager'),
   ('Jim Halpert', '+1 215 555 7890', 'Prank master, Pam’s soulmate'),
   ('Pam Beesly', '+1 484 321 4567', 'Artist, receptionist, and Jim’s better half'),
   ('Kevin Malone', '+1 610 222 3333', 'Chili expert (but not at carrying it)');