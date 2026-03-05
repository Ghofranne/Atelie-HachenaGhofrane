const mysql = require("mysql2/promise");
require("dotenv").config();

const initializeDatabase = async () => {
  try {
    console.log("🔄 Initialisation de la base de données...");

    // Connexion SANS base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT || 3306,
    });

    console.log("✅ Connecté à MySQL");

    // Créer la base de données
    const dbName = process.env.DB_NAME || "suggestions_db";
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS \`${dbName}\` 
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
    console.log(`✅ Base de données '${dbName}' créée/vérifiée`);

    // Utiliser la base de données
    await connection.query(`USE \`${dbName}\``);

    // Créer les tables
    const tables = [
      // Table suggestions
      `CREATE TABLE IF NOT EXISTS suggestions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending',
        nbLikes INT DEFAULT 0,
        INDEX idx_status (status),
        INDEX idx_category (category),
        INDEX idx_date (date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // Table users
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(50) DEFAULT 'user',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_role (role),
        INDEX idx_status_user (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // Table comments
      `CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        suggestion_id INT NOT NULL,
        author VARCHAR(255),
        content TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'visible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_suggestion_id (suggestion_id),
        INDEX idx_status_comment (status),
        CONSTRAINT fk_comments_suggestion
          FOREIGN KEY (suggestion_id) REFERENCES suggestions(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // Table tags
      `CREATE TABLE IF NOT EXISTS tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        color VARCHAR(20),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_status_tag (status),
        INDEX idx_created_at_tag (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // Table jardins
      `CREATE TABLE IF NOT EXISTS jardins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        adresse VARCHAR(255) NOT NULL,
        surface DECIMAL(10,2) NOT NULL,
        dateEntretien DATE NULL,
        statut TINYINT(1) DEFAULT 1,
        INDEX idx_statut_jardin (statut),
        INDEX idx_date_entretien (dateEntretien)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // Table ateliers
      `CREATE TABLE IF NOT EXISTS ateliers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        emailFormateur VARCHAR(255),
        nbrParticipant INT NOT NULL,
        statut TINYINT(1) DEFAULT 1,
        INDEX idx_statut_atelier (statut)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    for (const table of tables) {
      await connection.query(table);
    }

    console.log("✅ Toutes les tables créées/vérifiées");
    await connection.end();
    console.log("✅ Initialisation terminée avec succès");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur d'initialisation:", error.message);
    process.exit(1);
  }
};

initializeDatabase();
